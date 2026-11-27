import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { productoService } from '../services/creamyServices'

const ProductosContext = createContext(null)

const precioFinal = (precio, descuento) => Math.round(precio * (1 - (descuento || 0) / 100))

export function ProductosProvider({ children }) {
  const [listaBase, setListaBase] = useState([])
  const [cargando, setCargando] = useState(true)

  const cargarProductos = useCallback(async () => {
    try {
      setCargando(true)
      const data = await productoService.obtenerTodos()
      setListaBase(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error cargando productos desde el Gateway:', error)
    } finally {
      setCargando(false)
    }
  }, [])

  useEffect(() => {
    cargarProductos()
  }, [cargarProductos])

  const productos = useMemo(
    () =>
      listaBase.map((p) => {
        const precioOriginal = p.precioOriginal ?? p.precio
        const descuento = p.descuento ?? 0
        return {
          ...p,
          precioOriginal,
          descuento,
          precio: precioFinal(precioOriginal, descuento),
        }
      }),
    [listaBase]
  )

  const actualizar = async (id, campos) => {
    await productoService.actualizar(id, campos)
    await cargarProductos()
  }

  const actualizarVarios = async (ids, campos) => {
    await Promise.all(ids.map((id) => productoService.actualizar(id, campos)))
    await cargarProductos()
  }

  const agregarProducto = async (datos) => {
    const nuevo = {
      tag: null,
      ...datos,
      alt: datos.alt || datos.nombre,
    }
    await productoService.crear(nuevo)
    await cargarProductos()
  }

  const eliminarProducto = async (id) => {
    await productoService.eliminar(id)
    await cargarProductos()
  }

  const restablecer = async () => {
    await cargarProductos()
  }

  return (
    <ProductosContext.Provider
      value={{
        productos,
        cargando,
        cargarProductos,
        actualizar,
        actualizarVarios,
        restablecer,
        agregarProducto,
        eliminarProducto,
      }}
    >
      {children}
    </ProductosContext.Provider>
  )
}

export const useProductos = () => useContext(ProductosContext)