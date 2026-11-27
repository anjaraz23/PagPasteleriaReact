import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useSesion } from '../context/SesionContext.jsx'
import { formatoCLP } from '../context/CarritoContext.jsx'
import { compraService } from '../services/creamyServices.js'
import { describirEntrega, describirPago } from '../utils/pago.js'
import '../css/miscompras.css'

export default function MisCompras() {
  const { usuario } = useSesion()
  const [pedidos, setPedidos] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    if (!usuario) return
    const correo = (usuario.email || usuario.correo || '').toLowerCase()

    compraService
      .obtenerPedidos()
      .then((lista) => {
        const todos = Array.isArray(lista) ? lista : []
        // Filtra por el usuario activo en caso de que el endpoint devuelva todos
        const propios = todos.filter(
          (p) => !p.usuarioEmail || p.usuarioEmail.toLowerCase() === correo
        )
        setPedidos(propios)
      })
      .catch((err) => console.error('Error cargando compras:', err))
      .finally(() => setCargando(false))
  }, [usuario])

  if (!usuario) return <Navigate to="/login" replace />

  return (
    <section className="section active">
      <div className="section-header">
        <h2>Mis compras</h2>
        <p>El historial de tus pedidos en Creamy</p>
      </div>

      {cargando ? (
        <div className="compras-vacio"><p>Cargando tus compras...</p></div>
      ) : pedidos.length === 0 ? (
        <div className="compras-vacio">
          <p>Aún no has realizado compras.</p>
          <Link to="/productos" className="btn btn-primary">Ver productos</Link>
        </div>
      ) : (
        <div className="compras-lista">
          {pedidos.map((p) => (
            <article className="pedido-card" key={p.id}>
              <header className="pedido-cabecera">
                <strong>Pedido #{p.numero || p.id}</strong>
                <span>
                  {p.fecha
                    ? new Date(p.fecha).toLocaleString('es-CL', { dateStyle: 'long', timeStyle: 'short' })
                    : ''}
                </span>
              </header>

              {(p.items || []).map((i, idx) => (
                <div className="pedido-item" key={i.nombre || idx}>
                  <img src={i.imagen} alt={i.nombre} />
                  <div className="pedido-item-info">
                    <h4>{i.nombre}</h4>
                    <p>{i.cantidad} × {formatoCLP(i.precio)}</p>
                  </div>
                  <span className="pedido-subtotal">{formatoCLP(i.precio * i.cantidad)}</span>
                </div>
              ))}

              {p.entrega && (
                <p className="pedido-detalle">
                  {describirEntrega(p.entrega)}. {p.pago ? describirPago(p.pago) : ''}
                </p>
              )}

              <footer className="pedido-total">
                <span>Total</span>
                <strong>{formatoCLP(p.total)}</strong>
              </footer>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}