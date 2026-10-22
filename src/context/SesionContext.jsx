import { createContext, useContext, useState } from 'react'

// Reemplaza a sesion-activa.js (sessionStorage -> usuarioActivo)
const SesionContext = createContext(null)

const leerUsuario = () => {
  try {
    return JSON.parse(sessionStorage.getItem('usuarioActivo') || 'null')
  } catch {
    return null
  }
}

export function SesionProvider({ children }) {
  const [usuario, setUsuario] = useState(leerUsuario)

  const iniciarSesion = (u) => {
    sessionStorage.setItem('usuarioActivo', JSON.stringify(u))
    setUsuario(u)
  }

  const cerrarSesion = () => {
    sessionStorage.removeItem('usuarioActivo')
    setUsuario(null)
  }

  return (
    <SesionContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </SesionContext.Provider>
  )
}

export const useSesion = () => useContext(SesionContext)
