# Documentación Técnica — AeroCol Airlines

**Integrantes:** Miguel Núñez (T00063303) y Marien Daniela Toro Mangonez (T00078698)  
**Tecnologías:** React, Vite, JavaScript (ES6+), CSS3, Node.js (`server.cjs`), JSON (`db.json`), `localStorage`.

---

## 1. Descripción del proyecto

AeroCol Airlines es una aplicación web para buscar vuelos nacionales en Colombia, calcular el valor de una reserva según pasajeros y clase de cabina, y gestionar los pasajes emitidos.

- Conecta 6 ciudades (`BOG`, `MDE`, `CLO`, `BAQ`, `CTG`, `BGA`) mediante 76 vuelos en 30 rutas directas.
- Consume ciudades, cabinas, vuelos y reservas desde un servidor local en Node.js (`server.cjs`) respaldado por `db.json`.
- Mantiene respaldo automático en `localStorage` cuando el servidor no está activo.
- Incluye tema oscuro y tema claro con preferencia guardada en el navegador.

---

## 2. Arquitectura y flujo de datos

### Árbol de componentes

```text
                                    App.jsx
      [origen, destino, orden, vueloSeleccionado, reservas, vuelos, ciudades, clases, darkMode]
                                       │
        ┌──────────────────┬───────────┴───────────────┬──────────────────┐
        │                  │                           │                  │
    <Header />     <SelectorRuta />             <ListaVuelos />    <MisReservas />
  (tema oscuro)            │                           │                  │
                     ┌─────┴─────┐              ┌──────┴──────┐     (onEliminar)
                     │           │              │             │
              <SelectCiudad> <SelectCiudad> <TarjetaVuelo> ×N  (estado vacío)
                 (origen)      (destino)    (onSeleccionar)
                                                  │
                                         <FormularioReserva />
                                     [Local: nombre, pasajeros, claseId]
```

### Ubicación de estados y decisiones de diseño

1. **Estados `origen` y `destino` en `App.jsx`:** Viven en el componente raíz por elevación del estado (*Lifting State Up*), ya que los comparten `SelectorRuta` (para excluir la ciudad de origen en el selector de destino) y `ListaVuelos` (para filtrar qué vuelos mostrar).
2. **Selección de tarjetas en `ListaVuelos` y `TarjetaVuelo`:** `ListaVuelos` recibe `vueloSeleccionado` (para resaltar la tarjeta activa) y `onSeleccionarVuelo` (callback que sube el vuelo elegido a `App.jsx`).
3. **Estructura de una reserva:**
   ```json
   {
     "id": "550e8400-e29b-41d4-a716-446655440000",
     "codigoVuelo": "AC-006",
     "vueloId": "v6",
     "nombre": "Ana García",
     "origen": "MDE",
     "destino": "BOG",
     "avion": "ATR 72",
     "hora": "09:05",
     "pasajeros": 2,
     "clase": "Ejecutiva",
     "total": 832000,
     "fecha": "21 nov 2026"
   }
   ```
4. **Estado `reservas` en `App.jsx`:** Es el ancestro común entre `FormularioReserva` (quien crea la reserva) y `MisReservas` (quien la lista y elimina), lo que permite centralizar la sincronización con el servidor y `localStorage`.

---

## 3. Estructura de archivos

| Archivo | Función |
|---|---|
| `src/main.jsx` | Punto de entrada que monta `<App />` e importa `index.css`. |
| `src/App.jsx` | Componente raíz: carga datos del servidor, filtra y ordena vuelos, gestiona reservas y controla el tema oscuro/claro. |
| `src/components/Header.jsx` | Encabezado con logotipo, estado de disponibilidad y botón para alternar tema oscuro/claro. |
| `src/components/SelectorRuta.jsx` | Selectores de origen y destino, botón de intercambio rápido (`⇄`) y selector de ordenamiento. |
| `src/components/SelectCiudad.jsx` | Selector desplegable reutilizable; filtra `excluirId` para impedir origen igual a destino. |
| `src/components/ListaVuelos.jsx` | Lista los vuelos disponibles para la ruta o muestra aviso si no hay vuelos directos. |
| `src/components/TarjetaVuelo.jsx` | Tarjeta con código de vuelo, aeronave, salida/llegada, tarifa y botón de selección. |
| `src/components/FormularioReserva.jsx` | Formulario controlado de reserva (nombre, pasajeros, cabina) y cálculo derivado del total. |
| `src/components/MisReservas.jsx` | Pases de abordar emitidos con talón lateral y botón de cancelación. |
| `src/components/Footer.jsx` | Pie de página institucional. |
| `src/index.css` | Estilos globales, variables CSS para modo oscuro/claro y diseño responsivo. |
| `server.cjs` | Servidor HTTP en Node.js (puerto `3001`) con soporte CORS y lectura/escritura sobre `db.json`. |
| `db.json` | Base de datos JSON con `ciudades`, `clases`, `vuelos` y `reservas`. |
| `iniciar.bat` | Lanzador automático en Windows para iniciar servidor y frontend. |

---

## 4. Funcionalidades principales

### F1 — Formulario de reserva
- **Estados locales:** `nombre`, `pasajeros` y `claseId` viven en `FormularioReserva.jsx` porque ningún otro componente necesita esos valores temporales antes de confirmar.
- **Estado derivado (`total`):** No usa `useState`; se calcula directamente en cada render (`Math.round(vuelo.precio * pasajeros * claseSeleccionada.factor)`), evitando duplicar fuentes de verdad.
- **Props en `TarjetaVuelo`:** Se agregaron `onSeleccionar` (función callback) y `esSeleccionada` (booleano para resaltado visual).

### F2 — Mis reservas y persistencia
- **Inmutabilidad:** No se usa `.push()` porque muta la referencia en memoria y React no re-renderizaría. Al crear se genera un array nuevo con `[...prev, nuevaReserva]` y al eliminar se usa `prev.filter(r => r.id !== id)`.
- **Persistencia:** Sin almacenamiento persistente, al recargar la pestaña se perderían las reservas porque el estado vive en memoria RAM. Aquí se sincronizan en `App.jsx` con `server.cjs` y `localStorage`.

### F3 — Catálogo inteligente
- **Ordenamiento sobre copia:** Como `.sort()` muta el arreglo original, se ordena una copia superficial `[...vuelosFiltrados].sort(...)`.
- **Persistencia del orden:** El estado `orden` vive en `App.jsx`, por lo que se mantiene aunque el usuario cambie las ciudades de origen o destino.

---

## 5. Servidor local y endpoints API

El servidor corre en `http://localhost:3001` utilizando únicamente módulos nativos de Node.js (`http`, `fs`, `path`).

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/ciudades` | Devuelve las 6 ciudades disponibles. |
| `GET` | `/api/clases` | Devuelve las cabinas y sus factores (`1.0`, `1.6`, `2.4`). |
| `GET` | `/api/vuelos` | Devuelve los 76 vuelos registrados en `db.json`. |
| `GET` | `/api/reservas` | Devuelve las reservas almacenadas. |
| `POST` | `/api/reservas` | Guarda una nueva reserva en `db.json`. |
| `DELETE` | `/api/reservas/:id` | Elimina la reserva con el `id` indicado. |

---

## 6. Cómo ejecutarlo

```bash
# 1. Instalar dependencias (primera vez)
npm install

# 2. Terminal 1 - Servidor de datos
npm run server

# 3. Terminal 2 - Aplicación React
npm run dev
```

Abrir en el navegador: `http://localhost:5173`. En Windows también se puede ejecutar `iniciar.bat`.
