// Funciones de validación tomadas tal cual de validacion-registro.js

export function calcularDigitoVerificador(cuerpo) {
  let suma = 0
  let multiplo = 2
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += multiplo * parseInt(cuerpo.charAt(i), 10)
    multiplo = multiplo < 7 ? multiplo + 1 : 2
  }
  const resto = 11 - (suma % 11)
  if (resto === 11) return '0'
  if (resto === 10) return 'K'
  return resto.toString()
}

export function validarRun(run) {
  if (!/^[0-9]+[0-9Kk]$/.test(run)) return false
  if (run.length < 7 || run.length > 9) return false
  const cuerpo = run.slice(0, -1)
  const dv = run.slice(-1).toUpperCase()
  return calcularDigitoVerificador(cuerpo) === dv
}

export function validarCorreo(correo) {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/
  if (!regex.test(correo)) return false
  if (correo.length > 100) return false
  const dominiosPermitidos = ['duocuc.cl', 'profesor.duocuc.cl', 'gmail.com']
  const dominio = correo.split('@')[1].toLowerCase()
  return dominiosPermitidos.includes(dominio)
}

export function validarPassword(password) {
  if (password.length < 4 || password.length > 10) return false
  return /^[A-Za-z0-9!@#$%^&*_\-.]+$/.test(password)
}

// Validar formulario de contacto
export function validarContacto(datos) {
  const errores = {}

  const nombre = datos.nombre.trim()
  if (nombre.length < 2 || nombre.length > 50) {
    errores.nombre = 'El nombre debe tener entre 2 y 50 caracteres.'
  } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü' -]+$/.test(nombre)) {
    errores.nombre = 'El nombre solo puede tener letras y espacios.'
  }

  const correo = datos.email.trim()
  const regexCorreo = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/
  if (!correo) {
    errores.email = 'El correo es obligatorio.'
  } else if (correo.length > 100 || !regexCorreo.test(correo)) {
    errores.email = 'Ingresa un correo válido (ej: hola@ejemplo.com).'
  }

  const mensaje = datos.mensaje.trim()
  if (mensaje.length < 30) {
    errores.mensaje = 'El mensaje debe tener al menos 30 caracteres.'
  } else if (mensaje.length > 500) {
    errores.mensaje = 'El mensaje no puede superar los 500 caracteres.'
  }

  return errores
}

export function validarProducto(datos, existentes = []) {
  const errores = {}

  const nombre = datos.nombre.trim()
  if (nombre.length < 3 || nombre.length > 60) {
    errores.nombre = 'El nombre debe tener entre 3 y 60 caracteres.'
  } else if (existentes.some((p) => p.nombre.toLowerCase() === nombre.toLowerCase())) {
    // el carrito identifica los productos por nombre pa evitar repeticiones
    errores.nombre = 'Ya existe un producto con ese nombre.'
  }

  const precio = Number(datos.precio)
  if (!Number.isInteger(precio) || precio <= 0 || precio > 1000000) {
    errores.precio = 'Ingresa un precio entero entre 1 y 1.000.000.'
  }

  if (!datos.categoria.trim()) errores.categoria = 'La categoria es obligatoria.'

  if (datos.descripcion.trim().length < 10) {
    errores.descripcion = 'La descripción debe tener al menos 10 caracteres.'
  }

  const imagen = datos.imagen.trim()
  if (!imagen || !(imagen.startsWith('/') || imagen.startsWith('http'))) {
    errores.imagen = 'Ingresa una ruta (/images/...) o una URL valida.'
  }

  return errores
}