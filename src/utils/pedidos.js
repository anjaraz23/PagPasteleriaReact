const CLAVE = 'pedidosCreamy'

const leerPedidos = () => {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || []
  } catch {
    return []
  }
}

const mismoCorreo = (a, b) => a.toLowerCase() === b.toLowerCase()

// Pedidos de un usuario, del más reciente al más antiguo
export function pedidosDe(correo) {
  return leerPedidos()
    .filter((p) => mismoCorreo(p.correo, correo))
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
}

// extra (opcional): datos adicionales del pedido, por ejemplo { subtotal, envio, entrega, pago }
export function registrarPedido(usuario, items, total, extra = {}) {
  const todos = leerPedidos()
  const numero = todos.filter((p) => mismoCorreo(p.correo, usuario.correo)).length + 1

  const pedido = {
    ...extra,
    id: Date.now(),
    numero,
    correo: usuario.correo,
    fecha: new Date().toISOString(),
    // se guarda el precio pagado en ese momento, aunque luego cambie
    items: items.map(({ nombre, precio, imagen, cantidad }) => ({ nombre, precio, imagen, cantidad })),
    total
  }

  localStorage.setItem(CLAVE, JSON.stringify([...todos, pedido]))
  return pedido
}