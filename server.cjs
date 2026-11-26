const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const DB_FILE = path.join(__dirname, 'db.json');

// Cargar o inicializar db.json
function leerDB() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const inicial = { ciudades: [], clases: [], vuelos: [], reservas: [] };
      fs.writeFileSync(DB_FILE, JSON.stringify(inicial, null, 2));
      return inicial;
    }
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  } catch (error) {
    console.error('Error leyendo db.json:', error);
    return { ciudades: [], clases: [], vuelos: [], reservas: [] };
  }
}

function guardarDB(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error guardando en db.json:', error);
  }
}

// Configurar cabeceras CORS
function setCORS(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

const server = http.createServer((req, res) => {
  setCORS(res);

  // Preflight OPTIONS
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const { method, url } = req;
  const db = leerDB();

  // GET /api/ciudades
  if (method === 'GET' && url === '/api/ciudades') {
    console.log(`📥 [GET] /api/ciudades (${db.ciudades?.length || 0} ciudades)`);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db.ciudades || []));
    return;
  }

  // GET /api/clases
  if (method === 'GET' && url === '/api/clases') {
    console.log(`📥 [GET] /api/clases (${db.clases?.length || 0} clases)`);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db.clases || []));
    return;
  }

  // GET /api/vuelos
  if (method === 'GET' && url === '/api/vuelos') {
    console.log(`📥 [GET] /api/vuelos (${db.vuelos?.length || 0} vuelos entregados desde el servidor)`);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db.vuelos || []));
    return;
  }

  // GET /api/reservas
  if (method === 'GET' && url === '/api/reservas') {
    console.log(`📥 [GET] /api/reservas (${db.reservas?.length || 0} reservas entregadas)`);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db.reservas || []));
    return;
  }

  // POST /api/reservas
  if (method === 'POST' && url === '/api/reservas') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const nuevaReserva = JSON.parse(body);
        if (!nuevaReserva.id) {
          nuevaReserva.id = 'res_' + Date.now();
        }
        if (!db.reservas) db.reservas = [];
        db.reservas.push(nuevaReserva);
        guardarDB(db);

        console.log(`✅ [POST] /api/reservas — Guardada en el servidor: ${nuevaReserva.nombre} (${nuevaReserva.avion}) - Total: $${nuevaReserva.total}`);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(nuevaReserva));
      } catch (err) {
        console.error('Error en POST /api/reservas:', err);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Cuerpo JSON inválido' }));
      }
    });
    return;
  }

  // DELETE /api/reservas/:id
  if (method === 'DELETE' && url.startsWith('/api/reservas/')) {
    const id = url.replace('/api/reservas/', '');
    const longitudAntes = db.reservas ? db.reservas.length : 0;
    db.reservas = (db.reservas || []).filter((r) => r.id !== id);
    guardarDB(db);

    console.log(`🗑️ [DELETE] /api/reservas/${id} — Eliminada del servidor`);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, id }));
    return;
  }

  // Ruta no encontrada
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
});

server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║   ✈️  AeroCol Backend Server Local ACTIVO                  ║
║   🌐 URL: http://localhost:${PORT}                           ║
║   📁 Base de datos centralizada: db.json                   ║
║   Endpoints disponibles:                                   ║
║     - GET    http://localhost:${PORT}/api/ciudades            ║
║     - GET    http://localhost:${PORT}/api/clases              ║
║     - GET    http://localhost:${PORT}/api/vuelos              ║
║     - GET    http://localhost:${PORT}/api/reservas            ║
║     - POST   http://localhost:${PORT}/api/reservas            ║
║     - DELETE http://localhost:${PORT}/api/reservas/:id        ║
╚════════════════════════════════════════════════════════════╝
  `);
});
