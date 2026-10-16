import { useState, useEffect } from 'react';

function App() {
  const [mensajes, setMensajes] = useState([]);
  const [nuevoTexto, setNuevoTexto] = useState("");
  
  const cargarMensajes = () => {
    fetch('http://localhost:8000/api/mensajes')
      .then(respuesta => respuesta.json())
      .then(datos => setMensajes(datos));
  };

  useEffect(() => {
    cargarMensajes();
  }, []);

  const enviarMensajeAlServidor = (evento) => {
    evento.preventDefault();
    if (nuevoTexto.trim() === "") return;

    fetch('http://localhost:8000/api/mensajes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texto: nuevoTexto })
    })
    .then(respuesta => respuesta.json())
    .then(() => {
      setNuevoTexto("");
      cargarMensajes();
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', maxWidth: '500px' }}>
      <h2>[ Panel de Transmisión Local ]</h2>
      
      {/* Formulario interactivo */}
      <form onSubmit={enviarMensajeAlServidor} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          value={nuevoTexto}
          onChange={(e) => setNuevoTexto(e.target.value)}
          placeholder="Escribe un comando o mensaje..."
          style={{ flexGrow: 1, padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Transmitir
        </button>
      </form>

      {/* Pantalla de resultados */}
      <div style={{ background: '#1e1e1e', color: '#00ff00', padding: '15px', borderRadius: '5px' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {mensajes.map((msg) => (
            <li key={msg.id} style={{ marginBottom: '8px', borderBottom: '1px solid #333', paddingBottom: '4px' }}>
              <strong>{'>'} Registro {msg.id}:</strong> {msg.texto}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;