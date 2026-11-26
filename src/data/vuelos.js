export const CIUDADES = [
  { id: 'BOG', nombre: 'Bogotá' },
  { id: 'MDE', nombre: 'Medellín' },
  { id: 'CLO', nombre: 'Cali' },
  { id: 'BAQ', nombre: 'Barranquilla' },
  { id: 'CTG', nombre: 'Cartagena' },
  { id: 'BGA', nombre: 'Bucaramanga' }
];

export const CLASES = [
  { id: 'eco', nombre: 'Económica', factor: 1.0 },
  { id: 'eje', nombre: 'Ejecutiva', factor: 1.6 },
  { id: 'pri', nombre: 'Primera', factor: 2.4 }
];

export const VUELOS = [
  // --- Bogotá (BOG) → Medellín (MDE) ---
  { id: 'v1', origen: 'BOG', destino: 'MDE', avion: 'Airbus A320', hora: '06:15', precio: 195000 },
  { id: 'v2', origen: 'BOG', destino: 'MDE', avion: 'Boeing 737', hora: '08:00', precio: 220000 },
  { id: 'v3', origen: 'BOG', destino: 'MDE', avion: 'Airbus A321', hora: '11:45', precio: 250000 },
  { id: 'v4', origen: 'BOG', destino: 'MDE', avion: 'Embraer 190', hora: '15:30', precio: 210000 },
  { id: 'v5', origen: 'BOG', destino: 'MDE', avion: 'Airbus A320', hora: '18:20', precio: 280000 },
  { id: 'v6', origen: 'BOG', destino: 'MDE', avion: 'Boeing 737 MAX', hora: '21:10', precio: 185000 },

  // --- Medellín (MDE) → Bogotá (BOG) ---
  { id: 'v7', origen: 'MDE', destino: 'BOG', avion: 'Airbus A320', hora: '06:50', precio: 210000 },
  { id: 'v8', origen: 'MDE', destino: 'BOG', avion: 'ATR 72', hora: '09:05', precio: 260000 }, // Vuelo de referencia de la guía
  { id: 'v9', origen: 'MDE', destino: 'BOG', avion: 'Boeing 737', hora: '13:15', precio: 235000 },
  { id: 'v10', origen: 'MDE', destino: 'BOG', avion: 'Embraer 190', hora: '16:40', precio: 200000 },
  { id: 'v11', origen: 'MDE', destino: 'BOG', avion: 'Airbus A321', hora: '19:30', precio: 275000 },
  { id: 'v12', origen: 'MDE', destino: 'BOG', avion: 'Airbus A320', hora: '22:00', precio: 190000 },

  // --- Bogotá (BOG) ↔ Cali (CLO) ---
  { id: 'v13', origen: 'BOG', destino: 'CLO', avion: 'Boeing 737', hora: '07:30', precio: 230000 },
  { id: 'v14', origen: 'BOG', destino: 'CLO', avion: 'Airbus A320', hora: '14:00', precio: 265000 },
  { id: 'v15', origen: 'BOG', destino: 'CLO', avion: 'Embraer 190', hora: '20:15', precio: 195000 },
  { id: 'v16', origen: 'CLO', destino: 'BOG', avion: 'Embraer 190', hora: '06:00', precio: 190000 },
  { id: 'v17', origen: 'CLO', destino: 'BOG', avion: 'Boeing 737', hora: '12:30', precio: 240000 },
  { id: 'v18', origen: 'CLO', destino: 'BOG', avion: 'Airbus A320', hora: '17:45', precio: 255000 },

  // --- Bogotá (BOG) ↔ Cartagena (CTG) ---
  { id: 'v19', origen: 'BOG', destino: 'CTG', avion: 'Airbus A320', hora: '08:45', precio: 320000 },
  { id: 'v20', origen: 'BOG', destino: 'CTG', avion: 'Airbus A321', hora: '14:20', precio: 350000 },
  { id: 'v21', origen: 'BOG', destino: 'CTG', avion: 'Boeing 737', hora: '19:00', precio: 295000 },
  { id: 'v22', origen: 'CTG', destino: 'BOG', avion: 'Airbus A320', hora: '07:15', precio: 310000 },
  { id: 'v23', origen: 'CTG', destino: 'BOG', avion: 'Boeing 737', hora: '13:00', precio: 330000 },
  { id: 'v24', origen: 'CTG', destino: 'BOG', avion: 'Airbus A321', hora: '18:50', precio: 290000 },

  // --- Medellín (MDE) ↔ Cartagena (CTG) ---
  { id: 'v25', origen: 'MDE', destino: 'CTG', avion: 'ATR 72', hora: '08:10', precio: 270000 },
  { id: 'v26', origen: 'MDE', destino: 'CTG', avion: 'Airbus A320', hora: '12:50', precio: 310000 },
  { id: 'v27', origen: 'MDE', destino: 'CTG', avion: 'Boeing 737', hora: '17:35', precio: 285000 },
  { id: 'v28', origen: 'CTG', destino: 'MDE', avion: 'Airbus A320', hora: '10:20', precio: 295000 },
  { id: 'v29', origen: 'CTG', destino: 'MDE', avion: 'Boeing 737', hora: '15:10', precio: 280000 },

  // --- Bogotá (BOG) ↔ Barranquilla (BAQ) ---
  { id: 'v30', origen: 'BOG', destino: 'BAQ', avion: 'Airbus A320', hora: '09:00', precio: 290000 },
  { id: 'v31', origen: 'BOG', destino: 'BAQ', avion: 'Boeing 737', hora: '16:15', precio: 315000 },
  { id: 'v32', origen: 'BAQ', destino: 'BOG', avion: 'Airbus A320', hora: '11:30', precio: 300000 },
  { id: 'v33', origen: 'BAQ', destino: 'BOG', avion: 'Boeing 737', hora: '18:40', precio: 285000 },

  // --- Bogotá (BOG) ↔ Bucaramanga (BGA) ---
  { id: 'v34', origen: 'BOG', destino: 'BGA', avion: 'ATR 72', hora: '07:00', precio: 175000 },
  { id: 'v35', origen: 'BOG', destino: 'BGA', avion: 'Embraer 190', hora: '15:00', precio: 195000 },
  { id: 'v36', origen: 'BGA', destino: 'BOG', avion: 'ATR 72', hora: '09:30', precio: 180000 },
  { id: 'v37', origen: 'BGA', destino: 'BOG', avion: 'Embraer 190', hora: '17:15', precio: 190000 },

  // --- Medellín (MDE) ↔ Cali (CLO) ---
  { id: 'v38', origen: 'MDE', destino: 'CLO', avion: 'ATR 72', hora: '08:25', precio: 185000 },
  { id: 'v39', origen: 'MDE', destino: 'CLO', avion: 'Embraer 190', hora: '16:00', precio: 215000 },
  { id: 'v40', origen: 'CLO', destino: 'MDE', avion: 'ATR 72', hora: '10:45', precio: 190000 },
  { id: 'v41', origen: 'CLO', destino: 'MDE', avion: 'Embraer 190', hora: '18:20', precio: 210000 }
];
