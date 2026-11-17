import { useState } from 'react';

const CLASES_DEFAULT = [
  { id: 'eco', nombre: 'Económica', factor: 1.0 },
  { id: 'eje', nombre: 'Ejecutiva', factor: 1.6 },
  { id: 'pri', nombre: 'Primera Clase', factor: 2.4 }
];

export default function FormularioReserva({ vuelo, clases = CLASES_DEFAULT, onReservar, onCancelar }) {
  const [nombre, setNombre] = useState('');
  const [pasajeros, setPasajeros] = useState(1);
  const [claseId, setClaseId] = useState('eco');

  const listaClases = clases.length > 0 ? clases : CLASES_DEFAULT;
  const claseSeleccionada = listaClases.find((c) => c.id === claseId) || listaClases[0];

  // Estado derivado: cálculo instantáneo del total
  const total = Math.round(vuelo.precio * pasajeros * claseSeleccionada.factor);

  const totalFormateado = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(total);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    onReservar({
      id: crypto.randomUUID(),
      codigoVuelo: `AC-${vuelo.id.replace('v', '')}`,
      nombre: nombre.trim(),
      vueloId: vuelo.id,
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
    <section className="card formulario-reserva-card">
      <div className="formulario-header">
        <div>
          <h3>Completar reserva de vuelo</h3>
          <p className="formulario-subtitulo">
            Vuelo AC-{vuelo.id.replace('v', '')} · {vuelo.avion} · Salida: {vuelo.hora}
          </p>
        </div>
        {onCancelar && (
          <button type="button" className="btn-cerrar" onClick={onCancelar} title="Cerrar formulario">
            ✕
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="reserva-form">
        {/* Nombre del pasajero */}
        <div className="campo-grupo">
          <label htmlFor="nombre-pasajero" className="label-campo">
            Nombre y apellido del pasajero principal:
          </label>
          <input
            id="nombre-pasajero"
            type="text"
            className="text-input"
            placeholder="Ejemplo: Ana García Restrepo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        {/* Cantidad de pasajeros */}
        <div className="campo-grupo">
          <label className="label-campo">Número de pasajeros:</label>
          <div className="contador-pasajeros">
            <button
              type="button"
              className="btn-contador"
              onClick={() => setPasajeros((prev) => Math.max(1, prev - 1))}
              disabled={pasajeros <= 1}
              aria-label="Disminuir pasajeros"
            >
              −
            </button>
            <span className="pasajeros-valor">{pasajeros}</span>
            <button
              type="button"
              className="btn-contador"
              onClick={() => setPasajeros((prev) => prev + 1)}
              aria-label="Aumentar pasajeros"
            >
              +
            </button>
          </div>
        </div>

        {/* Cabina / Clase */}
        <div className="campo-grupo">
          <label className="label-campo">Cabina seleccionada:</label>
          <div className="clases-radios">
            {listaClases.map((clase) => (
              <label key={clase.id} className="radio-label">
                <input
                  type="radio"
                  name="clase"
                  value={clase.id}
                  checked={claseId === clase.id}
                  onChange={(e) => setClaseId(e.target.value)}
                />
                <span>{clase.nombre}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Resumen del total y confirmación */}
        <div className="resumen-total-fila">
          <div className="total-display">
            <span className="total-label">Tarifa total:</span>
            <span className="total-valor">{totalFormateado}</span>
          </div>

          <button
            type="submit"
            className="btn-reservar"
            disabled={!nombre.trim()}
          >
            Confirmar Reserva
          </button>
        </div>
      </form>
    </section>
  );
}
