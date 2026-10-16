import { useState, useEffect } from 'react';

function App() {
  const [inventario, setInventario] = useState([]);
  const [formulario, setFormulario] = useState({ nombre: "", cantidad: 0 });
  const [editandoId, setEditandoId] = useState(null);

  // READ: Pide los datos al servidor
  const cargarInventario = () => {
    fetch('http://localhost:8000/api/inventario')
      .then(res => res.json())
      .then(datos => setInventario(datos));
  };

  useEffect(() => {
    cargarInventario();
  }, []);

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (formulario.nombre.trim() === "") return;

    if (editandoId) {
      // Petición PUT para actualizar existente
      fetch(`http://localhost:8000/api/inventario/${editandoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formulario)
      }).then(() => {
        setEditandoId(null);
        setFormulario({ nombre: "", cantidad: 0 });
        cargarInventario();
      });
    } else {
      // Petición POST para crear nuevo
      fetch('http://localhost:8000/api/inventario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formulario)
      }).then(() => {
        setFormulario({ nombre: "", cantidad: 0 });
        cargarInventario();
      });
    }
  };

  // DELETE: Borra un ítem por su ID
  const borrarItem = (id) => {
    fetch(`http://localhost:8000/api/inventario/${id}`, {
      method: 'DELETE'
    }).then(() => cargarInventario());
  };

  // Prepara el formulario para editar
  const prepararEdicion = (item) => {
    setEditandoId(item.id);
    setFormulario({ nombre: item.nombre, cantidad: item.cantidad });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px' }}>
      <h2>📦 Gestor de Inventario Hardware</h2>
      
      {/* Formulario de entrada */}
      <form onSubmit={manejarEnvio} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Nombre del componente" 
          value={formulario.nombre}
          onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
          style={{ flexGrow: 1, padding: '8px' }}
        />
        <input 
          type="number" 
          placeholder="Cant" 
          value={formulario.cantidad}
          onChange={(e) => setFormulario({ ...formulario, cantidad: parseInt(e.target.value) || 0 })}
          style={{ width: '70px', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>
          {editandoId ? "Actualizar" : "Agregar"}
        </button>
        {editandoId && (
          <button type="button" onClick={() => { setEditandoId(null); setFormulario({ nombre: "", cantidad: 0 }); }}>
            Cancelar
          </button>
        )}
      </form>

      {/* Tabla de datos */}
      <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '8px' }}>ID</th>
            <th style={{ padding: '8px' }}>Componente</th>
            <th style={{ padding: '8px' }}>Cantidad</th>
            <th style={{ padding: '8px' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inventario.map(item => (
            <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px' }}>{item.id}</td>
              <td style={{ padding: '8px' }}>{item.nombre}</td>
              <td style={{ padding: '8px' }}>{item.cantidad}</td>
              <td style={{ padding: '8px' }}>
                <button onClick={() => prepararEdicion(item)} style={{ marginRight: '5px' }}>Editar</button>
                <button onClick={() => borrarItem(item.id)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;