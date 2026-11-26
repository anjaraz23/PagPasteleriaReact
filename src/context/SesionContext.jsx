import React, { createContext, useContext, useState } from 'react'

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

  // Acepta tanto token, usuario. Como token, nombre, email, rol 
  const iniciarSesion = (respuestaAuth) => {
    if (respuestaAuth?.token) {
      sessionStorage.setItem('creamy_token', respuestaAuth.token)
    }
    const datosUsuario = respuestaAuth?.usuario || respuestaAuth
    sessionStorage.setItem('usuarioActivo', JSON.stringify(datosUsuario))
    setUsuario(datosUsuario)
  }

  const cerrarSesion = () => {
    sessionStorage.removeItem('creamy_token')
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