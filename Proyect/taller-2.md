# Taller 2: Investigación Teórica y Práctica sobre React

**Estudiante:** Miguel Ángel Núñez T00063303
**Curso:** Desarrollo Frontend - Segundo Corte

---

## Punto 1 · ¿Qué es React?

**¿Qué es React y para qué sirve?**
React es una potente biblioteca de JavaScript de código abierto, orientada al diseño y construcción de interfaces de usuario (UI) dinámicas, modulares y de alto rendimiento. En el panorama actual del desarrollo web, su propósito principal es la creación de *Single Page Applications* (SPA). En una SPA, el navegador descarga el sitio una sola vez y React se encarga de reescribir la página web actual de forma dinámica en respuesta a las interacciones del usuario, eliminando los molestos parpadeos y recargas de página que tenían las webs tradicionales, brindando una experiencia fluida similar a una aplicación de escritorio o móvil.

**Creador y Año de Aparición**
La tecnología nació dentro de las oficinas de Facebook (actualmente Meta) bajo la autoría de Jordan Walke, un ingeniero de software. El primer prototipo, denominado *FaxJS*, se probó internamente en 2011 para solucionar los problemas de lentitud del *News Feed* de Facebook. Tras su éxito, se integró en Instagram en 2012 y, finalmente, fue liberado al mundo como un proyecto de código abierto en mayo de 2013 durante la conferencia JSConf.

**¿Es una librería o un framework?**
Técnicamente y por definición estricta, React es una **librería** enfocada única y exclusivamente en la capa de la "Vista" (View) del patrón de arquitectura Modelo-Vista-Controlador (MVC). 
La diferencia conceptual radica en la "Inversión de Control": un framework (como Angular) dicta cómo debes organizar tu proyecto, te obliga a usar su sistema de rutas, sus peticiones HTTP y su estructura de carpetas. React, por el contrario, no te impone nada; tú decides qué herramientas añadirle. Sin embargo, en la industria actual, la línea se ha vuelto borrosa. Suele llamársele "framework" coloquialmente porque nadie usa React solo; siempre se acompaña de un ecosistema robusto (Vite para compilar, React Router para navegación, Redux o Zustand para estados globales) que termina formando una arquitectura completa.

**¿Qué significa que sea declarativo?**
En programación, el paradigma declarativo significa que el desarrollador describe el resultado final deseado en lugar de listar los pasos exactos para alcanzarlo. 
Imagina que estás en un restaurante: el enfoque imperativo sería entrar a la cocina y decirle al chef exactamente cómo cortar la cebolla, cuánto aceite usar y a qué temperatura poner el fuego. El enfoque declarativo (que usa React) es simplemente decirle al mesero: "Quiero una hamburguesa término medio". 
En código, tú declaras "Si la variable de error existe, muestra un texto rojo; si no, muestra el formulario". React recibe esta declaración y él mismo se encarga de ir al DOM, crear los elementos, aplicar los estilos y actualizar la pantalla, ocultando toda esa complejidad.

<div style="page-break-after: always;"></div>

## Punto 2 · ¿Qué problema resuelve React?

**Dificultad de construir interfaces con Vanilla JS**
Antes de la llegada de bibliotecas reactivas, la manipulación de la web se hacía tocando el Modelo de Objetos del Documento (DOM) de forma manual y directa mediante JavaScript puro (Vanilla JS), usando comandos como `document.getElementById` o `element.appendChild`. 
El problema es que las operaciones en el DOM real son computacionalmente muy lentas y costosas. Además, a medida que la aplicación crecía, el código se llenaba de manipulaciones aisladas y *Event Listeners* dispersos, creando un "código espagueti" donde era casi imposible rastrear qué función había modificado qué botón, dificultando el mantenimiento y propiciando errores.

**Enfoque Imperativo vs Declarativo**
- *Imperativo (Vanilla JS):* Te obliga a controlar el flujo paso a paso. Debes seleccionar un nodo, evaluar su valor actual, mutar sus clases CSS manualmente y volver a insertarlo. Es un proceso frágil; si el HTML cambia, tu código JS se rompe.
- *Declarativo (React):* Tú diseñas la interfaz basada en el "estado" de los datos. No mutas el HTML; simplemente cambias los datos (el estado) y la interfaz reacciona redibujándose automáticamente para reflejar la nueva realidad de la información.

