export default function MisReservas({ reservas, onEliminarReserva }) {
  const formatearPrecio = (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(valor);
  };

  return (
    <section className="boarding-passes-container">
      <div className="section-headline-row">
        <div>
          <h2 className="section-main-title">🎫 Mis Pases de Abordar y Reservas</h2>
          <p className="section-subtitle">Gestiona tus pasajes confirmados en la red AeroCol</p>
        </div>
        <span className="count-badge">{reservas.length} {reservas.length === 1 ? 'reserva activa' : 'reservas activas'}</span>
      </div>

      {reservas.length === 0 ? (
        <div className="empty-boarding-box">
          <div className="empty-icon-bubble">🛫</div>
          <h4>No tienes reservas activas en este momento</h4>
          <p>Elige un vuelo de nuestra red nacional y personaliza tu reserva para generar tu pase de abordar.</p>
        </div>
      ) : (
        <div className="boarding-passes-grid">
          {reservas.map((reserva) => {
            const codigoVuelo = reserva.codigoVuelo || `AC-${reserva.vueloId?.replace('v', '').padStart(3, '0')}`;

            return (
              <article key={reserva.id} className="boarding-pass-card">
                {/* Parte principal del pase */}
                <div className="pass-main-section">
                  <div className="pass-top-bar">
                    <span className="pass-airline">AEROCOL AIRLINES</span>
                    <span className="pass-status-pill">● CONFIRMADO</span>
                  </div>

                  <div className="pass-passenger-info">
                    <span className="info-label">PASAJERO(A)</span>
                    <h4 className="passenger-name-highlight">{reserva.nombre}</h4>
                  </div>

                  <div className="pass-flight-grid">
                    <div className="grid-cell">
                      <span className="cell-label">VUELO</span>
                      <span className="cell-val bold">{codigoVuelo}</span>
                    </div>

                    <div className="grid-cell">
                      <span className="cell-label">SALIDA</span>
                      <span className="cell-val bold">🕒 {reserva.hora}</span>
                    </div>

                    <div className="grid-cell">
                      <span className="cell-label">CABINA</span>
                      <span className="cell-val">{reserva.clase}</span>
                    </div>

                    <div className="grid-cell">
                      <span className="cell-label">VIAJEROS</span>
                      <span className="cell-val">👥 {reserva.pasajeros}</span>
                    </div>
                  </div>

                  <div className="pass-bottom-meta">
                    <span className="meta-date">📅 Emitido: {reserva.fecha}</span>
                    <span className="meta-aircraft">✈️ {reserva.avion}</span>
                  </div>
                </div>

                {/* Perforación visual de ticket */}
                <div className="pass-cutout-divider">
                  <span className="cutout-circle top"></span>
                  <div className="dashed-line"></div>
                  <span className="cutout-circle bottom"></span>
                </div>

                {/* Talón lateral del ticket (Stub) con total y botón cancelar */}
                <div className="pass-stub-section">
                  <div className="stub-total-block">
                    <span className="stub-label">TOTAL ABONADO</span>
                    <span className="stub-price">{formatearPrecio(reserva.total)}</span>
                  </div>

                  {/* Código de barras decorativo de pase de abordar */}
                  <div className="stub-barcode-decor" aria-hidden="true">
                    <span>||||| | |||| ||| ||||| || |</span>
                  </div>

                  <button
                    type="button"
                    className="btn-cancel-pass"
                    onClick={() => onEliminarReserva(reserva.id)}
                    title="Cancelar pasaje y anular reserva"
                  >
                    <span>🗑️ Cancelar</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
