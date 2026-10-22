import { useState } from 'react'
import { useProductos } from '../context/ProductosContext.jsx'
import { formatoCLP } from '../context/CarritoContext.jsx'
import '../css/admin.css'

export default function AdminPanel({ onSalir }) {
  const { productos, actualizar, actualizarVarios, restablecer } = useProductos()
  const [busqueda, setBusqueda] = useState('')
  const [seleccion, setSeleccion] = useState([])
  const [porcentaje, setPorcentaje] = useState(10)

  const visibles = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )
  const todosMarcados = visibles.length > 0 && visibles.every((p) => seleccion.includes(p.id))
  const enPromo = productos.filter((p) => p.descuento > 0).length

  const alternar = (id) =>
    setSeleccion((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  const alternarTodos = () =>
    setSeleccion(
      todosMarcados
        ? seleccion.filter((id) => !visibles.some((p) => p.id === id))
        : [...new Set([...seleccion, ...visibles.map((p) => p.id)])]
    )

  // Los campos se guardan al salir del input (o con Enter); si el valor no es válido, vuelven al anterior
  const guardarPrecio = (p, input) => {
    const n = parseInt(input.value, 10)
    if (Number.isNaN(n) || n <= 0) {
      input.value = p.precioOriginal
      return
    }
    if (n !== p.precioOriginal) actualizar(p.id, { precio: n })
  }

  const guardarDescuento = (p, input) => {
    const n = parseInt(input.value, 10)
    if (Number.isNaN(n) || n < 0 || n > 90) {
      input.value = p.descuento
      return
    }
    if (n !== p.descuento) actualizar(p.id, { descuento: n })
  }

  const aplicarPromocion = () => {
    const n = parseInt(porcentaje, 10)
    if (Number.isNaN(n) || n < 1 || n > 90) {
      window.alert('Ingresa un descuento entre 1 y 90.')
      return
    }
    actualizarVarios(seleccion, { descuento: n })
  }

  const quitarPromocion = () => actualizarVarios(seleccion, { descuento: 0 })

  const volverOriginal = () => {
    if (window.confirm('¿Volver a los precios originales y quitar todas las promociones?')) {
      restablecer()
      setSeleccion([])
    }
  }

  const descargarExcel = async () => {
  // Se carga la librería solo al pulsar el botón, así no pesa en el resto del sitio
  const XLSX = await import('xlsx')

  const filas = productos.map((p) => ({
    ID: p.id,
    Producto: p.nombre,
    Categoría: p.categoria,
    'Precio base': p.precioOriginal,
    'Descuento (%)': p.descuento,
    'Precio final': p.precio
  }))

    const hoja = XLSX.utils.json_to_sheet(filas)
    hoja['!cols'] = [{ wch: 6 }, { wch: 38 }, { wch: 14 }, { wch: 12 }, { wch: 14 }, { wch: 12 }]

    const libro = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(libro, hoja, 'Productos')

    const fecha = new Date().toLocaleDateString('en-CA')
    XLSX.writeFile(libro, `productos-creamy-${fecha}.xlsx`)
    }


  const alPresionarEnter = (e) => {
    if (e.key === 'Enter') e.target.blur()
  }

  return (
    <section className="section active">
      <div className="admin-barra">
        <div>
          <h2 style={{ color: 'var(--purple-dark)' }}>Panel de administración</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            {productos.length} productos · {enPromo} en promoción
          </p>
        </div>
        <div className="admin-acciones">
            <button type="button" className="btn btn-small" onClick={descargarExcel}>
            Descargar Excel
            </button>
            <button type="button" className="btn btn-small btn-peligro" onClick={volverOriginal}>
                Restablecer todo
            </button>
            <button type="button" className="btn btn-small" onClick={onSalir}>
                Cerrar sesión admin
            </button>
        </div>
      </div>

      <div className="admin-promo">
        <strong>Promoción para los seleccionados ({seleccion.length}):</strong>
        <input
          type="number"
          min="1"
          max="90"
          className="input-admin corto"
          value={porcentaje}
          onChange={(e) => setPorcentaje(e.target.value)}
          aria-label="Porcentaje de descuento"
        />
        <span>% de descuento</span>
        <button type="button" className="btn btn-small" disabled={seleccion.length === 0} onClick={aplicarPromocion}>
          Aplicar promoción
        </button>
        <button type="button" className="btn btn-small" disabled={seleccion.length === 0} onClick={quitarPromocion}>
          Quitar promoción
        </button>
      </div>

      <input
        type="search"
        className="input-admin buscar mb-3"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div className="tabla-scroll">
        <table className="tabla-admin">
          <thead>
            <tr>
              <th>
                <input type="checkbox" checked={todosMarcados} onChange={alternarTodos} aria-label="Seleccionar todos" />
              </th>
              <th>Producto</th>
              <th>Precio base ($)</th>
              <th>Descuento (%)</th>
              <th>Precio final</th>
            </tr>
          </thead>
          <tbody>
            {visibles.map((p) => (
              <tr key={p.id} className={p.descuento > 0 ? 'en-promo' : ''}>
                <td>
                  <input type="checkbox" checked={seleccion.includes(p.id)} onChange={() => alternar(p.id)} />
                </td>
                <td>
                  {p.nombre}
                  <small>{p.categoria}</small>
                </td>
                <td>
                  <input
                    type="number"
                    min="1"
                    step="10"
                    className="input-admin"
                    key={`precio-${p.id}-${p.precioOriginal}`}
                    defaultValue={p.precioOriginal}
                    onBlur={(e) => guardarPrecio(p, e.target)}
                    onKeyDown={alPresionarEnter}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    max="90"
                    className="input-admin corto"
                    key={`desc-${p.id}-${p.descuento}`}
                    defaultValue={p.descuento}
                    onBlur={(e) => guardarDescuento(p, e.target)}
                    onKeyDown={alPresionarEnter}
                  />
                </td>
                <td>
                  {p.descuento > 0 && <span className="precio-tachado">{formatoCLP(p.precioOriginal)}</span>}
                  <strong>{formatoCLP(p.precio)}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}