**Sincronización de Interfaz y Datos: El Virtual DOM y la Reconciliación**
El mayor logro técnico de React es cómo resuelve la lentitud del DOM web utilizando el **Virtual DOM**. Este es una copia ligera y estructural del DOM real almacenada en la memoria RAM (en forma de objetos de JavaScript).
Cuando ocurre un cambio en los datos (por ejemplo, el usuario recibe un nuevo mensaje), React realiza el siguiente proceso:
1. Crea un nuevo árbol del Virtual DOM completo con los datos actualizados.
2. Ejecuta un algoritmo heurístico llamado *Diffing* que compara velozmente el nuevo Virtual DOM con el Virtual DOM anterior.
3. Este proceso, conocido como *Reconciliación*, detecta exactamente qué nodos específicos cambiaron.
4. Finalmente, envía un "parche" quirúrgico al DOM real, modificando **únicamente** lo estrictamente necesario (ej. solo cambia el texto de un párrafo en lugar de recargar toda la lista). Esto garantiza un rendimiento extraordinario.

**El rol de los componentes reutilizables**
React introdujo la filosofía de que la separación de responsabilidades no debe ser por "tecnología" (HTML en un archivo, JS en otro), sino por "Componentes". Al empaquetar la lógica y la interfaz en bloques independientes e inteligentes (botones, tarjetas, barras laterales), se soluciona la duplicación de código. Si una empresa necesita cambiar el diseño de las tarjetas de sus productos, modifica un solo componente y el cambio se propaga instantáneamente a lo largo de toda la aplicación, reduciendo el tiempo de desarrollo de semanas a horas.

<div style="page-break-after: always;"></div>

## Punto 3 · Principales componentes de React

### 1. Componentes
- **Definición:** Son el pilar arquitectónico de React. Técnicamente, son funciones de JavaScript que devuelven un fragmento de interfaz de usuario. Al anidarse unos dentro de otros, construyen lo que se conoce como el "Árbol de Componentes".
- **Características:** Son altamente reutilizables, modulares y actúan como "cajas negras" (su lógica interna es independiente de los demás). El estándar moderno es utilizar *Functional Components* (Componentes Funcionales) en lugar de los antiguos componentes de clase.
- **Ejemplo:**
```jsx
// Definimos un bloque aislado de interfaz (Un botón de "Comprar")
function BotonCompra() {
  const procesarPago = () => alert("Procesando pago...");
  return <button className="btn-pago" onClick={procesarPago}>Comprar Ahora</button>;
}
// Este botón puede llamarse 100 veces en la web y cada uno funcionará independiente
```

### 2. JSX (JavaScript XML)
- **Definición:** Es una extensión de la sintaxis de JavaScript desarrollada por Meta. Permite escribir estructuras declarativas muy parecidas a HTML directamente dentro del código JavaScript. 
- **Características:** Dado que los navegadores web no entienden JSX de forma nativa, requiere herramientas como Babel o Vite para "transpilarse" (traducirse) a JavaScript puro (`React.createElement`) antes de llegar al navegador. Su regla de oro es que todo el bloque de JSX debe estar envuelto en un único elemento padre, y todas las etiquetas (como `<img>` o `<br>`) deben cerrarse obligatoriamente con una barra inclinada (`/>`).
- **Ejemplo:**
```jsx
const usuarioActivo = "Farya";
const notificaciones = 5;

// JSX permite intercalar lógica JS real usando llaves { }
const PanelUsuario = (
  <div className="tarjeta-perfil">
    <h2>Bienvenido, {usuarioActivo.toUpperCase()}</h2>
    <p>Tienes {notificaciones + 2} alertas nuevas.</p>
  </div>
);
```

### 3. Props (Propiedades)
- **Definición:** Es el mecanismo mediante el cual la información viaja a través de la aplicación. Las props son los argumentos o parámetros que un componente padre le transmite a un componente hijo para configurarlo o alimentarlo con datos.
- **Características:** Siguen un modelo de **flujo unidireccional** (Top-Down Data Flow); los datos solo pueden viajar de arriba hacia abajo. Además, las props son estrictamente **inmutables**, es decir, el componente que las recibe tiene prohibido modificarlas directamente.
- **Ejemplo:**
```jsx
// El componente hijo recibe 'titulo' y 'precio' como Props (inmutables)
function TarjetaServidor(props) {
  return (
    <article>
      <h3>{props.titulo}</h3>
      <p>Costo mensual: ${props.precio}</p>
    </article>
  );
}

// El componente padre inyecta los datos reales al invocar al hijo
function Dashboard() {
  return <TarjetaServidor titulo="Base de Datos Farya" precio="45.99" />;
}
```

