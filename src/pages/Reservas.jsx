import { useEffect, useRef, useState } from 'react'
import { useProductos } from '../context/ProductosContext.jsx'
import { useMensaje } from '../context/MensajeContext.jsx'
import { compraService } from '../services/creamyServices.js'
import { SABOR_BASE, IMAGEN_PISOS, configDe, rangoPersonas, aplicarSabor } from '../data/personalizacion.js'
import { comprimirImagen } from '../utils/encargos.js'
import '../css/reservas.css'

const DIAS_MINIMOS = 3
const MAX_FOTO_MB = 5
const aTexto = (f) => f.toLocaleDateString('en-CA')

function fechaMinima() {
  const f = new Date()
  f.setDate(f.getDate() + DIAS_MINIMOS)
  return aTexto(f)
}

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

const plural = (n, uno, varios) => `${n} ${n === 1 ? uno : varios}`

const crearVacio = (tortaIdInicial = '') => ({
  nombre: '',
  contacto: '',
  tortaId: tortaIdInicial,
  pisos: 1,
  sabor: SABOR_BASE,
  personas: 8,
  quitar: [],
  otroQuitar: '',
  fecha: '',
  personalizado: false,
  diseno: '',
  foto: ''
})

export default function Reservas() {
  const { productos } = useProductos()
  const tortas = productos.filter((p) => p.categoria === 'Tortas')

  const [form, setForm] = useState(() => crearVacio())
  const [errorFecha, setErrorFecha] = useState('')
  const [errorFoto, setErrorFoto] = useState('')
  const [enviando, setEnviando] = useState(false)
  const inputFoto = useRef(null)
  const { mostrarMensaje } = useMensaje()

  useEffect(() => {
    if (!form.tortaId && tortas.length > 0) {
      setForm((prev) => ({ ...prev, tortaId: String(tortas[0].id) }))
    }
  }, [tortas, form.tortaId])

  const minima = fechaMinima()
  const torta = tortas.find((t) => String(t.id) === form.tortaId) || tortas[0]
  const config = configDe(torta?.id)
  const saborElegido = config.sabores.find((s) => s.nombre === form.sabor)
  const ingredientes = aplicarSabor(listarIngredientes(torta?.detalle), saborElegido)
  const opcionesSabor = [SABOR_BASE, ...config.sabores.map((s) => s.nombre)]
  const pisosPosibles = Array.from({ length: config.maxPisos }, (_, i) => i + 1)
  const rango = rangoPersonas(form.pisos)

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // Al cambiar de torta se reinician las opciones que dependen de su receta
  const cambiarTorta = (e) =>
    setForm((prev) => {
      const r = rangoPersonas(1)
      return {
        ...prev,
        tortaId: e.target.value,
        pisos: 1,
        personas: Math.min(Math.max(prev.personas, r.min), r.max),
        sabor: SABOR_BASE,
        quitar: []
      }
    })

  // Al cambiar los pisos, las personas se ajustan al rango que admite ese tamaño
  const cambiarPisos = (e) => {
    const pisos = Number(e.target.value)
    const r = rangoPersonas(pisos)
    setForm((prev) => ({ ...prev, pisos, personas: Math.min(Math.max(prev.personas, r.min), r.max) }))
  }

  // Al cambiar el sabor cambian los ingredientes, así que se limpian los que estaban marcados para quitar
  const cambiarSabor = (e) =>
    setForm((prev) => ({ ...prev, sabor: e.target.value, quitar: [] }))

  const alternarIngrediente = (ing) =>
    setForm((prev) => ({
      ...prev,
      quitar: prev.quitar.includes(ing) ? prev.quitar.filter((i) => i !== ing) : [...prev.quitar, ing]
    }))

  const alternarPersonalizado = (e) => {
    const activo = e.target.checked
    setErrorFoto('')
    setForm((prev) => (activo ? { ...prev, personalizado: true } : { ...prev, personalizado: false, diseno: '', foto: '' }))
  }

  const elegirFoto = async (e) => {
    const archivo = e.target.files?.[0]
    if (!archivo) return

    if (!archivo.type.startsWith('image/')) {
      setErrorFoto('El archivo debe ser una imagen.')
      e.target.value = ''
      return
    }
    if (archivo.size > MAX_FOTO_MB * 1024 * 1024) {
      setErrorFoto(`La imagen no puede superar los ${MAX_FOTO_MB} MB.`)
      e.target.value = ''
      return
    }

    try {
      const foto = await comprimirImagen(archivo)
      setErrorFoto('')
      setForm((prev) => ({ ...prev, foto }))
    } catch {
      setErrorFoto('No pudimos leer la imagen. Prueba con otra.')
      e.target.value = ''
    }
  }

  const quitarFoto = () => {
    setForm((prev) => ({ ...prev, foto: '' }))
    if (inputFoto.current) inputFoto.current.value = ''
  }

  const enviar = async (e) => {
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

    const detalleDiseno = [
      `${plural(form.pisos, 'piso', 'pisos')}`,
      `Sabor: ${form.sabor}`,
      form.personalizado && form.diseno.trim() ? `Diseño: ${form.diseno.trim()}` : ''
    ].filter(Boolean).join(' | ')

    const payload = {
      nombreCliente: form.nombre.trim(),
      contacto: form.contacto.trim(),
      tortaId: Number(torta?.id),
      tortaNombre: torta?.nombre,
      pisos: form.pisos,
      sabor: form.sabor,
      ingredientesQuitar: [...form.quitar, ...(form.otroQuitar.trim() ? [form.otroQuitar.trim()] : [])],
      personas: Number(form.personas),
      fechaEntrega: form.fecha,
      personalizado: form.personalizado,
      diseno: detalleDiseno,
      foto: form.personalizado ? form.foto : ''
    }

    try {
      setEnviando(true)
      await compraService.crearEncargo(payload)
      setForm(crearVacio(String(tortas[0]?.id ?? '')))
      if (inputFoto.current) inputFoto.current.value = ''
      mostrarMensaje(
        `¡Encargo recibido! ${torta?.nombre} de ${plural(form.pisos, 'piso', 'pisos')} (${form.sabor}) para ${form.personas} personas, para el ${fechaLarga}. Te contactaremos para confirmar los detalles.`,
        'success'
      )
    } catch (err) {
      mostrarMensaje(err.message || 'Debes iniciar sesión para realizar un encargo.', 'danger')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section id="reserva" className="section active">
      <div className="section-header">
        <h2>Encarga tu torta</h2>
        <p>Elige una de nuestras tortas, personalízala y la preparamos para ti</p>
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

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="enc-pisos">Pisos</label>
                <select id="enc-pisos" value={form.pisos} onChange={cambiarPisos}>
                  {pisosPosibles.map((n) => (
                    <option key={n} value={n}>{plural(n, 'piso', 'pisos')}</option>
                  ))}
                </select>
                <p className="campo-ayuda">
                  {config.maxPisos === 1
                    ? 'Esta torta se prepara en un solo piso.'
                    : `Esta torta se puede preparar hasta en ${config.maxPisos} pisos.`}
                </p>
              </div>
              {IMAGEN_PISOS[form.pisos] && (
                <figure className="pisos-ref">
                  <img
                    key={form.pisos}
                    src={IMAGEN_PISOS[form.pisos]}
                    alt={`Referencia de una torta de ${plural(form.pisos, 'piso', 'pisos')}`}
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                  <figcaption>Referencia: {plural(form.pisos, 'piso', 'pisos')}</figcaption>
                </figure>
              )}

              <div className="form-group">
                <label htmlFor="enc-personas">Para cuántas personas</label>
                <input type="number" id="enc-personas" name="personas" min={rango.min} max={rango.max} required value={form.personas} onChange={cambiar} />
                <p className="campo-ayuda">
                  Con {plural(form.pisos, 'piso', 'pisos')}: de {rango.min} a {rango.max} personas.
                </p>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="enc-sabor">Sabor</label>
              <select id="enc-sabor" name="sabor" value={form.sabor} onChange={cambiarSabor}>
                {opcionesSabor.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <p className="campo-ayuda">
                {config.sabores.length === 0
                  ? 'Esta torta se prepara solo con su receta original.'
                  : 'El sabor cambia el relleno o la cobertura; el bizcocho de la receta base se mantiene.'}
              </p>
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

            <div className="form-group">
              <label htmlFor="enc-fecha">¿Para qué día la necesitas?</label>
              <input type="date" id="enc-fecha" name="fecha" min={minima} required value={form.fecha} onChange={cambiar} />
              {errorFecha ? (
                <p className="campo-error">{errorFecha}</p>
              ) : (
                <p className="campo-ayuda">Mínimo {DIAS_MINIMOS} días de anticipación.</p>
              )}
            </div>

            <div className="form-group">
              <label className="check-linea">
                <input type="checkbox" checked={form.personalizado} onChange={alternarPersonalizado} />
                Quiero un diseño personalizado
              </label>

              {form.personalizado && (
                <>
                  <textarea
                    name="diseno"
                    rows="3"
                    className="mt-2"
                    placeholder="Cuéntanos cómo la imaginas: colores, mensaje, tema, decoración..."
                    required
                    value={form.diseno}
                    onChange={cambiar}
                  />

                  <div className="foto-ref">
                    <label htmlFor="enc-foto">Foto de referencia (opcional)</label>
                    <input type="file" id="enc-foto" accept="image/*" ref={inputFoto} onChange={elegirFoto} />
                    {errorFoto && <p className="campo-error">{errorFoto}</p>}
                    {form.foto && (
                      <div className="foto-previa">
                        <img src={form.foto} alt="Referencia del diseño" />
                        <button type="button" className="btn btn-small" onClick={quitarFoto}>
                          Quitar foto
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <button type="submit" className="btn btn-primary full-width" disabled={enviando}>
              {enviando ? 'Enviando encargo...' : 'Confirmar encargo'}
            </button>
          </form>
        </div>

        <div className="side-image">
          {torta && <img src={torta.imagen} alt={torta.alt} />}
        </div>
      </div>
    </section>
  )
}