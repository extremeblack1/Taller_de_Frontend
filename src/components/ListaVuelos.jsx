import TarjetaVuelo from './TarjetaVuelo';

export default function ListaVuelos({
  vuelos,
  nombreOrigen,
  nombreDestino,
  vueloSeleccionado,
  onSeleccionarVuelo
}) {
  return (
    <section className="flight-catalog-section">
      <div className="catalog-header-bar">
        <div className="catalog-title-group">
          <h2 className="catalog-heading">
            Vuelos Disponibles: <span className="route-highlight">{nombreOrigen} ➔ {nombreDestino}</span>
          </h2>
          <p className="catalog-sub">Selecciona una opción para revisar el detalle y reservar</p>
        </div>
        <span className="results-count-pill">
          {vuelos.length} {vuelos.length === 1 ? 'itinerario' : 'itinerarios disponibles'}
        </span>
      </div>

      {vuelos.length === 0 ? (
        <div className="empty-catalog-alert">
          <span className="empty-alert-icon">⚠️</span>
          <div>
            <h4>No encontramos itinerarios directos para esta ruta</h4>
            <p>Intenta seleccionando otra combinación de origen y destino en el selector superior.</p>
          </div>
        </div>
      ) : (
        <div className="flights-cards-grid">
          {vuelos.map((vuelo) => (
            <TarjetaVuelo
              key={vuelo.id}
              vuelo={vuelo}
              esSeleccionada={vueloSeleccionado?.id === vuelo.id}
              onSeleccionar={onSeleccionarVuelo}
            />
          ))}
        </div>
      )}
    </section>
  );
}
