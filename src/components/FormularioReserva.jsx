import { useState } from 'react';

const CLASES_DEFAULT = [
  { id: 'eco', nombre: 'Económica', factor: 1.0, perk: 'Equipaje de mano incluido' },
  { id: 'eje', nombre: 'Ejecutiva', factor: 1.6, perk: 'Bodega + Asiento preferente' },
  { id: 'pri', nombre: 'Primera Clase', factor: 2.4, perk: 'Acceso VIP + Flexibilidad total' }
];

export default function FormularioReserva({ vuelo, clases = CLASES_DEFAULT, onReservar, onCancelar }) {
  const [nombre, setNombre] = useState('');
  const [pasajeros, setPasajeros] = useState(1);
  const [claseId, setClaseId] = useState('eco');

  // Asegurar que las clases tengan descripciones
  const listaClases = (clases.length > 0 ? clases : CLASES_DEFAULT).map((c) => {
    const defaultInfo = CLASES_DEFAULT.find((def) => def.id === c.id);
    return { ...c, perk: defaultInfo?.perk || `Factor de tarifa: ×${c.factor}` };
  });

  const claseSeleccionada = listaClases.find((c) => c.id === claseId) || listaClases[0];

  // Estado derivado: cálculo instantáneo del total
  const total = Math.round(vuelo.precio * pasajeros * claseSeleccionada.factor);

  const totalFormateado = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(total);

  const precioBaseFormateado = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(vuelo.precio);

  const codigoVuelo = `AC-${vuelo.id.replace('v', '').padStart(3, '0')}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    onReservar({
      id: crypto.randomUUID(),
      codigoVuelo,
      nombre: nombre.trim(),
      vueloId: vuelo.id,
      origen: vuelo.origen,
      destino: vuelo.destino,
      avion: vuelo.avion,
      hora: vuelo.hora,
      pasajeros,
      clase: claseSeleccionada.nombre,
      total,
      fecha: new Date().toLocaleDateString('es-CO', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    });

    setNombre('');
    setPasajeros(1);
    setClaseId('eco');
  };

  return (
    <section className="reservation-modal-card">
      <div className="reservation-card-header">
        <div className="header-meta">
          <span className="step-tag">PASO 2 DE 2 · CONFIRMACIÓN</span>
          <h3>Emisión de Pasaje Aéreo</h3>
        </div>
        {onCancelar && (
          <button type="button" className="btn-close-form" onClick={onCancelar} title="Cancelar selección">
            ✕
          </button>
        )}
      </div>

      {/* Resumen del vuelo elegido */}
      <div className="flight-strip-summary">
        <div className="strip-item">
          <span className="strip-label">VUELO</span>
          <span className="strip-value highlight">{codigoVuelo}</span>
        </div>
        <div className="strip-item">
          <span className="strip-label">RUTA</span>
          <span className="strip-value">{vuelo.origen} ➔ {vuelo.destino}</span>
        </div>
        <div className="strip-item">
          <span className="strip-label">SALIDA</span>
          <span className="strip-value">🕒 {vuelo.hora}</span>
        </div>
        <div className="strip-item">
          <span className="strip-label">AERONAVE</span>
          <span className="strip-value">✈️ {vuelo.avion}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="booking-formal-form">
        {/* Pasajero principal */}
        <div className="form-field-group">
          <label htmlFor="nombre-pasajero" className="form-field-label">
            👤 Nombre y Apellidos del Pasajero Principal
          </label>
          <div className="input-with-icon">
            <input
              id="nombre-pasajero"
              type="text"
              className="formal-input"
              placeholder="Ej: Laura Sofía Restrepo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Pasajeros y Cabina en Grid */}
        <div className="form-split-grid">
          {/* Contador de pasajeros */}
          <div className="form-field-group">
            <label className="form-field-label">👥 Cantidad de Pasajeros</label>
            <div className="passenger-stepper-box">
              <button
                type="button"
                className="btn-stepper-control"
                onClick={() => setPasajeros((prev) => Math.max(1, prev - 1))}
                disabled={pasajeros <= 1}
                aria-label="Restar pasajero"
              >
                −
              </button>
              <div className="stepper-display">
                <span className="stepper-number">{pasajeros}</span>
                <span className="stepper-caption">{pasajeros === 1 ? 'viajero' : 'viajeros'}</span>
              </div>
              <button
                type="button"
                className="btn-stepper-control"
                onClick={() => setPasajeros((prev) => prev + 1)}
                aria-label="Añadir pasajero"
              >
                +
              </button>
            </div>
          </div>

          {/* Cabina / Clase */}
          <div className="form-field-group">
            <label className="form-field-label">💺 Clase de Servicio</label>
            <div className="cabin-options-grid">
              {listaClases.map((clase) => (
                <label
                  key={clase.id}
                  className={`cabin-card-option ${claseId === clase.id ? 'active' : ''}`}
                >
                  <input
                    type="radio"
                    name="clase"
                    value={clase.id}
                    checked={claseId === clase.id}
                    onChange={(e) => setClaseId(e.target.value)}
                    className="cabin-radio-hidden"
                  />
                  <div className="cabin-info-block">
                    <span className="cabin-name">{clase.nombre}</span>
                    <span className="cabin-factor">×{clase.factor}</span>
                  </div>
                  <span className="cabin-perk-text">{clase.perk}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Desglose de Facturación y Botón de Emisión */}
        <div className="fare-checkout-bar">
          <div className="fare-breakdown-box">
            <div className="breakdown-formula">
              <span>{precioBaseFormateado} base</span>
              <span>× {pasajeros} {pasajeros === 1 ? 'pasajero' : 'pasajeros'}</span>
              <span>× factor {claseSeleccionada.factor}</span>
            </div>
            <div className="breakdown-total">
              <span className="total-title">Total a pagar:</span>
              <span className="total-amount">{totalFormateado}</span>
            </div>
          </div>

          <button
            type="submit"
            className="btn-confirm-checkout"
            disabled={!nombre.trim()}
          >
            <span className="btn-confirm-text">Confirmar y Emitir Reserva</span>
            <span className="btn-confirm-icon">➔</span>
          </button>
        </div>
      </form>
    </section>
  );
}
