export default function SelectCiudad({ label, id, valor, onChange, ciudades, excluirId }) {
  const ciudadesDisponibles = excluirId
    ? ciudades.filter((c) => c.id !== excluirId)
    : ciudades;

  return (
    <div className="select-station-wrapper">
      <label htmlFor={id} className="station-field-label">{label}</label>
      <div className="select-container-custom">
        <select
          id={id}
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          className="station-select-native"
        >
          {ciudadesDisponibles.map((ciudad) => (
            <option key={ciudad.id} value={ciudad.id}>
              {ciudad.nombre} · {ciudad.id}
            </option>
          ))}
        </select>
        <span className="select-chevron">▾</span>
      </div>
    </div>
  );
}
