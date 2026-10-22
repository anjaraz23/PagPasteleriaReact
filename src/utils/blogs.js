const normalizar = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

// Filtra por categoría y texto, devuelve del mas reciente al mas antiguo
export function filtrarBlogs(lista, { texto = '', categoria = 'Todas' } = {}) {
  const q = normalizar(texto.trim())
  return lista
    .filter((b) => categoria === 'Todas' || b.categoria === categoria)
    .filter((b) => q === '' || normalizar(`${b.titulo} ${b.resumen}`).includes(q))
    .sort((a, b) => b.fecha.localeCompare(a.fecha))
}

// conversion de fechas
export const formatoFecha = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  })
