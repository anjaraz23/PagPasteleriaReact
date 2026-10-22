import { Offcanvas } from 'react-bootstrap'
import { useCarrito, formatoCLP } from '../context/CarritoContext.jsx'
import { useNavigate } from 'react-router-dom'
import { useSesion } from '../context/SesionContext.jsx'
import { useMensaje } from '../context/MensajeContext.jsx'

export default function CarritoOffcanvas() {
  const { items, total, abierto, setAbierto, cambiarCantidad, quitar, vaciar } = useCarrito()

  const { usuario } = useSesion()
  const { mostrarMensaje } = useMensaje()
  const navigate = useNavigate()

  const comprar = () => {
  if (items.length === 0) return

  // Para comprar hay que haber iniciado sesión
  if (!usuario) {
    setAbierto(false)
    mostrarMensaje('Inicia sesión para finalizar tu compra.', 'error', 'Atención', () => navigate('/login'))
    return
  }

  // El pago y el registro del pedido ocurren en la página de checkout
  setAbierto(false)
  navigate('/checkout')
  }

  return (
    <Offcanvas show={abierto} onHide={() => setAbierto(false)} placement="end" id="carritoOffcanvas">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Tu carrito</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="d-flex flex-column">
        <div className="carrito-cuerpo flex-grow-1">
          {items.length === 0 ? (
            <p className="carrito-vacio">Tu carrito está vacío.</p>
          ) : (
            items.map((item) => (
              <div className="carrito-item" key={item.nombre}>
                <img src={item.imagen} alt={item.nombre} />
                <div className="carrito-item-info">
                  <h4>{item.nombre}</h4>
                  <p>{formatoCLP(item.precio)} c/u</p>
                  <div className="carrito-cantidad">
                    <button type="button" className="btn-cantidad" onClick={() => cambiarCantidad(item.nombre, -1)}>-</button>
                    <span>{item.cantidad}</span>
                    <button type="button" className="btn-cantidad" onClick={() => cambiarCantidad(item.nombre, 1)}>+</button>
                  </div>
                </div>
                <div className="carrito-item-derecha">
                  <span className="carrito-subtotal">{formatoCLP(item.precio * item.cantidad)}</span>
                  <button type="button" className="btn-quitar" aria-label="Quitar producto" onClick={() => quitar(item.nombre)}>
                    &times;
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="carrito-footer">
          <div className="carrito-total-row">
            <span>Total</span>
            <span>{formatoCLP(total)}</span>
          </div>
          <button type="button" className="btn btn-primary full-width" onClick={vaciar}>
            Vaciar carrito
          </button>
          <div>
            <button type="button" className="btn btn-secondary full-width" disabled={items.length === 0} onClick={comprar}>
            Finalizar compra
            </button>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
