// Lógica de la pasarela de pago (simulada: no hay backend ni cobro real).

export const ENVIO_DESPACHO = 2990 // costo fijo de despacho a domicilio (ajústalo a tu negocio)
export const DEMORA_PAGO = 1200 // ms que dura el "procesando pago" simulado

export const soloDigitos = (s = '') => String(s).replace(/\D/g, '')

// "4111111111111111" -> "4111 1111 1111 1111"
export function formatearTarjeta(valor) {
  return soloDigitos(valor).slice(0, 19).replace(/(\d{4})(?=\d)/g, '$1 ')
}

// "1230" -> "12/30"
export function formatearVencimiento(valor) {
  const d = soloDigitos(valor).slice(0, 4)
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
}

// Algoritmo de Luhn: detecta números de tarjeta mal digitados
export function validarNumeroTarjeta(numero) {
  const d = soloDigitos(numero)
  if (d.length < 13 || d.length > 19) return false
  let suma = 0
  for (let i = 0; i < d.length; i++) {
    let n = parseInt(d[d.length - 1 - i], 10)
    if (i % 2 === 1) {
      n *= 2
      if (n > 9) n -= 9
    }
    suma += n
  }
  return suma % 10 === 0
}

// Formato MM/AA, no vencida (vale hasta fin del mes indicado) y a lo más 20 años a futuro
export function validarVencimiento(texto, hoy = new Date()) {
  const m = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(texto)
  if (!m) return false
  const mes = Number(m[1])
  const anio = 2000 + Number(m[2])
  const anioActual = hoy.getFullYear()
  const mesActual = hoy.getMonth() + 1
  if (anio < anioActual || (anio === anioActual && mes < mesActual)) return false
  return anio <= anioActual + 20
}

export const validarCvv = (cvv) => /^\d{3}$/.test(cvv)

export const validarTitular = (titular) =>
  /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' ]{3,50}$/.test(titular.trim())

// Regla de simulación: las tarjetas que terminan en 0002 son rechazadas por el "banco"
export const tarjetaRechazada = (numero) => soloDigitos(numero).endsWith('0002')

// Devuelve un objeto { campo: 'mensaje' } con los errores; vacío si todo está bien
export function validarCheckout({ entrega, direccion, comuna, metodo, tarjeta }, hoy = new Date()) {
  const e = {}

  if (entrega === 'despacho') {
    const dir = direccion.trim()
    if (dir === '') e.direccion = 'La dirección es obligatoria.'
    else if (dir.length > 300) e.direccion = 'La dirección no puede superar los 300 caracteres.'
    if (comuna.trim() === '') e.comuna = 'La comuna es obligatoria.'
  }

  if (metodo === 'efectivo' && entrega !== 'retiro') {
    e.metodo = 'El pago al retirar solo está disponible con retiro en tienda.'
  }

  if (metodo === 'tarjeta') {
    if (tarjeta.titular.trim() === '') e.titular = 'El nombre del titular es obligatorio.'
    else if (!validarTitular(tarjeta.titular)) e.titular = 'Ingresa el nombre tal como aparece en la tarjeta.'

    if (soloDigitos(tarjeta.numero) === '') e.numero = 'El número de tarjeta es obligatorio.'
    else if (!validarNumeroTarjeta(tarjeta.numero)) e.numero = 'El número de tarjeta no es válido.'

    if (tarjeta.vencimiento === '') e.vencimiento = 'La fecha de vencimiento es obligatoria.'
    else if (!validarVencimiento(tarjeta.vencimiento, hoy)) e.vencimiento = 'Fecha inválida o tarjeta vencida (formato MM/AA).'

    if (tarjeta.cvv === '') e.cvv = 'El CVV es obligatorio.'
    else if (!validarCvv(tarjeta.cvv)) e.cvv = 'El CVV debe tener 3 dígitos.'
  }

  return e
}

export const describirEntrega = (e) =>
  e?.tipo === 'despacho' ? `Despacho a ${e.direccion}, ${e.comuna}` : 'Retiro en tienda'

export function describirPago(p) {
  if (p?.metodo === 'tarjeta') return `Tarjeta terminada en ${p.ultimos4}`
  if (p?.metodo === 'transferencia') return 'Transferencia bancaria'
  if (p?.metodo === 'efectivo') return 'Pago al retirar'
  return ''
}
