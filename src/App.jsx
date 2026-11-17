import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SelectorRuta from './components/SelectorRuta';
import ListaVuelos from './components/ListaVuelos';
import FormularioReserva from './components/FormularioReserva';
import MisReservas from './components/MisReservas';

const STORAGE_KEY = 'aerocol_reservas';
const API_BASE = 'http://localhost:3001/api';

export default function App() {
  // Datos dinámicos provistos por el sistema central
  const [ciudades, setCiudades] = useState([]);
  const [clases, setClases] = useState([]);
  const [vuelos, setVuelos] = useState([]);
  const [reservas, setReservas] = useState([]);

  // Estados de control de la aplicación
  const [origen, setOrigen] = useState('MDE');
  const [destino, setDestino] = useState('BOG');
  const [orden, setOrden] = useState('precio-asc');
  const [vueloSeleccionado, setVueloSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [sistemaEnLinea, setSistemaEnLinea] = useState(false);

  // 1. Cargar datos desde el sistema central en tiempo real
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
          throw new Error('Respuesta no satisfactoria del servicio');
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

  // Filtrado de vuelos según el origen y destino seleccionados
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
    <div className="app-container">
      <Header />

      {/* Indicador de estado del sistema (profesional y realista) */}
      <div className={`sistema-badge ${sistemaEnLinea ? 'en-linea' : 'contingencia'}`}>
        <span className="badge-punto">●</span>
        <span>
          {sistemaEnLinea
            ? 'Sistema en línea · Tarifas oficiales y disponibilidad de vuelos en tiempo real'
            : 'Modo sin conexión · Mostrando itinerarios y reservas en memoria local'}
        </span>
      </div>

      <main className="main-content">
        {cargando ? (
          <div className="card loading-card">
            <div className="spinner"></div>
            <p>Consultando itinerarios y disponibilidad en tiempo real...</p>
          </div>
        ) : (
          <>
            {/* Selector de ruta */}
            <SelectorRuta
              origen={origen}
              destino={destino}
              onCambiarOrigen={handleCambiarOrigen}
              onCambiarDestino={handleCambiarDestino}
              ciudades={ciudades}
              orden={orden}
              onCambiarOrden={setOrden}
            />

            {/* Catálogo de vuelos */}
            <ListaVuelos
              vuelos={vuelosOrdenados}
              nombreOrigen={nombreOrigen}
              nombreDestino={nombreDestino}
              vueloSeleccionado={vueloSeleccionado}
              onSeleccionarVuelo={setVueloSeleccionado}
            />

            {/* F1: Formulario de emisión de reserva */}
            {vueloSeleccionado && (
              <FormularioReserva
                vuelo={vueloSeleccionado}
                clases={clases}
                onReservar={handleCrearReserva}
                onCancelar={() => setVueloSeleccionado(null)}
              />
            )}

            {/* F2: Reservas emitidas */}
            <MisReservas
              reservas={reservas}
              onEliminarReserva={handleEliminarReserva}
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
