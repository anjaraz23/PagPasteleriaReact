import { useState } from 'react'
import { useMensaje } from '../context/MensajeContext.jsx'

const imagenesPorTipo = {
  mesa: '/images/iu/sitio1.avif',
  evento: '/images/iu/reposterias.jpg'
}

const vacio = { nombre: '', tipo: 'mesa', fecha: '', personas: 2 }

export default function Reservas() {
  const [form, setForm] = useState(vacio)
  const { mostrarMensaje } = useMensaje()

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const enviar = (e) => {
    e.preventDefault()
    setForm(vacio)
    mostrarMensaje('¡Gracias! Tu reserva en Creamy ha sido procesada con éxito.', 'success')
  }

  return (
    <section id="reserva" className="section active">
      <div className="section-header">
        <h2>Reserva tu Experiencia</h2>
        <p>Asegura un lugar en nuestro salón o encarga tu pedido personalizado</p>
      </div>
      <div className="split-container">
        <div className="card-box">
          <form onSubmit={enviar}>
            <div className="form-group">
              <label htmlFor="res-nombre">Nombre completo</label>
              <input type="text" id="res-nombre" name="nombre" placeholder="Ej. Camila Silva" required value={form.nombre} onChange={cambiar} />
            </div>
            <div className="form-group">
              <label htmlFor="res-tipo">Tipo de Reserva</label>
              <select id="res-tipo" name="tipo" value={form.tipo} onChange={cambiar}>
                <option value="mesa">Mesa en Salón Creamy</option>
                <option value="evento">Pedido para Evento Especial</option>
              </select>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="res-fecha">Fecha y Hora</label>
                <input type="datetime-local" id="res-fecha" name="fecha" required value={form.fecha} onChange={cambiar} />
              </div>
              <div className="form-group">
                <label htmlFor="res-personas">Personas</label>
                <input type="number" id="res-personas" name="personas" min="1" max="12" required value={form.personas} onChange={cambiar} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary full-width">Confirmar Reserva</button>
          </form>
        </div>
        <div className="side-image">
          <img id="res-imagen" src={imagenesPorTipo[form.tipo]} alt="Salón de la pastelería" />
        </div>
      </div>
    </section>
  )
}
