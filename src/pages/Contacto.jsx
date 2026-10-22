import { useState } from 'react'
import { useMensaje } from '../context/MensajeContext.jsx'
import { validarContacto } from '../utils/validaciones.js'
import '../css/contacto.css'

const vacio = { nombre: '', email: '', mensaje: '' }
const MAX_MENSAJE = 500

export default function Contacto() {
  const [form, setForm] = useState(vacio)
  const [errores, setErrores] = useState({})
  const { mostrarMensaje } = useMensaje()

  const cambiar = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    // al corregir un campo se le quita el error mientras escribe
    if (errores[name]) setErrores({ ...errores, [name]: undefined })
  }

  const enviar = (e) => {
    e.preventDefault()
    const err = validarContacto(form)
    setErrores(err)
    if (Object.keys(err).length > 0) return

    setForm(vacio)
    mostrarMensaje('¡Mensaje enviado! Te responderemos muy pronto.', 'success')
  }

  return (
    <section id="contacto" className="section active">
      <div className="section-header">
        <h2>Contacto</h2>
        <p>Estamos listos para endulzar tus dudas</p>
      </div>
      <div className="split-container">
        <div className="card-box">
          <form onSubmit={enviar} noValidate>
            <div className="form-group">
              <label htmlFor="con-nombre">Nombre</label>
              <input
                type="text"
                id="con-nombre"
                name="nombre"
                placeholder="Tu nombre"
                value={form.nombre}
                onChange={cambiar}
                className={errores.nombre ? 'input-error' : ''}
              />
              {errores.nombre && <p className="campo-error">{errores.nombre}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="con-email">Correo Electrónico</label>
              <input
                type="text"
                inputMode="email"
                id="con-email"
                name="email"
                placeholder="hola@ejemplo.com"
                value={form.email}
                onChange={cambiar}
                className={errores.email ? 'input-error' : ''}
              />
              {errores.email && <p className="campo-error">{errores.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="con-mensaje">Mensaje</label>
              <textarea
                id="con-mensaje"
                name="mensaje"
                rows="4"
                placeholder="¿En qué te podemos ayudar?"
                value={form.mensaje}
                onChange={cambiar}
                className={errores.mensaje ? 'input-error' : ''}
              />
              <div className="contacto-pie-campo">
                {errores.mensaje ? <p className="campo-error">{errores.mensaje}</p> : <span />}
                <span className="campo-ayuda">{form.mensaje.length}/{MAX_MENSAJE}</span>
              </div>
            </div>

            <button type="submit" className="btn btn-primary full-width">Enviar Mensaje</button>
          </form>
        </div>

        <div className="info-stack">
          <div className="info-card">
            <h4>📍 Dónde encontrarnos</h4>
            <p>Av. Dulzura 770, Providencia, Santiago</p>
          </div>
          <div className="info-card">
            <h4>⏰ Horario de Atención</h4>
            <p>Lunes a Sábado: 09:30 - 19:00 <br />Domingos: 10:00 - 15:00</p>
          </div>
          <div className="info-card">
            <h4>💌 Escríbenos directamente</h4>
            <p>contacto@creamy.com<br />+56 9 1234 5678</p>
          </div>
        </div>
      </div>
    </section>
  )
}