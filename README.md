# ✈️ Proyecto Final: AeroCol Airlines — Reserva tu vuelo

> **Módulo:** Desarrollo Front-End · Proyecto Final  
> **Integrantes:** Miguel Núñez (T00063303) y Marien Daniela Toro Mangonez (T00078698)  
> **Tecnologías:** React 18/19, Vite, JavaScript (ES6+), CSS3 nativo, Node.js HTTP Server (`server.cjs`).

AeroCol Airlines es una plataforma web para la búsqueda, selección y emisión de reservas de vuelos nacionales en Colombia. Permite consultar itinerarios interconectados entre 6 ciudades, ordenar el catálogo en tiempo real, calcular tarifas dinámicas según cabina y pasajeros, y gestionar reservas con persistencia tanto en almacenamiento local (`localStorage`) como en un servidor central (`db.json`).

---

## 🌳 Árbol de Componentes y Jerarquía de Estado

```
                                    App
  [Estados: origen, destino, orden, vueloSeleccionado, reservas, ciudades, clases, vuelos]
                                     │
      ┌────────────────┬─────────────┴─────────────────┬────────────────┐
      │                │                               │                │
   <Header>     <SelectorRuta>                   <ListaVuelos>    <MisReservas>
                       │                               │                │
                 ┌─────┴─────┐                  ┌──────┴──────┐    (onEliminar)
                 │           │                  │             │
           <SelectCiudad> <SelectCiudad>  <TarjetaVuelo> ×N  (vacío)
              (origen)      (destino)     (onSeleccionar)
                                                │
                                      <FormularioReserva>
                                  (solo si vueloSeleccionado)
                                         (onReservar)
```

---

## ✍️ Documentación de Conceptos (Fase 2)

### 🟢 F1 — Formulario de Reserva
1. **¿Dónde viven los estados del formulario y por qué?**
   - Viven dentro de `FormularioReserva.jsx` (`nombre`, `pasajeros`, `claseId`). Son estados locales porque ningún otro componente externo necesita conocer los valores temporales que el usuario escribe o cambia antes de pulsar *"Confirmar Reserva"*. Solo cuando se envía el formulario, la información empaquetada sube hacia `App`.
2. **¿Por qué el total no es un `useState` más?**
   - Porque es un **estado derivado**. El total se calcula directamente a partir de valores ya existentes:
     $$\text{Total} = \text{precioBase} \times \text{pasajeros} \times \text{factorClase}$$
     Si se guardara en un `useState`, tendríamos dos fuentes de la verdad y riesgo de desincronización al cambiar pasajeros o clase.
3. **¿Qué prop le agregaste a `TarjetaVuelo` y para qué?**
   - Se le agregaron `onSeleccionar` (función callback) y `esSeleccionada` (booleano). Permite que la tarjeta le avise al componente padre `App` cuál vuelo fue clickeado (*los datos suben, las funciones bajan*) y aplique una clase CSS condicional para resaltarla visualmente.

### 🟡 F2 — Mis Reservas (Persistencia con `localStorage` y API)
1. **¿Por qué no mutar el array directamente con `push`?**
   - En React, el estado es **inmutable**. Si usamos `reservas.push(...)`, modificamos la referencia existente en memoria y React no detecta el cambio, por lo que **no re-renderiza** la interfaz. Con `[...prev, nueva]` se genera una nueva referencia en memoria que dispara el re-renderizado reactivo.
2. **¿Qué le pasa a tus reservas si recargas la página sin `localStorage`?**
   - El estado de React se almacena en la memoria volátil del navegador (RAM de la pestaña). Al recargar la página, todo el árbol de componentes se desmonta y se reinicia a su valor inicial (`[]`), perdiendo todos los datos si no existe persistencia.
3. **¿Dónde pones la lógica de guardar y por qué?**
   - Se gestiona en `App.jsx`, sincronizando mediante un `useEffect` cuando el array `reservas` cambia, y leyendo con una función inicializadora perezosa en `useState(() => JSON.parse(...))`. De esta forma, cualquier alta o baja de reservas se refleja fielmente tanto en disco (`localStorage`) como en el servidor backend.

### 🔴 F3 — Catálogo Inteligente: Ordenar + Detalle
1. **¿Por qué hay que ordenar una copia del array y no el original?**
   - En JavaScript, `.sort()` muta el array en su lugar (*in-place*). Si ordenáramos el array del estado directamente, violaríamos la inmutabilidad de React. Por ello se crea una copia superficial previa con spread operator: `[...vuelosFiltrados].sort(...)`.
2. **¿Qué pasó con el orden al cambiar de ruta? ¿Se mantiene?**
   - Sí, se mantiene porque el estado `orden` reside en `App.jsx` y su valor perdura independientemente de los cambios en los desplegables de origen y destino.
3. **¿Cómo le avisa la tarjeta a `App` que fue seleccionada?**
   - Mediante la técnica de *lifting state up* (elevar el estado): `TarjetaVuelo` ejecuta la función callback `onSeleccionar(vuelo)` en su evento `onClick`, transmitiendo el objeto del vuelo hacia `App`.

---

## 💡 Decisión de Diseño más Importante

Nuestra decisión de diseño principal fue la **separación estricta de responsabilidades con desacoplamiento total de datos**:
El frontend en React no almacena datos de catálogo "quemados" (hardcoded). En su lugar, consume un servicio API local REST (`server.cjs` respaldado por `db.json`), manteniendo un modo de contingencia con `localStorage` para garantizar que la app siga operativa incluso sin conexión. Esto garantiza una arquitectura profesional, escalable y mantenible.

---

## 🚀 Cómo ejecutar la aplicación

### Prerrequisitos
- Node.js

### Paso 1: Instalar dependencias
```bash
npm install
```

### Paso 2: Iniciar el servidor central de datos (Terminal 1)
```bash
npm run server
```

### Paso 3: Iniciar la aplicación web React (Terminal 2)
```bash
npm run dev
```
