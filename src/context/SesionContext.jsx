import React, { createContext, useContext, useState } from 'react'

const SesionContext = createContext(null)

const leerUsuario = () => {
  try {
    return JSON.parse(sessionStorage.getItem('usuarioActivo') || 'null')
  } catch {
    return null
  }
}

// Extrae el payload del JWT por si el backend solo manda { token } sin objeto usuario
const decodificarToken = (token) => {
  try {
    const payload = token.split('.')[1]
    return JSON.parse(atob(payload))
  } catch {
    return {}
  }
}

export function SesionProvider({ children }) {
  const [usuario, setUsuario] = useState(leerUsuario)

  const iniciarSesion = (respuestaAuth) => {
    let claims = {}
    if (respuestaAuth?.token) {
      sessionStorage.setItem('creamy_token', respuestaAuth.token)
      claims = decodificarToken(respuestaAuth.token)
    }

    const base = respuestaAuth?.usuario || respuestaAuth || {}
    const rolNormalizado = base.role || base.rol || claims.role || claims.rol || 'cliente'

    const datosUsuario = {
      ...base,
      email: base.email || base.correo || claims.sub || '',
      correo: base.correo || base.email || claims.sub || '',
      rol: rolNormalizado,
      role: rolNormalizado,
    }

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