import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

const CIUDADES = [
  { codigo: 'CTG', nombre: 'Cartagena' },
  { codigo: 'BOG', nombre: 'Bogotá' },
  { codigo: 'MDE', nombre: 'Medellín' },
  { codigo: 'BAQ', nombre: 'Barranquilla' },
  { codigo: 'SMR', nombre: 'Santa Marta' },
  { codigo: 'CLO', nombre: 'Cali' },
]

// Catálogo local de cotizaciones por ruta (origen-destino), en COP.
// La hora de llegada se calcula: salida + duración.
const VUELOS = {
  'CTG-BOG': { precio: 380000, duracionMin: 85, avion: 'Airbus A320', salida: '08:30' },
  'CTG-MDE': { precio: 320000, duracionMin: 70, avion: 'Airbus A320', salida: '07:15' },
  'CTG-BAQ': { precio: 240000, duracionMin: 55, avion: 'ATR 72', salida: '09:45' },
  'CTG-SMR': { precio: 220000, duracionMin: 50, avion: 'ATR 72', salida: '11:20' },
  'CTG-CLO': { precio: 410000, duracionMin: 100, avion: 'Boeing 737-800', salida: '14:05' },
  'BOG-CTG': { precio: 380000, duracionMin: 85, avion: 'Airbus A320', salida: '10:40' },
  'BOG-MDE': { precio: 260000, duracionMin: 50, avion: 'Airbus A320', salida: '06:50' },
  'BOG-BAQ': { precio: 340000, duracionMin: 85, avion: 'Boeing 737-800', salida: '13:10' },
  'BOG-SMR': { precio: 350000, duracionMin: 80, avion: 'Boeing 737-800', salida: '16:25' },
  'BOG-CLO': { precio: 290000, duracionMin: 60, avion: 'Airbus A320', salida: '07:40' },
  'MDE-CTG': { precio: 320000, duracionMin: 70, avion: 'Airbus A320', salida: '12:30' },
  'MDE-BOG': { precio: 260000, duracionMin: 50, avion: 'Airbus A320', salida: '09:05' },
  'MDE-BAQ': { precio: 280000, duracionMin: 65, avion: 'ATR 72', salida: '15:50' },
  'MDE-SMR': { precio: 270000, duracionMin: 60, avion: 'ATR 72', salida: '10:15' },
  'MDE-CLO': { precio: 300000, duracionMin: 55, avion: 'Airbus A320', salida: '18:00' },
  'BAQ-CTG': { precio: 240000, duracionMin: 55, avion: 'ATR 72', salida: '17:35' },
  'BAQ-BOG': { precio: 340000, duracionMin: 85, avion: 'Boeing 737-800', salida: '06:20' },
  'BAQ-MDE': { precio: 280000, duracionMin: 65, avion: 'ATR 72', salida: '08:55' },
  'BAQ-SMR': { precio: 180000, duracionMin: 40, avion: 'ATR 72', salida: '13:45' },
  'BAQ-CLO': { precio: 360000, duracionMin: 95, avion: 'Boeing 737-700', salida: '19:30' },
  'SMR-CTG': { precio: 220000, duracionMin: 50, avion: 'ATR 72', salida: '15:10' },
  'SMR-BOG': { precio: 350000, duracionMin: 80, avion: 'Boeing 737-800', salida: '11:55' },
  'SMR-MDE': { precio: 270000, duracionMin: 60, avion: 'ATR 72', salida: '09:30' },
  'SMR-BAQ': { precio: 180000, duracionMin: 40, avion: 'ATR 72', salida: '07:00' },
  'SMR-CLO': { precio: 370000, duracionMin: 105, avion: 'Boeing 737-700', salida: '14:40' },
  'CLO-CTG': { precio: 410000, duracionMin: 100, avion: 'Boeing 737-800', salida: '06:35' },
  'CLO-BOG': { precio: 290000, duracionMin: 60, avion: 'Airbus A320', salida: '08:10' },
  'CLO-MDE': { precio: 300000, duracionMin: 55, avion: 'Airbus A320', salida: '12:05' },
  'CLO-BAQ': { precio: 360000, duracionMin: 95, avion: 'Boeing 737-700', salida: '16:55' },
  'CLO-SMR': { precio: 370000, duracionMin: 105, avion: 'Boeing 737-700', salida: '10:25' },
}

function nombreCiudad(codigo) {
  return CIUDADES.find((c) => c.codigo === codigo)?.nombre ?? codigo
}

function formatoPrecio(precio) {
  return `$ ${precio.toLocaleString('es-CO')}`
}

function formatoDuracion(minutos) {
  const h = Math.floor(minutos / 60)
  const m = minutos % 60
  return h > 0 ? `${h}h ${String(m).padStart(2, '0')}min` : `${m}min`
}

function sumarMinutos(hora, minutos) {
  const [h, m] = hora.split(':').map(Number)
  const total = h * 60 + m + minutos
  const hh = String(Math.floor(total / 60) % 24).padStart(2, '0')
  const mm = String(total % 60).padStart(2, '0')
  return `${hh}:${mm}`
}

function fechaManana() {
  const f = new Date()
  f.setDate(f.getDate() + 1)
  const dd = String(f.getDate()).padStart(2, '0')
  const mm = String(f.getMonth() + 1).padStart(2, '0')
  return `${f.getFullYear()}-${mm}-${dd}`
}

function CotizadorVuelos() {
  const [origen, setOrigen] = useState('')
  const [destino, setDestino] = useState('')

  const rutaInvalida = origen !== '' && origen === destino
  const vuelo = !rutaInvalida && origen && destino
    ? VUELOS[`${origen}-${destino}`]
    : null
  const fecha = fechaManana()

  return (
    <div className="cotizador">
      <h2>✈️ Cotiza tu vuelo</h2>

      <div className="selects-row">
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

        <span className="flecha">→</span>

        <label>
          Destino
          <select
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
            disabled={!origen}
          >
            <option value="">— Elige destino —</option>
            {CIUDADES.filter((c) => c.codigo !== origen).map((c) => (
              <option key={c.codigo} value={c.codigo}>
                {c.nombre} ({c.codigo})
              </option>
            ))}
          </select>
        </label>
      </div>

      {rutaInvalida && (
        <p className="aviso">Elige un destino distinto al origen 🙃</p>
      )}

      {vuelo && (
        <div className="cotizacion">
          <h3>
            🛫 {nombreCiudad(origen)} → {nombreCiudad(destino)}
          </h3>
          <ul>
            <li>
              💰 Precio: <strong>{formatoPrecio(vuelo.precio)}</strong>
            </li>
            <li>⏱️ Duración: {formatoDuracion(vuelo.duracionMin)}</li>
            <li>🛩️ Avión: {vuelo.avion}</li>
            <li>
              🕐 Sale: {fecha} · {vuelo.salida}
            </li>
            <li>
              🕐 Llega: {fecha} · {sumarMinutos(vuelo.salida, vuelo.duracionMin)}
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <CotizadorVuelos />
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App