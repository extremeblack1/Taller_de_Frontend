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
  return (
    <section className="card selector-ruta-card">
      <div className="ruta-inputs-grid">
        <SelectCiudad
          label="Ciudad de origen"
          id="origen-select"
          valor={origen}
          onChange={onCambiarOrigen}
          ciudades={ciudades}
        />

        <div className="ruta-arrow" aria-hidden="true">➔</div>

        <SelectCiudad
          label="Ciudad de destino"
          id="destino-select"
          valor={destino}
          onChange={onCambiarDestino}
          ciudades={ciudades}
          excluirId={origen}
        />
      </div>

      <div className="orden-container">
        <label htmlFor="orden-select" className="label-campo">Ordenar resultados por:</label>
        <select
          id="orden-select"
          value={orden}
          onChange={(e) => onCambiarOrden(e.target.value)}
          className="select-input select-orden"
        >
          <option value="precio-asc">Precio: más económico primero</option>
          <option value="precio-desc">Precio: tarifas más altas primero</option>
          <option value="hora">Horario: salida más temprana</option>
          <option value="avion">Aeronave (A–Z)</option>
        </select>
      </div>
    </section>
  );
}
