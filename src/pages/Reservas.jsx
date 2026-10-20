import { useState } from 'react'
import productos from '../data/productos.js'
import { useMensaje } from '../context/MensajeContext.jsx'
import '../css/reservas.css'

const tortas = productos.filter((p) => p.categoria === 'Tortas')
const DIAS_MINIMOS = 3

// Fecha local en formato AAAA-MM-DD (la que entiende <input type="date">)
const aTexto = (f) => f.toLocaleDateString('en-CA')

function fechaMinima() {
  const f = new Date()
  f.setDate(f.getDate() + DIAS_MINIMOS)
  return aTexto(f)
}

// Convierte "Ingredientes: Harina, huevos y leche." en ['Harina', 'Huevos', 'Leche']
function listarIngredientes(detalle = '') {
  return detalle
    .replace(/^Ingredientes:\s*/i, '')
    .replace(/\.$/, '')
    .replace(/\s+y\s+/g, ', ')
    .split(',')
    .map((i) => i.trim())
    .filter(Boolean)
    .map((i) => i.charAt(0).toUpperCase() + i.slice(1))
}

const vacio = {
  nombre: '',
  contacto: '',
  tortaId: String(tortas[0]?.id ?? ''),
  quitar: [],
  otroQuitar: '',
  personas: 8,
  fecha: '',
  personalizado: false,
  diseno: ''
}

export default function Reservas() {
  const [form, setForm] = useState(vacio)
  const [errorFecha, setErrorFecha] = useState('')
  const { mostrarMensaje } = useMensaje()

  const minima = fechaMinima()
  const torta = tortas.find((t) => String(t.id) === form.tortaId)
  const ingredientes = listarIngredientes(torta?.detalle)

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // Al cambiar de torta se reinician los ingredientes marcados
  const cambiarTorta = (e) => setForm({ ...form, tortaId: e.target.value, quitar: [] })

  const alternarIngrediente = (ing) =>
    setForm((prev) => ({
      ...prev,
      quitar: prev.quitar.includes(ing) ? prev.quitar.filter((i) => i !== ing) : [...prev.quitar, ing]
    }))

  const enviar = (e) => {
    e.preventDefault()

    if (form.fecha < minima) {
      setErrorFecha(`Los encargos se hacen con al menos ${DIAS_MINIMOS} días de anticipación.`)
      return
    }
    setErrorFecha('')

    const fechaLarga = new Date(`${form.fecha}T00:00`).toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'long'
    })

    // Aquí podrías guardar el encargo (localStorage o un backend) usando "form"
    setForm(vacio)
    mostrarMensaje(
      `¡Encargo recibido! ${torta.nombre} para ${form.personas} personas, para el ${fechaLarga}. Te contactaremos para confirmar los detalles.`,
      'success'
    )
  }

  return (
    <section id="reserva" className="section active">
      <div className="section-header">
        <h2>Encarga tu torta</h2>
        <p>Elige una de nuestras tortas, cuéntanos cómo la quieres y la preparamos para ti</p>
      </div>

      <div className="split-container">
        <div className="card-box">
          <form onSubmit={enviar}>
            <div className="form-group">
              <label htmlFor="enc-nombre">Nombre completo</label>
              <input type="text" id="enc-nombre" name="nombre" placeholder="Ej. Camila Silva" required value={form.nombre} onChange={cambiar} />
            </div>

            <div className="form-group">
              <label htmlFor="enc-contacto">Teléfono o correo</label>
              <input type="text" id="enc-contacto" name="contacto" placeholder="Para confirmar tu encargo" required value={form.contacto} onChange={cambiar} />
            </div>

            <div className="form-group">
              <label htmlFor="enc-torta">¿Qué torta quieres encargar?</label>
              <select id="enc-torta" name="tortaId" value={form.tortaId} onChange={cambiarTorta}>
                {tortas.map((t) => (
                  <option key={t.id} value={t.id}>{t.nombre}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>¿Quieres sacar algún ingrediente?</label>
              <div className="ingredientes-grid">
                {ingredientes.map((ing) => (
                  <label className="check-linea" key={ing}>
                    <input type="checkbox" checked={form.quitar.includes(ing)} onChange={() => alternarIngrediente(ing)} />
                    {ing}
                  </label>
                ))}
              </div>
              <input type="text" name="otroQuitar" placeholder="Otro ingrediente que no quieras (opcional)" value={form.otroQuitar} onChange={cambiar} />
              <p className="campo-ayuda">Revisaremos contigo si se puede retirar sin afectar la receta.</p>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="enc-personas">Para cuántas personas</label>
                <input type="number" id="enc-personas" name="personas" min="4" max="40" required value={form.personas} onChange={cambiar} />
              </div>
              <div className="form-group">
                <label htmlFor="enc-fecha">¿Para qué día la necesitas?</label>
                <input type="date" id="enc-fecha" name="fecha" min={minima} required value={form.fecha} onChange={cambiar} />
                {errorFecha ? (
                  <p className="campo-error">{errorFecha}</p>
                ) : (
                  <p className="campo-ayuda">Mínimo {DIAS_MINIMOS} días de anticipación.</p>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="check-linea">
                <input
                  type="checkbox"
                  checked={form.personalizado}
                  onChange={(e) => setForm({ ...form, personalizado: e.target.checked })}
                />
                Quiero un diseño personalizado
              </label>
              {form.personalizado && (
                <textarea
                  name="diseno"
                  rows="3"
                  className="mt-2"
                  placeholder="Cuéntanos cómo la imaginas: colores, mensaje, tema, decoración..."
                  required
                  value={form.diseno}
                  onChange={cambiar}
                />
              )}
            </div>

            <button type="submit" className="btn btn-primary full-width">Confirmar encargo</button>
          </form>
        </div>

        <div className="side-image">
          {torta && <img src={torta.imagen} alt={torta.alt} />}
        </div>
      </div>
    </section>
  )
}