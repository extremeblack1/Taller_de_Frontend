import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SelectorRuta from './components/SelectorRuta';
import ListaVuelos from './components/ListaVuelos';
import FormularioReserva from './components/FormularioReserva';
import MisReservas from './components/MisReservas';

const STORAGE_KEY = 'aerocol_reservas';
const THEME_KEY = 'aerocol_theme';
const API_BASE = 'http://localhost:3001/api';

export default function App() {
  // Datos provistos por el servidor
  const [ciudades, setCiudades] = useState([]);
  const [clases, setClases] = useState([]);
  const [vuelos, setVuelos] = useState([]);
  const [reservas, setReservas] = useState([]);

  // Estados de control
  const [origen, setOrigen] = useState('MDE');
  const [destino, setDestino] = useState('BOG');
  const [orden, setOrden] = useState('precio-asc');
  const [vueloSeleccionado, setVueloSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [sistemaEnLinea, setSistemaEnLinea] = useState(false);

  // Modo oscuro (activado por defecto)
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      return saved ? saved === 'dark' : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    const theme = darkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignorar errores de almacenamiento
    }
  }, [darkMode]);

  // Referencia para scroll suave hacia el formulario al seleccionar
  const formularioRef = useRef(null);

  // 1. Cargar datos desde la API central
  useEffect(() => {
    async function sincronizarDisponibilidad() {
      try {
        setCargando(true);

        const [resCiudades, resClases, resVuelos, resReservas] = await Promise.all([
          fetch(`${API_BASE}/ciudades`),
          fetch(`${API_BASE}/clases`),
          fetch(`${API_BASE}/vuelos`),
          fetch(`${API_BASE}/reservas`),
        ]);

        if (!resVuelos.ok || !resCiudades.ok) {
          throw new Error('Servicio no disponible');
        }

        const dataCiudades = await resCiudades.json();
        const dataClases = await resClases.json();
        const dataVuelos = await resVuelos.json();
        const dataReservas = await resReservas.json();

        setCiudades(dataCiudades);
        setClases(dataClases);
        setVuelos(dataVuelos);
        setReservas(dataReservas);
        setSistemaEnLinea(true);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataReservas));
      } catch (error) {
        console.warn('Operando en modo de contingencia local:', error);
        setSistemaEnLinea(false);

        try {
          const guardadas = localStorage.getItem(STORAGE_KEY);
          if (guardadas) setReservas(JSON.parse(guardadas));
        } catch (e) {
          console.error(e);
        }
      } finally {
        setCargando(false);
      }
    }

    sincronizarDisponibilidad();
  }, []);

  // Al seleccionar un vuelo, hacer scroll suave al formulario
  const handleSeleccionarVuelo = (vuelo) => {
    setVueloSeleccionado(vuelo);
    setTimeout(() => {
      formularioRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  // Manejo de cambio de ruta asegurando que origen y destino no coincidan
  const handleCambiarOrigen = (nuevoOrigen) => {
    setOrigen(nuevoOrigen);
    setVueloSeleccionado(null);
    if (nuevoOrigen === destino) {
      const otraCiudad = ciudades.find((c) => c.id !== nuevoOrigen);
      if (otraCiudad) setDestino(otraCiudad.id);
    }
  };

  const handleCambiarDestino = (nuevoDestino) => {
    setDestino(nuevoDestino);
    setVueloSeleccionado(null);
  };

  // F1: Registrar y emitir reserva
  const handleCrearReserva = async (nuevaReserva) => {
    setReservas((prev) => [...prev, nuevaReserva]);
    setVueloSeleccionado(null); // Cerrar formulario tras reservar con éxito

    try {
      const res = await fetch(`${API_BASE}/reservas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaReserva),
      });
      if (res.ok) {
        setSistemaEnLinea(true);
      }
    } catch {
      setSistemaEnLinea(false);
    }
  };

  // F2: Cancelar reserva
  const handleEliminarReserva = async (idReserva) => {
    setReservas((prev) => prev.filter((r) => r.id !== idReserva));

    try {
      const res = await fetch(`${API_BASE}/reservas/${idReserva}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setSistemaEnLinea(true);
      }
    } catch {
      setSistemaEnLinea(false);
    }
  };

  const nombreOrigen = ciudades.find((c) => c.id === origen)?.nombre || origen;
  const nombreDestino = ciudades.find((c) => c.id === destino)?.nombre || destino;

  // Filtrado de vuelos según origen y destino
  const vuelosFiltrados = vuelos.filter(
    (vuelo) => vuelo.origen === origen && vuelo.destino === destino
  );

  // F3: Ordenamiento inmutable
  const vuelosOrdenados = [...vuelosFiltrados].sort((a, b) => {
    if (orden === 'precio-asc') return a.precio - b.precio;
    if (orden === 'precio-desc') return b.precio - a.precio;
    if (orden === 'hora') return a.hora.localeCompare(b.hora);
    if (orden === 'avion') return a.avion.localeCompare(b.avion);
    return 0;
  });

  return (
    <div className="airline-app-shell">
      <Header
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((prev) => !prev)}
      />

      {/* Indicador de disponibilidad */}
      <div className="status-radar-strip">
        <div className={`radar-pill ${sistemaEnLinea ? 'online' : 'fallback'}`}>
          <span className="radar-light"></span>
          <span className="radar-text">
            {sistemaEnLinea
              ? 'En línea · Vuelos disponibles'
              : 'Sin conexión · Reservas guardadas localmente'}
          </span>
        </div>
      </div>

      <main className="airline-main-viewport">
        {cargando ? (
          <div className="loading-state-card">
            <div className="loading-radar-ring"></div>
            <h3>Cargando vuelos...</h3>
            <p>Obteniendo itinerarios disponibles</p>
          </div>
        ) : (
          <div className="app-sections-stack">
            {/* 1. Selector de Ruta */}
            <SelectorRuta
              origen={origen}
              destino={destino}
              onCambiarOrigen={handleCambiarOrigen}
              onCambiarDestino={handleCambiarDestino}
              ciudades={ciudades}
              orden={orden}
              onCambiarOrden={setOrden}
            />

            {/* 2. Catálogo de Vuelos */}
            <ListaVuelos
              vuelos={vuelosOrdenados}
              nombreOrigen={nombreOrigen}
              nombreDestino={nombreDestino}
              vueloSeleccionado={vueloSeleccionado}
              onSeleccionarVuelo={handleSeleccionarVuelo}
            />

            {/* 3. Formulario de Reserva (Modal / Card Dinámico) */}
            {vueloSeleccionado && (
              <div ref={formularioRef} className="reservation-wrapper-anchor">
                <FormularioReserva
                  vuelo={vueloSeleccionado}
                  clases={clases}
                  onReservar={handleCrearReserva}
                  onCancelar={() => setVueloSeleccionado(null)}
                />
              </div>
            )}

            {/* 4. Pases de Abordar y Reservas */}
            <MisReservas
              reservas={reservas}
              onEliminarReserva={handleEliminarReserva}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
