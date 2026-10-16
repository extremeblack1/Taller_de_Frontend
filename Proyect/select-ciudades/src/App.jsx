import { useState } from 'react'
import './App.css'

const CIUDADES = [
  { codigo: 'CTG', nombre: 'Cartagena' },
  { codigo: 'BOG', nombre: 'Bogotá' },
  { codigo: 'MDE', nombre: 'Medellín' },
  { codigo: 'BAQ', nombre: 'Barranquilla' },
  { codigo: 'SMR', nombre: 'Santa Marta' },
  { codigo: 'CLO', nombre: 'Cali' },
]

function nombreCiudad(codigo) {
  return CIUDADES.find((c) => c.codigo === codigo)?.nombre ?? codigo
}

function App() {
  const [origen, setOrigen] = useState('')
  const [destino, setDestino] = useState('')

  const origenValido = origen !== ''
  const destinoIgual = origen !== '' && origen === destino

  return (
    <main>
      <h1>select-ciudades</h1>

      <div className="selector">
        <h2>✈️ Elige tu ruta</h2>

        <label>
          Origen
          <select
            value={origen}
            onChange={(e) => {
              const nuevo = e.target.value
              setOrigen(nuevo)
              if (nuevo === destino) setDestino('')
            }}
          >
            <option value="">— Elige origen —</option>
            {CIUDADES.map((c) => (
              <option key={c.codigo} value={c.codigo}>
                {c.nombre} ({c.codigo})
              </option>
            ))}
          </select>
        </label>

        <label>
          Destino
          <select
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
            disabled={!origenValido}
          >
            <option value="">— Elige destino —</option>
            {CIUDADES.filter((c) => c.codigo !== origen).map((c) => (
              <option key={c.codigo} value={c.codigo}>
                {c.nombre} ({c.codigo})
              </option>
            ))}
          </select>
        </label>

        {destinoIgual && <p className="aviso">El destino debe ser distinto al origen 🙃</p>}

        {origenValido && destino !== '' && !destinoIgual && (
          <p className="ciudad-elegida">
            ✅ Tu ruta: {nombreCiudad(origen)} → {nombreCiudad(destino)}
          </p>
        )}
      </div>
    </main>
  )
}

export default App