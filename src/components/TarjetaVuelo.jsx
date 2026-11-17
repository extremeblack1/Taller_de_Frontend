export default function TarjetaVuelo({ vuelo, onSeleccionar, esSeleccionada }) {
  const precioFormateado = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(vuelo.precio);

  return (
    <article className={`tarjeta-vuelo ${esSeleccionada ? 'seleccionada' : ''}`}>
      <div className="vuelo-info">
        <div className="vuelo-principal">
          <span className="vuelo-codigo">Vuelo AC-{vuelo.id.replace('v', '')}</span>
          <span className="vuelo-avion">✈️ {vuelo.avion}</span>
        </div>
        <div className="vuelo-horario">
          <span className="vuelo-hora">🕒 Salida: <strong>{vuelo.hora}</strong></span>
        </div>
        <div className="vuelo-tarifa">
          <span className="tarifa-label">Desde</span>
          <span className="vuelo-precio">{precioFormateado}</span>
        </div>
      </div>
      <button
        type="button"
        className={`btn-seleccionar ${esSeleccionada ? 'btn-activo' : ''}`}
        onClick={() => onSeleccionar(vuelo)}
      >
        {esSeleccionada ? '✓ Seleccionado' : 'Seleccionar'}
      </button>
    </article>
  );
}
