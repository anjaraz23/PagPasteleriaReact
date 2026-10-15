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
