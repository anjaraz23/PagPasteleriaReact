import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import base from '../data/productos.js'

const CLAVE = 'productosAdmin'
const ProductosContext = createContext(null)

const leer = () => {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || {}
  } catch {
    return {}
  }
}

const precioFinal = (precio, descuento) => Math.round(precio * (1 - descuento / 100))

export function ProductosProvider({ children }) {
  // cambios = { [id]: { precio?, descuento? } }
  const [cambios, setCambios] = useState(leer)

  useEffect(() => {
    localStorage.setItem(CLAVE, JSON.stringify(cambios))
  }, [cambios])

  // Catálogo base + ajustes del admin.
  // precioOriginal = precio sin descuento, precio = precio final que paga el cliente
  const productos = useMemo(
    () =>
      base.map((p) => {
        const c = cambios[p.id] || {}
        const precioOriginal = c.precio ?? p.precio
        const descuento = c.descuento ?? 0
        return { ...p, precioOriginal, descuento, precio: precioFinal(precioOriginal, descuento) }
      }),
    [cambios]
  )

  const actualizar = (id, campos) =>
    setCambios((prev) => ({ ...prev, [id]: { ...prev[id], ...campos } }))

  const actualizarVarios = (ids, campos) =>
    setCambios((prev) => {
      const siguiente = { ...prev }
      ids.forEach((id) => {
        siguiente[id] = { ...siguiente[id], ...campos }
      })
      return siguiente
    })

  const restablecer = () => setCambios({})

  return (
    <ProductosContext.Provider value={{ productos, actualizar, actualizarVarios, restablecer }}>
      {children}
    </ProductosContext.Provider>
  )
}

export const useProductos = () => useContext(ProductosContext)