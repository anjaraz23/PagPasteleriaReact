import { useState } from 'react'
import { useMensaje } from '../context/MensajeContext.jsx'
import '../css/contacto.css'

const vacio = { nombre: '', email: '', mensaje: '' }

export default function Contacto() {
  const [form, setForm] = useState(vacio)
  const { mostrarMensaje } = useMensaje()

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const enviar = (e) => {
    e.preventDefault()
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
          <form onSubmit={enviar}>
            <div className="form-group">
              <label htmlFor="con-nombre">Nombre</label>
              <input type="text" id="con-nombre" name="nombre" required placeholder="Tu nombre" value={form.nombre} onChange={cambiar} />
            </div>
            <div className="form-group">
              <label htmlFor="con-email">Correo Electrónico</label>
              <input type="email" id="con-email" name="email" required placeholder="hola@ejemplo.com" value={form.email} onChange={cambiar} />
            </div>
            <div className="form-group">
              <label htmlFor="con-mensaje">Mensaje</label>
              <textarea id="con-mensaje" name="mensaje" rows="4" placeholder="¿En qué te podemos ayudar?" required value={form.mensaje} onChange={cambiar} />
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
