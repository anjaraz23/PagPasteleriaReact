export const SABOR_BASE = 'Receta original'
export const PORCIONES_POR_PISO = 15
export const MIN_PERSONAS = 4

// Reglas por torta, según el id de productos.js.
// Cada sabor tiene:
//   nombre    -> lo que se ve en el selector
//   reemplaza -> { 'Ingrediente de la receta': 'Ingrediente nuevo' }
//   agrega    -> ['Ingrediente extra'] por si quisiera agregar algo a la receta base sin reemplazar nada
// Los nombres de ingredientes deben escribirse igual que en la lista del formulario
// (con la primera letra en mayúscula)
export const PERSONALIZACION = {
  // Torta de crema y frutilla
  //son los mismos id de productos.js, para poder usarlo como key
  1: {
    maxPisos: 3,
    sabores: [
      { nombre: 'Frambuesa', reemplaza: { Frutillas: 'Frambuesas' } },
      { nombre: 'Manjar', reemplaza: { Frutillas: 'Manjar' } },
      { nombre: 'Lúcuma', reemplaza: { Frutillas: 'Pulpa de lúcuma' } },
      { nombre: 'Durazno', reemplaza: { Frutillas: 'Duraznos' } },
      { nombre: 'Piña', reemplaza: { Frutillas: 'Piña' } }
    ]
  },

  // Torta de chocolate
  2: {
    maxPisos: 3,
    sabores: [
      { nombre: 'Chocolate con naranja', agrega: ['Ralladura de naranja'] },
      { nombre: 'Manjar', reemplaza: { Crema: 'Manjar' } },
      { nombre: 'Chocolate y crema chantilly', reemplaza: { Crema: 'Crema chantilly' } }
    ]
  },

  // Torta tres leches
  5: {
    maxPisos: 1,
    sabores: [
      { nombre: 'Coco', agrega: ['Coco rallado'] },
      { nombre: 'Chocolate', agrega: ['Cacao en polvo'] },
      {
        nombre: 'Leche sin lactosa',
        reemplaza: {
          'Leche evaporada': 'Leche evaporada sin lactosa',
          'Leche condensada': 'Leche condensada sin lactosa',
          'Leche entera': 'Leche entera sin lactosa',
          'Crema para batir': 'Crema para batir sin lactosa'
        }
      }
    ]
  },
  // Mil hojas
  6: {
    maxPisos: 1,
    sabores: [
      { nombre: 'Manjar con nueces', agrega: ['Nueces'] },
      { nombre: 'Crema pastelera', reemplaza: { Manjar: 'Crema pastelera' } },
      { nombre: 'Cobertura de chocolate', agrega: ['Chocolate'] }
    ]
  },
  // Torta de zanahoria
  7: {
    maxPisos: 2,
    sabores: [
      { nombre: 'Con pasas', agrega: ['Pasas'] },
      { nombre: 'Cobertura de manjar', reemplaza: { 'Queso crema': 'Manjar' } },
      { nombre: 'Cobertura de chocolate', reemplaza: { 'Queso crema': 'Chocolate' } }
    ]
  },
  // Tartaleta de frutas
  16: {
    maxPisos: 1,
    sabores: [
      { nombre: 'Frutos rojos', reemplaza: { Frutillas: 'Frutos rojos' } },
      { nombre: 'Durazno', reemplaza: { Frutillas: 'Duraznos' } },
      { nombre: 'Piña', reemplaza: { Frutillas: 'Piña' } },
      { nombre: 'Arándanos', reemplaza: { Frutillas: 'Arándanos' } }
    ]
  }
}

export const IMAGEN_PISOS = {
  1: '/images/pisos/piso1pastel.jpg',
  2: '/images/pisos/piso2pastel.jpg',
  3: '/images/pisos/piso3pastel.jpg'
}

const POR_DEFECTO = { maxPisos: 1, sabores: [] }

export const configDe = (id) => PERSONALIZACION[id] ?? POR_DEFECTO

// Cada piso rinde hasta PORCIONES_POR_PISO porciones
export const rangoPersonas = (pisos) => ({
  min: pisos === 1 ? MIN_PERSONAS : (pisos - 1) * PORCIONES_POR_PISO + 1,
  max: pisos * PORCIONES_POR_PISO
})

// Aplica los cambios de un sabor a la lista de ingredientes de la receta base
export function aplicarSabor(ingredientes, sabor) {
  if (!sabor) return ingredientes
  const reemplaza = sabor.reemplaza ?? {}
  const cambiados = ingredientes.map((i) => reemplaza[i] ?? i)
  const nuevos = (sabor.agrega ?? []).filter((i) => !cambiados.includes(i))
  return [...cambiados, ...nuevos]
}