import React from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import base from '../data/productos.js'

const CLAVE = 'productosAdmin'
const CLAVE_NUEVOS = 'productosNuevosAdmin'
const ProductosContext = createContext(null)

const leer = () => {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || {}
  } catch {
    return {}
  }
}

const leerNuevos = () => {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_NUEVOS)) || []
  } catch {
    return []
  }
}

const precioFinal = (precio, descuento) => Math.round(precio * (1 - descuento / 100))

export function ProductosProvider({ children }) {
  // cambios precio o descuentos (bueno similar era eso)
  const [cambios, setCambios] = useState(leer)
  // nuevos uhh
  const [nuevos, setNuevos] = useState(leerNuevos)

  useEffect(() => {
    localStorage.setItem(CLAVE, JSON.stringify(cambios))
  }, [cambios])

  useEffect(() => {
    localStorage.setItem(CLAVE_NUEVOS, JSON.stringify(nuevos))
  }, [nuevos])

  // Catálogo base + productos nuevos + ajustes del admin.
  // precioOriginal = precio sin descuento, precio = precio final que paga el cliente
  const productos = useMemo(
    () =>
      [...base, ...nuevos].map((p) => {
        const c = cambios[p.id] || {}
        const precioOriginal = c.precio ?? p.precio
        const descuento = c.descuento ?? 0
        return { ...p, precioOriginal, descuento, precio: precioFinal(precioOriginal, descuento) }
      }),
    [cambios, nuevos]
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

  const agregarProducto = (datos) =>
    setNuevos((prev) => {
      const id = Math.max(0, ...base.map((p) => p.id), ...prev.map((p) => p.id)) + 1
      return [
        ...prev,
        { tag: null, ...datos, id, alt: datos.alt || datos.nombre, personalizado: true }
      ]
    })

  const eliminarProducto = (id) => {
    setNuevos((prev) => prev.filter((p) => p.id !== id))
    setCambios((prev) => {
      const siguiente = { ...prev }
      delete siguiente[id]
      return siguiente
    })
  }

  const restablecer = () => setCambios({})

  return (
    <ProductosContext.Provider
      value={{ productos, actualizar, actualizarVarios, restablecer, agregarProducto, eliminarProducto }}
    >
      {children}
    </ProductosContext.Provider>
  )
}

export const useProductos = () => useContext(ProductosContext)