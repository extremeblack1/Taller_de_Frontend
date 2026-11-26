import SelectCiudad from './SelectCiudad';

export default function SelectorRuta({
  origen,
  destino,
  onCambiarOrigen,
  onCambiarDestino,
  ciudades,
  orden,
  onCambiarOrden
}) {
  // Función para intercambiar origen y destino
  const handleSwap = () => {
    const temp = origen;
    onCambiarOrigen(destino);
    onCambiarDestino(temp);
  };

  return (
    <section className="search-banner-card">
      <div className="search-bar-header">
        <div className="search-title-group">
          <span className="search-icon-badge">🛫</span>
          <div>
            <h3>Planifica tu itinerario</h3>
            <p>Selecciona tu ciudad de salida y destino en Colombia</p>
          </div>
        </div>

        {/* Control de ordenamiento estilizado */}
        <div className="order-picker-wrap">
          <label htmlFor="orden-select" className="order-label">
            <span className="filter-icon">⚡</span> Ordenar por:
          </label>
          <select
            id="orden-select"
            value={orden}
            onChange={(e) => onCambiarOrden(e.target.value)}
            className="order-select-styled"
          >
            <option value="precio-asc">💰 Menor precio primero</option>
            <option value="precio-desc">💎 Tarifas ejecutivas primero</option>
            <option value="hora">🕒 Salida más temprana</option>
            <option value="avion">✈️ Aeronave (A–Z)</option>
          </select>
        </div>
      </div>

      <div className="booking-inputs-row">
        <div className="input-station-box">
          <span className="box-tag">ORIGEN</span>
          <SelectCiudad
            label="¿De dónde sales?"
            id="origen-select"
            valor={origen}
            onChange={onCambiarOrigen}
            ciudades={ciudades}
          />
        </div>

        <button
          type="button"
          className="btn-swap-stations"
          onClick={handleSwap}
          title="Invertir origen y destino"
          aria-label="Invertir origen y destino"
        >
          ⇄
        </button>

        <div className="input-station-box">
          <span className="box-tag">DESTINO</span>
          <SelectCiudad
            label="¿A dónde viajas?"
            id="destino-select"
            valor={destino}
            onChange={onCambiarDestino}
            ciudades={ciudades}
            excluirId={origen}
          />
        </div>
      </div>
    </section>
  );
}
