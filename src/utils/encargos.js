const CLAVE = 'encargosCreamy'

export const leerEncargos = () => {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || []
  } catch {
    return []
  }
}

// Puede lanzar un error si el almacenamiento del navegador está lleno
export function guardarEncargo(encargo) {
  localStorage.setItem(CLAVE, JSON.stringify([...leerEncargos(), encargo]))
}

// Reduce la foto (máx. 800 px, JPEG) para que quepa en el almacenamiento del navegador
export function comprimirImagen(archivo, maxLado = 800, calidad = 0.7) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader()
    lector.onerror = reject
    lector.onload = () => {
      const img = new Image()
      img.onerror = reject
      img.onload = () => {
        const escala = Math.min(1, maxLado / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * escala)
        canvas.height = Math.round(img.height * escala)
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#ffffff' // fondo blanco para PNG con transparencia
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', calidad))
      }
      img.src = lector.result
    }
    lector.readAsDataURL(archivo)
  })
}