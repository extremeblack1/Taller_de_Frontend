import { useState } from 'react'

function ListaTareas() {
  const [tareas, setTareas] = useState([])
  const [texto, setTexto] = useState('')
  const [editandoId, setEditandoId] = useState(null)
  const [textoEdicion, setTextoEdicion] = useState('')

  function agregarTarea() {
    if (texto.trim() === '') return
    setTareas([...tareas, { id: Date.now(), texto: texto.trim() }])
    setTexto('')
  }

  function eliminarTarea(id) {
    setTareas(tareas.filter((t) => t.id !== id))
  }

  function empezarEdicion(tarea) {
    setEditandoId(tarea.id)
    setTextoEdicion(tarea.texto)
  }

  function guardarEdicion(id) {
    setTareas(
      tareas.map((t) => (t.id === id ? { ...t, texto: textoEdicion } : t)),
    )
    setEditandoId(null)
  }

  return (
    <div className="lista-tareas">
      <h2>Lista de tareas</h2>

      <div className="nueva-tarea">
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') agregarTarea()
          }}
          placeholder="Nueva tarea"
        />
        <button onClick={agregarTarea}>Agregar</button>
      </div>

      <ul>
        {tareas.map((t) =>
          editandoId === t.id ? (
            <li key={t.id}>
              <input
                value={textoEdicion}
                onChange={(e) => setTextoEdicion(e.target.value)}
              />
              <button onClick={() => guardarEdicion(t.id)}>Guardar</button>
              <button onClick={() => setEditandoId(null)}>Cancelar</button>
            </li>
          ) : (
            <li key={t.id}>
              <span>{t.texto}</span>
              <button onClick={() => empezarEdicion(t)}>Editar</button>
              <button onClick={() => eliminarTarea(t.id)}>Eliminar</button>
            </li>
          ),
        )}
      </ul>

      <p>{tareas.length} tareas</p>
    </div>
  )
}

export default ListaTareas