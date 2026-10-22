import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { SesionProvider, useSesion } from '../context/SesionContext.jsx'

const montar = () => renderHook(() => useSesion(), { wrapper: SesionProvider })

describe('SesionProvider', () => {
  it('parte sin usuario', () => {
    expect(montar().result.current.usuario).toBeNull()
  })

  it('iniciarSesion guarda el usuario en estado y en sessionStorage', () => {
    const { result } = montar()
    const u = { nombre: 'Ana', correo: 'ana@gmail.com' }
    act(() => result.current.iniciarSesion(u))
    expect(result.current.usuario).toEqual(u)
    expect(JSON.parse(sessionStorage.getItem('usuarioActivo'))).toEqual(u)
  })

  it('cerrarSesion limpia estado y sessionStorage', () => {
    const { result } = montar()
    act(() => result.current.iniciarSesion({ nombre: 'Ana' }))
    act(() => result.current.cerrarSesion())
    expect(result.current.usuario).toBeNull()
    expect(sessionStorage.getItem('usuarioActivo')).toBeNull()
  })

  it('recupera la sesión guardada al iniciar', () => {
    sessionStorage.setItem('usuarioActivo', JSON.stringify({ nombre: 'Luis' }))
    expect(montar().result.current.usuario).toEqual({ nombre: 'Luis' })
  })
})
