import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSesion } from '../context/SesionContext.jsx'
import { useMensaje } from '../context/MensajeContext.jsx'
import '../css/login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errores, setErrores] = useState({})
  const [alerta, setAlerta] = useState('')
  const { iniciarSesion } = useSesion()
  const { mostrarMensaje } = useMensaje()
  const navigate = useNavigate()

  const enviar = (e) => {
    e.preventDefault()
    const correo = email.trim().toLowerCase()
    const nuevos = {}
    if (correo === '') nuevos.email = 'El correo es obligatorio.'
    if (password === '') nuevos.password = 'La contraseña es obligatoria.'
    setErrores(nuevos)

    if (Object.keys(nuevos).length > 0) {
      setAlerta('Completa todos los campos para continuar.')
      return
    }

    const usuarios = JSON.parse(localStorage.getItem('usuariosCreamy')) || []
    const encontrado = usuarios.find((u) => u.correo.toLowerCase() === correo && u.password === password)

    if (!encontrado) {
      setAlerta('Correo o contraseña incorrectos.')
      return
    }

    setAlerta('')
    iniciarSesion(encontrado)
    mostrarMensaje(
      `¡Sesión iniciada correctamente! Bienvenido a Creamy, ${encontrado.nombre}.`,
      'success',
      '',
      () => navigate('/')
    )
  }

  return (
    <section id="login" className="section active">
      <div className="login-container">
        <div className="card-box">
          <div className="section-header" style={{ marginBottom: '1.5rem' }}>
            <h2>Bienvenido a Creamy</h2>
            <p>Ingresa a tu cuenta para ver tus pedidos</p>
          </div>
          <form onSubmit={enviar} noValidate>
            <div className="form-group">
              <label htmlFor="log-email">Correo Electrónico</label>
              <input type="email" id="log-email" placeholder="tu@correo.com" className={errores.email ? 'is-invalid' : ''} value={email} onChange={(e) => setEmail(e.target.value)} />
              {errores.email && <div className="invalid-feedback d-block">{errores.email}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="log-pass">Contraseña</label>
              <input type="password" id="log-pass" placeholder="••••••••" className={errores.password ? 'is-invalid' : ''} value={password} onChange={(e) => setPassword(e.target.value)} />
              {errores.password && <div className="invalid-feedback d-block">{errores.password}</div>}
            </div>
            <div className="mb-3">
              {alerta && <div className="alert alert-danger" role="alert">{alerta}</div>}
            </div>
            <button type="submit" className="btn btn-primary full-width">Iniciar Sesión</button>
          </form>
          <p></p>
          <span>¿No tienes una cuenta? </span>
          <Link to="/registro" className="nav-link d-inline">Regístrate aquí</Link>
        </div>
      </div>
    </section>
  )
}
