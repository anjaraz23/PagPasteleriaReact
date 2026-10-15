import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import regiones from '../data/regiones.js'
import { validarRun, validarCorreo, validarPassword } from '../utils/validaciones.js'
import { useMensaje } from '../context/MensajeContext.jsx'
import '../css/registro.css'

const vacio = {
  run: '', nombre: '', apellidos: '', correo: '', password: '', password2: '',
  fechaNacimiento: '', region: '', comuna: '', direccion: ''
}

function validar(v) {
  const e = {}
  const run = v.run.trim()
  if (run === '') e.run = 'El RUN es obligatorio.'
  else if (!validarRun(run)) e.run = 'El RUN ingresado no es válido (sin puntos ni guion, ej: 19011022K).'

  const nombre = v.nombre.trim()
  if (nombre === '') e.nombre = 'El nombre es obligatorio.'
  else if (nombre.length > 50) e.nombre = 'El nombre no puede superar los 50 caracteres.'

  const apellidos = v.apellidos.trim()
  if (apellidos === '') e.apellidos = 'Los apellidos son obligatorios.'
  else if (apellidos.length > 100) e.apellidos = 'Los apellidos no pueden superar los 100 caracteres.'

  const correo = v.correo.trim()
  if (correo === '') e.correo = 'El correo es obligatorio.'
  else if (!validarCorreo(correo)) e.correo = 'Ingresa un correo válido.'

  if (v.password === '') e.password = 'La contraseña es obligatoria.'
  else if (!validarPassword(v.password)) e.password = 'La contraseña debe tener entre 4 y 10 caracteres alfanuméricos (se permiten caracteres especiales).'

  if (v.password2 === '') e.password2 = 'Debes confirmar la contraseña.'
  else if (v.password2 !== v.password) e.password2 = 'Las contraseñas no coinciden.'

  if (v.fechaNacimiento !== '' && new Date(v.fechaNacimiento) > new Date()) {
    e.fechaNacimiento = 'La fecha de nacimiento no puede ser futura.'
  }

  if (v.region === '') e.region = 'Debes seleccionar una región.'
  if (v.comuna === '') e.comuna = 'Debes seleccionar una comuna.'

  const direccion = v.direccion.trim()
  if (direccion === '') e.direccion = 'La dirección es obligatoria.'
  else if (direccion.length > 300) e.direccion = 'La dirección no puede superar los 300 caracteres.'

  return e
}

function Campo({ id, label, hint, error, valido, as: Tag = 'input', children, ...props }) {
  const base = Tag === 'select' ? 'form-select' : 'form-control'
  const estado = error ? 'is-invalid' : valido ? 'is-valid' : ''
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">{label}</label>
      <Tag id={id} name={id} className={`${base} ${estado}`} {...props}>{children}</Tag>
      {hint && <div className="form-text">{hint}</div>}
      <div className={`invalid-feedback ${error ? 'mostrar' : ''}`}>{error}</div>
    </div>
  )
}

export default function Registro() {
  const [v, setV] = useState(vacio)
  const [intentado, setIntentado] = useState(false)
  const { mostrarMensaje } = useMensaje()
  const navigate = useNavigate()

  const errores = intentado ? validar(v) : {}
  const ok = (campo) => intentado && !errores[campo]
  const comunas = v.region !== '' ? regiones[v.region].comunas : []

  const cambiar = (e) => {
    const { name, value } = e.target
    // al cambiar la región se reinicia la comuna
    setV((prev) => (name === 'region' ? { ...prev, region: value, comuna: '' } : { ...prev, [name]: value }))
  }

  const enviar = (e) => {
    e.preventDefault()
    setIntentado(true)
    if (Object.keys(validar(v)).length > 0) return

    // Sin backend: los usuarios se guardan en localStorage, como antes
    const nuevoUsuario = {
      run: v.run.trim(),
      nombre: v.nombre.trim(),
      apellidos: v.apellidos.trim(),
      correo: v.correo.trim(),
      password: v.password,
      fechaNacimiento: v.fechaNacimiento,
      region: regiones[v.region].nombre,
      comuna: v.comuna,
      direccion: v.direccion.trim()
    }
    const usuarios = JSON.parse(localStorage.getItem('usuariosCreamy')) || []
    usuarios.push(nuevoUsuario)
    localStorage.setItem('usuariosCreamy', JSON.stringify(usuarios))

    setV(vacio)
    setIntentado(false)
    mostrarMensaje(
      '¡Registro exitoso! Ya puedes iniciar sesión con tu correo y contraseña.',
      'success',
      '',
      () => navigate('/login')
    )
  }

  const err = (k) => ({ error: errores[k], valido: ok(k) })

  return (
    <section id="register" className="section active">
      <div className="registro-container">
        <div className="card-box">
          <div className="section-header" style={{ marginBottom: '1.5rem' }}>
            <h2>Bienvenido a Creamy</h2>
            <p>Registra tu cuenta para ver tus pedidos</p>
          </div>

          <form onSubmit={enviar} noValidate>
            <Campo id="run" label="RUN" placeholder="Ej: 224459971" maxLength={9} hint="Sin puntos ni guion." value={v.run} onChange={cambiar} {...err('run')} />
            <Campo id="nombre" label="Nombre" maxLength={50} value={v.nombre} onChange={cambiar} {...err('nombre')} />
            <Campo id="apellidos" label="Apellidos" maxLength={100} value={v.apellidos} onChange={cambiar} {...err('apellidos')} />
            <Campo id="correo" label="Correo electrónico" type="email" maxLength={100} placeholder="nombre@duoc.cl" hint="Solo correos @duocuc.cl, @profesor.duocuc.cl o @gmail.com" value={v.correo} onChange={cambiar} {...err('correo')} />
            <Campo id="password" label="Contraseña" type="password" maxLength={10} hint="Entre 4 y 10 caracteres, alfanumérica con caracteres especiales" value={v.password} onChange={cambiar} {...err('password')} />
            <Campo id="password2" label="Confirmar contraseña" type="password" maxLength={10} value={v.password2} onChange={cambiar} {...err('password2')} />
            <Campo id="fechaNacimiento" label="Fecha de nacimiento" type="date" hint="Opcional" value={v.fechaNacimiento} onChange={cambiar} error={errores.fechaNacimiento} />

            <Campo id="region" label="Región" as="select" value={v.region} onChange={cambiar} {...err('region')}>
              <option value="" disabled>Seleccione una región</option>
              {regiones.map((r, i) => (
                <option key={r.nombre} value={i}>{r.nombre}</option>
              ))}
            </Campo>

            <Campo id="comuna" label="Comuna" as="select" value={v.comuna} onChange={cambiar} disabled={v.region === ''} {...err('comuna')}>
              <option value="" disabled>
                {v.region === '' ? 'Seleccione primero una región' : 'Seleccione una comuna'}
              </option>
              {comunas.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Campo>

            <Campo id="direccion" label="Dirección" as="textarea" rows={2} maxLength={300} value={v.direccion} onChange={cambiar} {...err('direccion')} />

            <div className="mb-3">
              {intentado && Object.keys(errores).length > 0 && (
                <div className="alert alert-danger" role="alert">
                  Revisa los campos marcados en rojo antes de continuar.
                </div>
              )}
            </div>

            <div className="registro-botones">
              <button type="submit" className="btn-registro btn btn-primary full-width">Crear mi cuenta</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
