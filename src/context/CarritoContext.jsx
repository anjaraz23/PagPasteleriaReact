import { createContext, useContext, useEffect, useState } from 'react'

// Reemplaza a carrito.js (localStorage -> carritoCreamy)
const CLAVE = 'carritoCreamy'
const CarritoContext = createContext(null)

const leerCarrito = () => {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || []
  } catch {
    return []
  }
}

export const formatoCLP = (n) => '$' + n.toLocaleString('es-CL')

export function CarritoProvider({ children }) {
  const [items, setItems] = useState(leerCarrito)
  const [abierto, setAbierto] = useState(false)

  useEffect(() => {
    localStorage.setItem(CLAVE, JSON.stringify(items))
  }, [items])

  const agregar = (producto) =>
    setItems((prev) => {
      const existe = prev.find((i) => i.nombre === producto.nombre)
      if (existe) {
        return prev.map((i) => (i.nombre === producto.nombre ? { ...i, cantidad: i.cantidad + 1 } : i))
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })

  const cambiarCantidad = (nombre, delta) =>
    setItems((prev) =>
      prev
        .map((i) => (i.nombre === nombre ? { ...i, cantidad: i.cantidad + delta } : i))
        .filter((i) => i.cantidad > 0)
    )

  const quitar = (nombre) => setItems((prev) => prev.filter((i) => i.nombre !== nombre))
  const vaciar = () => setItems([])

  const totalItems = items.reduce((acc, i) => acc + i.cantidad, 0)
  const total = items.reduce((acc, i) => acc + i.precio * i.cantidad, 0)

  return (
    <CarritoContext.Provider
      value={{ items, totalItems, total, agregar, cambiarCantidad, quitar, vaciar, abierto, setAbierto }}
    >
      {children}
    </CarritoContext.Provider>
  )
}

export const useCarrito = () => useContext(CarritoContext)
