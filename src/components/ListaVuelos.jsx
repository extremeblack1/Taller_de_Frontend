import TarjetaVuelo from './TarjetaVuelo';

export default function ListaVuelos({
  vuelos,
  nombreOrigen,
  nombreDestino,
  vueloSeleccionado,
  onSeleccionarVuelo
}) {
  return (
    <section className="lista-vuelos-section">
      <h2 className="seccion-titulo">
        🛫 Itinerarios disponibles: {nombreOrigen} → {nombreDestino} ({vuelos.length} {vuelos.length === 1 ? 'vuelo directo' : 'vuelos directos'})
      </h2>

      {vuelos.length === 0 ? (
        <div className="aviso-sin-vuelos">
          <p>ℹ️ No encontramos vuelos directos programados para esta ruta actualmente.</p>
          <small>Te sugerimos seleccionar otra combinación de ciudades disponibles en nuestra red nacional.</small>
        </div>
      ) : (
        <div className="vuelos-grid">
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
