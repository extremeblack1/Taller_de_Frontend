from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Nuestra base de datos
mensajes_guardados = [{"id": 1, "texto": "Servidor iniciado. Esperando comandos..."}]

# 2. Modelo estricto para recibir datos
class MensajeRecibido(BaseModel):
    texto: str

# 3. GET: pide leer los datos
@app.get("/api/mensajes")
def leer_mensajes():
    return mensajes_guardados

# 4. POST: React envía nuevos datos para guardar
@app.post("/api/mensajes")
def guardar_mensaje(nuevo_mensaje: MensajeRecibido):
    nuevo_id = len(mensajes_guardados) + 1
    # Armamos un diccionario con el nuevo dato y lo metemos a la lista
    mensaje_diccionario = {"id": nuevo_id, "texto": nuevo_mensaje.texto}
    mensajes_guardados.append(mensaje_diccionario)
    
    return {"status": "ok", "mensaje_agregado": mensaje_diccionario}