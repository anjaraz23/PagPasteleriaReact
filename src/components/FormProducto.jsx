import { useState } from 'react'
import { validarProducto } from '../utils/validaciones.js'

const itemNuevo = {
  nombre: '',
  precio: '',
  categoria: '',
  descripcion: '',
  detalle: '',
  imagen: '',
  tag: ''
}

export default function FormProducto({ productos, onCrear }) {
  const [form, setForm] = useState(itemNuevo)
  const [errores, setErrores] = useState({})
  const [exito, setExito] = useState('')

  const categorias = [...new Set(productos.map((p) => p.categoria))]

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const enviar = (e) => {
    e.preventDefault()
    const err = validarProducto(form, productos)
    setErrores(err)
    if (Object.keys(err).length > 0) {
      setExito('')
      return
    }

    onCrear({
      nombre: form.nombre.trim(),
      precio: parseInt(form.precio, 10),
      categoria: form.categoria.trim(),
      descripcion: form.descripcion.trim(),
      detalle: form.detalle.trim() ? `Ingredientes: ${form.detalle.trim()}` : '',
      imagen: form.imagen.trim(),
      tag: form.tag.trim() || null
    })
    setExito(`"${form.nombre.trim()}" se agregó al catálogo.`)
    setForm(itemNuevo)
  }

  const campo = (name, label, props = {}) => (
    <div className="col-12 col-md-6">
      <div className="form-group">
        <label htmlFor={`np-${name}`}>{label}</label>
        <input
          id={`np-${name}`}
          name={name}
          value={form[name]}
          onChange={cambiar}
          className={errores[name] ? 'input-error' : ''}
          {...props}
        />
        {errores[name] && <p className="campo-error">{errores[name]}</p>}
      </div>
    </div>
  )

  return (
    <form className="card-box form-producto" onSubmit={enviar} noValidate aria-label="Nuevo producto">
      <h3 className="form-producto-titulo">Agregar producto nuevo</h3>

      <div className="row gx-3">
        {campo('nombre', 'Nombre')}
        {campo('precio', 'Precio', { type: 'number', min: 1 })}
        {campo('categoria', 'Categoría', { list: 'lista-categorias' })}
        {campo('tag', 'Etiqueta (opcional, ej: Favorito)')}
        {campo('imagen', 'Imagen (ruta o URL)', { placeholder: '/images/comida/mi_torta.jpg' })}
        {campo('detalle', 'Ingredientes')}

        <div className="col-12">
          <div className="form-group">
            <label htmlFor="np-descripcion">Descripción</label>
            <textarea
              id="np-descripcion"
              name="descripcion"
              rows="3"
              value={form.descripcion}
              onChange={cambiar}
              className={errores.descripcion ? 'input-error' : ''}
            />
            {errores.descripcion && <p className="campo-error">{errores.descripcion}</p>}
          </div>
        </div>
      </div>

      <datalist id="lista-categorias">
        {categorias.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>

      <div className="form-producto-acciones">
        <button type="submit" className="btn btn-primary">Agregar producto</button>
        {exito && <span className="form-producto-exito" role="status">{exito}</span>}
      </div>
    </form>
  )
}