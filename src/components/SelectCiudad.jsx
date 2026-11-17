export default function SelectCiudad({ label, id, valor, onChange, ciudades, excluirId }) {
  const ciudadesDisponibles = excluirId
    ? ciudades.filter((c) => c.id !== excluirId)
    : ciudades;

  return (
    <div className="select-ciudad">
      <label htmlFor={id} className="label-campo">{label}</label>
      <select
        id={id}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        className="select-input"
      >
        {ciudadesDisponibles.map((ciudad) => (
          <option key={ciudad.id} value={ciudad.id}>
            {ciudad.nombre} ({ciudad.id})
          </option>
        ))}
      </select>
    </div>
  );
}
