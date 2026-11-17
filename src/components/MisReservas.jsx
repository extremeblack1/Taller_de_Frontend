export default function MisReservas({ reservas, onEliminarReserva }) {
  const formatearPrecio = (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(valor);
  };

  return (
    <section className="card mis-reservas-card">
      <h2 className="seccion-titulo">
        📋 Reservas emitidas ({reservas.length})
      </h2>

      {reservas.length === 0 ? (
        <div className="estado-vacio">
          <p>No tienes itinerarios reservados actualmente.</p>
          <small>Selecciona un vuelo de la red nacional para comenzar tu viaje.</small>
        </div>
      ) : (
        <div className="reservas-lista">
          {reservas.map((reserva) => (
            <article key={reserva.id} className="reserva-item">
              <div className="reserva-detalles">
                <div className="reserva-header-row">
                  <span className="reserva-pasajero">👤 {reserva.nombre}</span>
                  <span className="badge-confirmado">Confirmada</span>
                </div>
                <span className="reserva-vuelo">
                  ✈️ Vuelo {reserva.codigoVuelo || `AC-${reserva.vueloId?.replace('v', '')}`} · {reserva.avion} · Salida: {reserva.hora}
                </span>
                <span className="reserva-meta">
                  👥 {reserva.pasajeros} {reserva.pasajeros === 1 ? 'pasajero' : 'pasajeros'} · Cabina {reserva.clase}
                </span>
                <span className="reserva-fecha">📅 Fecha de emisión: {reserva.fecha}</span>
                <span className="reserva-precio">{formatearPrecio(reserva.total)}</span>
              </div>
              <button
                type="button"
                className="btn-eliminar"
                onClick={() => onEliminarReserva(reserva.id)}
                title="Cancelar reserva"
                aria-label="Cancelar reserva"
              >
                🗑️
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