### 4. Estado (useState)
- **Definición:** Mientras que las Props son datos externos que no se pueden alterar, el **Estado** es la memoria interna, temporal y mutable de un componente. El hook `useState` es la función que permite a un componente recordar información a lo largo del tiempo.
- **Características:** Es la única forma de que React sepa que la interfaz debe actualizarse. Cuando llamas a la función actualizadora del estado, React intercepta la señal, destruye la versión anterior de la interfaz y la vuelve a dibujar (re-renderiza) con los datos nuevos.
- **Ejemplo:**
```jsx
import { useState } from 'react';

function ControlTemperatura() {
  // 'grados' es la memoria. 'setGrados' es el disparador de re-renderizado
  const [grados, setGrados] = useState(24);

  return (
    <section>
      <h3>Temperatura: {grados}°C</h3>
      {/* Al hacer clic, React detecta el cambio de estado y actualiza el <h3> */}
      <button onClick={() => setGrados(grados + 1)}>Subir Temperatura</button>
      <button onClick={() => setGrados(grados - 1)}>Bajar Temperatura</button>
    </section>
  );
}
```

### 5. Eventos
- **Definición:** Son el puente de interacción entre el usuario (ratón, teclado, toques) y el código de la aplicación.
- **Características:** En Vanilla JS, los eventos suelen diferir según el navegador web que use la persona (Chrome, Firefox, Safari). React soluciona esto utilizando **Eventos Sintéticos** (*Synthetic Events*), una capa que envuelve los eventos nativos del navegador para garantizar que funcionen exactamente igual en todos lados. Se escriben siempre usando *camelCase* (`onClick`, `onSubmit`, `onMouseEnter`).
- **Ejemplo:**
```jsx
function FormularioSeguro() {
  // Función manejadora del evento
  const interceptarEnvio = (evento) => {
    evento.preventDefault(); // Evitamos que la web parpadee y se reinicie
    console.log("Datos capturados, enviando al servidor asíncronamente...");
  };

  // onSubmit captura cuando el usuario presiona Enter o el botón de Submit
  return (
    <form onSubmit={interceptarEnvio}>
      <input type="password" placeholder="Contraseña de administrador" />
      <button type="submit">Autenticar</button>
    </form>
  );
}
```

<div style="page-break-after: always;"></div>

## Punto 4 · Importancia de React en la industria

**Elección de las empresas**
Las grandes compañías eligen React por su alto rendimiento (gracias al Virtual DOM), su facilidad para mantener código a largo plazo y la posibilidad de reutilizar componentes en distintas partes de una plataforma gigantesca, reduciendo costos de desarrollo.

**Aporte al ecosistema**
React ha impulsado toda una industria a su alrededor. Ha popularizado herramientas de compilación modernas (como Vite), gestores de estado (Zustand, Redux) y ha dado origen a frameworks "Full-Stack" ultra potentes como Next.js. Además, con React Native, permite usar la misma lógica web para compilar aplicaciones móviles nativas para iOS y Android.

**Comunidad y Mantenimiento**
Actualmente, sigue siendo mantenido activamente por ingenieros de Meta (Facebook) junto con miles de contribuyentes de código abierto. Esta comunidad masiva asegura que cualquier error, duda o necesidad de librerías de terceros (gráficos, calendarios, mapas) ya esté resuelta y documentada.

**Relevancia para un Frontend Developer**
Hoy en día, React es el estándar dominante en la industria. Dominarlo no es solo una ventaja competitiva, sino un requisito indispensable en la inmensa mayoría de ofertas laborales para desarrollo web a nivel global.

<div style="page-break-after: always;"></div>

## Punto 5 · Grandes empresas que utilizan React

### 1. Netflix
- **Uso:** Netflix utiliza React en su plataforma web para el catálogo y la reproducción, y creó una variante llamada React-Gibbon para renderizar interfaces de alto rendimiento en Smart TVs.
- **Relevancia:** Demuestra la capacidad de React para manejar aplicaciones con cargas extremas de datos asíncronos y animaciones pesadas, garantizando fluidez en dispositivos con hardware limitado (como los televisores).
- **Fuente:** *Netflix Technology Blog* - "React Foundation" / Conferencias de React (React Conf).

### 2. Airbnb
- **Uso:** Todo el flujo central de búsqueda, filtrado de propiedades y sistema de reservas en su plataforma web está construido con componentes de React.
- **Relevancia:** Airbnb fue uno de los pioneros en adoptar React. Desarrollaron y liberaron múltiples librerías de código abierto (como herramientas de testeo para React y guías de estilo de código) que hoy son estándar en la industria.
- **Fuente:** *Airbnb Engineering & Data Science Blog*.

<div style="page-break-after: always;"></div>

## Fuentes consultadas
- Documentación oficial de React: [react.dev](https://react.dev/)
- Meta Engineering Blog: [engineering.fb.com](https://engineering.fb.com/)
- Documentación histórica y de ecosistema (Vite, Next.js).