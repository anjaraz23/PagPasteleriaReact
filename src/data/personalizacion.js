export const SABOR_BASE = 'Receta original'
export const PORCIONES_POR_PISO = 15
export const MIN_PERSONAS = 4

// Reglas por torta, según el id de productos.js.
// Los pisos y sabores de abajo son EJEMPLOS: cámbialos por lo que tu pastelería ofrece de verdad.
export const PERSONALIZACION = {
  1: { maxPisos: 3, sabores: ['Frambuesa', 'Manjar', 'Lúcuma', 'Durazno', 'Piña'] },           // Torta de crema y frutilla
  2: { maxPisos: 3, sabores: ['Chocolate con naranja', 'Manjar', 'Chocolate y crema chantilly'] }, // Torta de chocolate
  5: { maxPisos: 1, sabores: ['Coco', 'Chocolate', 'Leche sin lactosa'] },                       // Torta tres leches
  6: { maxPisos: 1, sabores: ['Manjar con nueces', 'Crema pastelera', 'Cobertura de chocolate'] },    // Mil hojas
  7: { maxPisos: 2, sabores: ['Con pasas', 'Cobertura de manjar', 'Cobertura de chocolate'] },        // Torta de zanahoria
  16: { maxPisos: 1, sabores: ['Frutos rojos', 'Durazno', 'Piña', 'Arandanos'] }                 // Tartaleta de frutas
}

export const IMAGEN_PISOS = {
    1: '/images/pisos/piso1pastel.jpg',  
    2: '/images/pisos/piso2pastel.jpg',
    3: '/images/pisos/piso3pastel.jpg'
}

// Una torta que no esté en la lista se ofrece en un solo piso y solo con su receta original
// asi usamos siempre de base las tortas ya existentes, y no inventamos sabores nuevos que no tenemos en la pastelería.
const POR_DEFECTO = { maxPisos: 1, sabores: [] }

export const configDe = (id) => PERSONALIZACION[id] ?? POR_DEFECTO

// Cada piso rinde hasta PORCIONES_POR_PISO porciones
export const rangoPersonas = (pisos) => ({
  min: pisos === 1 ? MIN_PERSONAS : (pisos - 1) * PORCIONES_POR_PISO + 1,
  max: pisos * PORCIONES_POR_PISO
})