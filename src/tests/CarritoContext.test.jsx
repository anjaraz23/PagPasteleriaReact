import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { CarritoProvider, useCarrito, formatoCLP } from '../context/CarritoContext.jsx'

const brownie = { nombre: 'Brownie', precio: 2490 }
const torta = { nombre: 'Torta', precio: 3990 }

const montar = () => renderHook(() => useCarrito(), { wrapper: CarritoProvider })

describe('formatoCLP', () => {
  it('antepone $ y usa separador de miles chileno', () => {
    expect(formatoCLP(3490)).toBe('$3.490')
  })
})

describe('CarritoProvider', () => {
  it('parte vacío', () => {
    const { result } = montar()
    expect(result.current.items).toEqual([])
    expect(result.current.total).toBe(0)
    expect(result.current.totalItems).toBe(0)
  })

  it('agrega un producto nuevo con cantidad 1', () => {
    const { result } = montar()
    act(() => result.current.agregar(brownie))
    expect(result.current.items).toEqual([{ ...brownie, cantidad: 1 }])
  })

  it('incrementa la cantidad si el producto ya existe', () => {
    const { result } = montar()
    act(() => result.current.agregar(brownie))
    act(() => result.current.agregar(brownie))
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].cantidad).toBe(2)
  })

  it('calcula total y totalItems', () => {
    const { result } = montar()
    act(() => {
      result.current.agregar(brownie)
      result.current.agregar(brownie)
      result.current.agregar(torta)
    })
    expect(result.current.totalItems).toBe(3)
    expect(result.current.total).toBe(2490 * 2 + 3990)
  })

  it('cambiarCantidad elimina el producto cuando llega a 0', () => {
    const { result } = montar()
    act(() => result.current.agregar(brownie))
    act(() => result.current.cambiarCantidad('Brownie', -1))
    expect(result.current.items).toEqual([])
  })

  it('quitar y vaciar eliminan productos', () => {
    const { result } = montar()
    act(() => {
      result.current.agregar(brownie)
      result.current.agregar(torta)
    })
    act(() => result.current.quitar('Brownie'))
    expect(result.current.items.map((i) => i.nombre)).toEqual(['Torta'])
    act(() => result.current.vaciar())
    expect(result.current.items).toEqual([])
  })

  it('persiste el carrito en localStorage', () => {
    const { result } = montar()
    act(() => result.current.agregar(brownie))
    expect(JSON.parse(localStorage.getItem('carritoCreamy'))).toEqual([{ ...brownie, cantidad: 1 }])
  })

  it('recupera el carrito guardado al iniciar', () => {
    localStorage.setItem('carritoCreamy', JSON.stringify([{ ...torta, cantidad: 4 }]))
    const { result } = montar()
    expect(result.current.totalItems).toBe(4)
  })
})
