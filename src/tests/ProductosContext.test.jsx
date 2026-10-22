import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

// Mock del catálogo: las pruebas no dependen de los productos reales
vi.mock('../data/productos.js', () => ({
  default: [
    { id: 1, nombre: 'Torta', precio: 10000 },
    { id: 2, nombre: 'Brownie', precio: 2000 }
  ]
}))

import { ProductosProvider, useProductos } from '../context/ProductosContext.jsx'

const montar = () => renderHook(() => useProductos(), { wrapper: ProductosProvider })

describe('ProductosProvider', () => {
  it('sin cambios, el precio final es el precio base y no hay descuento', () => {
    const { result } = montar()
    expect(result.current.productos[0]).toMatchObject({ precioOriginal: 10000, descuento: 0, precio: 10000 })
  })

  it('aplica el descuento y redondea el precio final', () => {
    const { result } = montar()
    act(() => result.current.actualizar(1, { descuento: 15 }))
    expect(result.current.productos[0]).toMatchObject({ precioOriginal: 10000, descuento: 15, precio: 8500 })
  })

  it('permite cambiar el precio base de un producto', () => {
    const { result } = montar()
    act(() => result.current.actualizar(2, { precio: 3000 }))
    expect(result.current.productos[1].precio).toBe(3000)
  })

  it('actualizarVarios modifica varios productos a la vez', () => {
    const { result } = montar()
    act(() => result.current.actualizarVarios([1, 2], { descuento: 50 }))
    expect(result.current.productos.map((p) => p.precio)).toEqual([5000, 1000])
  })

  it('restablecer vuelve al catálogo base', () => {
    const { result } = montar()
    act(() => result.current.actualizar(1, { descuento: 50 }))
    act(() => result.current.restablecer())
    expect(result.current.productos[0].precio).toBe(10000)
  })
})
