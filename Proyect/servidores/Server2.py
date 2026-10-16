from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Base de datos simulada en memoria
inventario = [
    {"id": 1, "nombre": "Raspberry Pi 4", "cantidad": 5},
    {"id": 2, "nombre": "Switch Ethernet 8 puertos", "cantidad": 2}
]
contador_id = 3

class ItemInventario(BaseModel):
    nombre: str
    cantidad: int

# READ (Leer todo)
@app.get("/api/inventario")
def leer_inventario():
    return inventario

# CREATE (Agregar nuevo)
@app.post("/api/inventario")
def agregar_item(item: ItemInventario):
    global contador_id
    nuevo = {"id": contador_id, "nombre": item.nombre, "cantidad": item.cantidad}
    inventario.append(nuevo)
    contador_id += 1
    return nuevo

# UPDATE (Editar existente)
@app.put("/api/inventario/{item_id}")
def editar_item(item_id: int, item: ItemInventario):
    for idx, obj in enumerate(inventario):
        if obj["id"] == item_id:
            inventario[idx]["nombre"] = item.nombre
            inventario[idx]["cantidad"] = item.cantidad
            return inventario[idx]
    raise HTTPException(status_code=404, detail="Item no encontrado")

# DELETE (Borrar)
@app.delete("/api/inventario/{item_id}")
def borrar_item(item_id: int):
    for idx, obj in enumerate(inventario):
        if obj["id"] == item_id:
            borrado = inventario.pop(idx)
            return borrado
    raise HTTPException(status_code=404, detail="Item no encontrado")