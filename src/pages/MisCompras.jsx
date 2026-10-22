import { Link, Navigate } from 'react-router-dom'
import { useSesion } from '../context/SesionContext.jsx'
import { formatoCLP } from '../context/CarritoContext.jsx'
import { pedidosDe } from '../utils/pedidos.js'
import '../css/miscompras.css'

export default function MisCompras() {
  const { usuario } = useSesion()

  if (!usuario) return <Navigate to="/login" replace />

  const pedidos = pedidosDe(usuario.correo)

  return (
    <section className="section active">
      <div className="section-header">
        <h2>Mis compras</h2>
        <p>El historial de tus pedidos en Creamy</p>
      </div>

      {pedidos.length === 0 ? (
        <div className="compras-vacio">
          <p>Aún no has realizado compras.</p>
          <Link to="/productos" className="btn btn-primary">Ver productos</Link>
        </div>
      ) : (
        <div className="compras-lista">
          {pedidos.map((p) => (
            <article className="pedido-card" key={p.id}>
              <header className="pedido-cabecera">
                <strong>Pedido #{p.numero}</strong>
                <span>{new Date(p.fecha).toLocaleString('es-CL', { dateStyle: 'long', timeStyle: 'short' })}</span>
              </header>

              {p.items.map((i) => (
                <div className="pedido-item" key={i.nombre}>
                  <img src={i.imagen} alt={i.nombre} />
                  <div className="pedido-item-info">
                    <h4>{i.nombre}</h4>
                    <p>{i.cantidad} × {formatoCLP(i.precio)}</p>
                  </div>
                  <span className="pedido-subtotal">{formatoCLP(i.precio * i.cantidad)}</span>
                </div>
              ))}

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