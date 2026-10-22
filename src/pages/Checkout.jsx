import { useEffect, useRef, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useCarrito, formatoCLP } from '../context/CarritoContext.jsx'
import { useSesion } from '../context/SesionContext.jsx'
import { registrarPedido } from '../utils/pedidos.js'
import {
  ENVIO_DESPACHO,
  DEMORA_PAGO,
  formatearTarjeta,
  formatearVencimiento,
  soloDigitos,
  tarjetaRechazada,
  validarCheckout,
  describirEntrega,
  describirPago
} from '../utils/pago.js'
import '../css/checkout.css'

const tarjetaVacia = { titular: '', numero: '', vencimiento: '', cvv: '' }

function Campo({ id, label, error, as: Tag = 'input', ...props }) {
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">{label}</label>
      <Tag id={id} name={id} className={`form-control ${error ? 'is-invalid' : ''}`} aria-invalid={Boolean(error)} {...props} />
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  )
}

function Opcion({ name, value, checked, onChange, children }) {
  return (
    <div className="form-check">
      <label className="form-check-label">
        <input type="radio" className="form-check-input" name={name} value={value} checked={checked} onChange={onChange} />
        {children}
      </label>
    </div>
  )
}

export default function Checkout() {
  const { items, total, vaciar } = useCarrito()
  const { usuario } = useSesion()

  const [entrega, setEntrega] = useState('retiro')
  const [direccion, setDireccion] = useState(usuario?.direccion ?? '')
  const [comuna, setComuna] = useState(usuario?.comuna ?? '')
  const [metodo, setMetodo] = useState('tarjeta')
  const [tarjeta, setTarjeta] = useState(tarjetaVacia)
  const [intentado, setIntentado] = useState(false)
  const [procesando, setProcesando] = useState(false)
  const [errorPago, setErrorPago] = useState('')
  const [pedido, setPedido] = useState(null)
  const temporizador = useRef(null)

  useEffect(() => () => clearTimeout(temporizador.current), [])

  const envio = entrega === 'despacho' ? ENVIO_DESPACHO : 0
  const totalFinal = total + envio
  const datos = { entrega, direccion, comuna, metodo, tarjeta }
  const errores = intentado ? validarCheckout(datos) : {}

  // Protección de la página
  if (!usuario) return <Navigate to="/login" replace />
  if (pedido) return <PedidoExitoso pedido={pedido} />
  if (items.length === 0) return <Navigate to="/productos" replace />

  const cambiarEntrega = (valor) => {
    setEntrega(valor)
    // "Pagar al retirar" no existe con despacho
    if (valor === 'despacho' && metodo === 'efectivo') setMetodo('tarjeta')
  }

  const cambiarTarjeta = (e) => {
    const { name, value } = e.target
    const formateado =
      name === 'numero' ? formatearTarjeta(value)
      : name === 'vencimiento' ? formatearVencimiento(value)
      : name === 'cvv' ? soloDigitos(value).slice(0, 3)
      : value
    setTarjeta((prev) => ({ ...prev, [name]: formateado }))
  }

  const confirmar = (e) => {
    e.preventDefault()
    setIntentado(true)
    setErrorPago('')
    if (Object.keys(validarCheckout(datos)).length > 0) return

    setProcesando(true)
    // Simula la respuesta del banco. Con una pasarela real aquí iría la llamada al servidor.
    temporizador.current = setTimeout(() => {
      if (metodo === 'tarjeta' && tarjetaRechazada(tarjeta.numero)) {
        setProcesando(false)
        setErrorPago('El banco rechazó el pago. Revisa los datos o prueba con otra tarjeta.')
        return
      }

      const nuevo = registrarPedido(usuario, items, totalFinal, {
        subtotal: total,
        envio,
        entrega: entrega === 'despacho'
          ? { tipo: 'despacho', direccion: direccion.trim(), comuna: comuna.trim() }
          : { tipo: 'retiro' },
        // Nunca se guarda el número completo ni el CVV: solo el método y los últimos 4 dígitos
        pago: metodo === 'tarjeta'
          ? { metodo, ultimos4: soloDigitos(tarjeta.numero).slice(-4) }
          : { metodo }
      })
      vaciar()
      setTarjeta(tarjetaVacia)
      setProcesando(false)
      setPedido(nuevo)
    }, DEMORA_PAGO)
  }

  return (
    <section id="checkout" className="section active">
      <div className="container checkout-container">
        <div className="section-header">
          <h2>Finalizar compra</h2>
          <p>Revisa tu pedido, elige cómo recibirlo y paga de forma segura.</p>
        </div>

        <div className="row g-4">
          <div className="col-12 col-lg-7">
            <form onSubmit={confirmar} noValidate>
              <fieldset className="card-box checkout-bloque">
                <legend>Entrega</legend>
                <Opcion name="entrega" value="retiro" checked={entrega === 'retiro'} onChange={() => cambiarEntrega('retiro')}>
                  Retiro en tienda (gratis)
                </Opcion>
                <Opcion name="entrega" value="despacho" checked={entrega === 'despacho'} onChange={() => cambiarEntrega('despacho')}>
                  Despacho a domicilio (+{formatoCLP(ENVIO_DESPACHO)})
                </Opcion>

                {entrega === 'despacho' && (
                  <div className="checkout-campos">
                    <Campo id="direccion" label="Dirección de entrega" value={direccion} maxLength={300} error={errores.direccion} onChange={(e) => setDireccion(e.target.value)} />
                    <Campo id="comuna" label="Comuna" value={comuna} error={errores.comuna} onChange={(e) => setComuna(e.target.value)} />
                  </div>
                )}
              </fieldset>

              <fieldset className="card-box checkout-bloque">
                <legend>Pago</legend>
                <Opcion name="metodo" value="tarjeta" checked={metodo === 'tarjeta'} onChange={() => setMetodo('tarjeta')}>
                  Tarjeta de crédito o débito
                </Opcion>
                <Opcion name="metodo" value="transferencia" checked={metodo === 'transferencia'} onChange={() => setMetodo('transferencia')}>
                  Transferencia bancaria
                </Opcion>
                {entrega === 'retiro' && (
                  <Opcion name="metodo" value="efectivo" checked={metodo === 'efectivo'} onChange={() => setMetodo('efectivo')}>
                    Pagar al retirar
                  </Opcion>
                )}
                {errores.metodo && <div className="invalid-feedback d-block">{errores.metodo}</div>}

                {metodo === 'tarjeta' && (
                  <div className="checkout-campos">
                    <Campo id="titular" label="Nombre del titular" autoComplete="cc-name" value={tarjeta.titular} maxLength={50} error={errores.titular} onChange={cambiarTarjeta} />
                    <Campo id="numero" label="Número de tarjeta" inputMode="numeric" autoComplete="cc-number" placeholder="0000 0000 0000 0000" value={tarjeta.numero} error={errores.numero} onChange={cambiarTarjeta} />
                    <div className="row">
                      <div className="col-7">
                        <Campo id="vencimiento" label="Vencimiento (MM/AA)" inputMode="numeric" autoComplete="cc-exp" placeholder="MM/AA" value={tarjeta.vencimiento} error={errores.vencimiento} onChange={cambiarTarjeta} />
                      </div>
                      <div className="col-5">
                        <Campo id="cvv" label="CVV" inputMode="numeric" autoComplete="cc-csc" placeholder="123" value={tarjeta.cvv} error={errores.cvv} onChange={cambiarTarjeta} />
                      </div>
                    </div>
                  </div>
                )}
                {metodo === 'transferencia' && (
                  <p className="checkout-nota">Al confirmar, te enviaremos los datos bancarios al correo de tu cuenta para completar el pago.</p>
                )}
                {metodo === 'efectivo' && (
                  <p className="checkout-nota">Pagarás en la tienda al momento de retirar tu pedido.</p>
                )}
              </fieldset>

              {errorPago && <div className="alert alert-danger" role="alert">{errorPago}</div>}

              <button type="submit" className="btn btn-primary full-width" disabled={procesando}>
                {procesando ? 'Procesando pago...' : `Pagar ${formatoCLP(totalFinal)}`}
              </button>
            </form>
          </div>

          <aside className="col-12 col-lg-5" aria-label="Resumen del pedido">
            <div className="card-box checkout-resumen">
              <h3>Tu pedido</h3>
              {items.map((i) => (
                <div className="checkout-item" key={i.nombre}>
                  <img src={i.imagen} alt={i.nombre} />
                  <div>
                    <strong>{i.nombre}</strong>
                    <p>{i.cantidad} × {formatoCLP(i.precio)}</p>
                  </div>
                  <span>{formatoCLP(i.precio * i.cantidad)}</span>
                </div>
              ))}
              <div className="checkout-linea"><span>Subtotal</span><span>{formatoCLP(total)}</span></div>
              <div className="checkout-linea"><span>Envío</span><span>{envio === 0 ? 'Gratis' : formatoCLP(envio)}</span></div>
              <div className="checkout-linea checkout-total"><span>Total</span><span>{formatoCLP(totalFinal)}</span></div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function PedidoExitoso({ pedido }) {
  return (
    <section id="checkout-exito" className="section active">
      <div className="container checkout-container">
        <div className="card-box checkout-exito">
          <h2>¡Compra realizada!</h2>
          <p>Tu pedido #{pedido.numero} quedó registrado.</p>
          <dl>
            <dt>Total pagado</dt>
            <dd>{formatoCLP(pedido.total)}</dd>
            <dt>Entrega</dt>
            <dd>{describirEntrega(pedido.entrega)}</dd>
            <dt>Pago</dt>
            <dd>{describirPago(pedido.pago)}</dd>
          </dl>
          <div className="checkout-acciones">
            <Link to="/mis-compras" className="btn btn-primary">Ver mis compras</Link>
            <Link to="/productos" className="btn btn-outline-secondary">Seguir comprando</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
