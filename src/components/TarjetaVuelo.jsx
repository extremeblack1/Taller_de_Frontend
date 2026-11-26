export default function TarjetaVuelo({ vuelo, onSeleccionar, esSeleccionada }) {
  const precioFormateado = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(vuelo.precio);

  // Calcular hora estimada de llegada (~55 mins después)
  const calcularLlegada = (horaSalida) => {
    try {
      const [h, m] = horaSalida.split(':').map(Number);
      let totalMins = h * 60 + m + 55;
      const llegadaH = Math.floor(totalMins / 60) % 24;
      const llegadaM = totalMins % 60;
      return `${String(llegadaH).padStart(2, '0')}:${String(llegadaM).padStart(2, '0')}`;
    } catch {
      return '--:--';
    }
  };

  const horaLlegada = calcularLlegada(vuelo.hora);
  const codigoVuelo = `AC-${vuelo.id.replace('v', '').padStart(3, '0')}`;

  return (
    <article className={`flight-ticket-card ${esSeleccionada ? 'seleccionada' : ''}`}>
      <div className="ticket-body">
        {/* Cabecera del ticket: Aerolínea y código de vuelo */}
        <div className="ticket-header-meta">
          <span className="airline-badge">AeroCol</span>
          <span className="flight-number">{codigoVuelo}</span>
          <span className="aircraft-pill">✈️ {vuelo.avion}</span>
        </div>

        {/* Ruta visual con línea de tiempo */}
        <div className="flight-route-visual">
          <div className="time-station origin">
            <span className="station-time">{vuelo.hora}</span>
            <span className="station-code">{vuelo.origen}</span>
          </div>

          <div className="route-timeline">
            <span className="flight-duration">55m · Directo</span>
            <div className="timeline-line">
              <span className="timeline-dot start"></span>
              <span className="plane-icon-travel">✈</span>
              <span className="timeline-dot end"></span>
            </div>
            <span className="route-status">A tiempo</span>
          </div>

          <div className="time-station destination">
            <span className="station-time">{horaLlegada}</span>
            <span className="station-code">{vuelo.destino}</span>
          </div>
        </div>
      </div>

      {/* Sección lateral de tarifa y acción */}
      <div className="ticket-action-pane">
        <div className="fare-tag">
          <span className="fare-label">Tarifa por persona</span>
          <span className="fare-amount">{precioFormateado}</span>
        </div>

        <button
          type="button"
          className={`btn-ticket-select ${esSeleccionada ? 'selected' : ''}`}
          onClick={() => onSeleccionar(vuelo)}
        >
          {esSeleccionada ? (
            <>
              <span className="btn-icon">✓</span>
              <span>Seleccionado</span>
            </>
          ) : (
            <>
              <span>Elegir Vuelo</span>
              <span className="btn-arrow">→</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}
