// Artículos del blog de Creamy. Para agregar uno nuevo, copia un objeto y cambia el id.
// Las imágenes reutilizan las fotos del catálogo (/images/...).
export const categorias = ['Guías', 'Café', 'Consejos', 'Tradición']

const blogs = [
  {
    id: 1,
    titulo: 'Cómo elegir la torta perfecta para cada celebración',
    resumen: 'Cumpleaños, aniversarios o una once con amigos: te contamos qué sabor y tamaño conviene en cada ocasión.',
    categoria: 'Guías',
    fecha: '2026-10-15',
    autor: 'Equipo Creamy',
    minutos: 4,
    imagen: '/images/comida/pastel_frutilla.jpg',
    alt: 'Torta de crema y frutilla',
    contenido: [
      'Elegir una torta empieza por pensar en quiénes van a comerla. Para un cumpleaños con niños, los sabores clásicos como la crema con frutilla o el chocolate rara vez fallan. Para una reunión de adultos, una tres leches o una torta de zanahoria suelen ser una buena apuesta porque no resultan tan dulces.',
      'El tamaño también importa. Como referencia, una porción generosa alcanza para una persona, pero si habrá más postres en la mesa puedes calcular porciones más pequeñas y evitar que sobre demasiado.',
      'Por último, consulta si alguno de los invitados tiene alergias o restricciones. En cada producto de nuestra tienda encontrarás el detalle de ingredientes para que puedas decidir con tranquilidad.'
    ]
  },
  {
    id: 2,
    titulo: 'Café y pastel: combinaciones que funcionan',
    resumen: 'Un espresso corta lo dulce, un latte acompaña lo cremoso. Aprende a combinar tu bebida con el postre.',
    categoria: 'Café',
    fecha: '2026-09-28',
    autor: 'Equipo Creamy',
    minutos: 3,
    imagen: '/images/bebestible/espresso.jpg',
    alt: 'Taza de espresso',
    contenido: [
      'La regla general es buscar contraste o armonía. Un espresso, con su sabor intenso y sin leche, equilibra postres muy dulces o cremosos, como un cheesecake o un mil hojas con manjar.',
      'Si prefieres armonía, un latte de vainilla o de caramelo acompaña bien bizcochos suaves y rollitos. Y para los amantes del chocolate, un moka junto a un brownie es una combinación pensada para quien disfruta del sabor intenso.',
      'No hay reglas estrictas: prueba distintas combinaciones y quédate con la que más te guste.'
    ]
  },
  {
    id: 3,
    titulo: 'Alergias en pastelería: cómo leer los ingredientes',
    resumen: 'Frutos secos, lácteos, huevo y gluten están presentes en muchas preparaciones. Te explicamos qué revisar antes de comprar.',
    categoria: 'Consejos',
    fecha: '2026-09-10',
    autor: 'Equipo Creamy',
    minutos: 5,
    imagen: '/images/comida/pastel_zana.jpg',
    alt: 'Torta de zanahoria',
    contenido: [
      'En pastelería, ingredientes como el huevo, la leche, la harina de trigo y los frutos secos aparecen en muchísimas recetas. Por eso, antes de elegir un producto, lo más seguro es revisar el listado completo de ingredientes.',
      'En nuestra tienda, al abrir el detalle de cada producto puedes ver sus ingredientes. Un ejemplo: la torta de zanahoria lleva nueces, algo importante para quienes tienen alergia a los frutos secos.',
      'Si tienes una alergia severa, te recomendamos contactarnos antes de hacer tu pedido para resolver cualquier duda.'
    ]
  },
  {
    id: 4,
    titulo: 'Tres ideas para que tu brownie quede húmedo',
    resumen: 'La textura lo es todo. Estos consejos sirven tanto para hornear en casa como para elegir uno bien hecho.',
    categoria: 'Consejos',
    fecha: '2026-08-22',
    autor: 'Equipo Creamy',
    minutos: 3,
    imagen: '/images/comida/brownie.jpg',
    alt: 'Brownie de chocolate',
    contenido: [
      'Primero, no lo hornees de más. Un brownie debe sacarse del horno cuando el centro todavía está ligeramente blando, porque sigue cocinándose con el calor residual.',
      'Segundo, usa chocolate de buena calidad. Un chocolate con buen porcentaje de cacao aporta sabor y una textura más densa.',
      'Tercero, déjalo reposar antes de cortarlo. Si lo cortas muy caliente se desarma; con unos minutos de reposo queda firme por fuera y húmedo por dentro.'
    ]
  },
  {
    id: 5,
    titulo: 'Cómo conservar tus pasteles en casa',
    resumen: 'Refrigerador, tiempo y envase: lo básico para que tu torta llegue en buen estado al día siguiente.',
    categoria: 'Consejos',
    fecha: '2026-08-05',
    autor: 'Equipo Creamy',
    minutos: 4,
    imagen: '/images/comida/tres_leches.jpg',
    alt: 'Torta tres leches',
    contenido: [
      'Los pasteles con crema, como la tres leches o la de crema y frutilla, deben guardarse siempre en el refrigerador, en un recipiente tapado para que no absorban olores de otros alimentos.',
      'Antes de servir, sácalos unos minutos para que recuperen su textura y su sabor. Una torta recién salida del frío se siente más dura y con menos aroma.',
      'Para galletas y brownies, un envase hermético a temperatura ambiente suele ser suficiente por uno o dos días.'
    ]
  },
  {
    id: 6,
    titulo: 'Postres chilenos que no pueden faltar en tu mesa',
    resumen: 'Del mil hojas al chilenito de manjar: un recorrido por los dulces que nos recuerdan la once en casa.',
    categoria: 'Tradición',
    fecha: '2026-07-14',
    autor: 'Equipo Creamy',
    minutos: 4,
    imagen: '/images/comida/mil_hojas.jpg',
    alt: 'Mil hojas con manjar',
    contenido: [
      'El manjar es protagonista de muchos de nuestros dulces favoritos. Está en el mil hojas, entre capas finas y crujientes de masa, y en los chilenitos, esas galletas suaves que se rellenan y se espolvorean con azúcar flor.',
      'El kuchen de manzana, heredero de la tradición de pastelería del sur del país, es otro infaltable en una buena once, sobre todo con un café caliente.',
      'Todos ellos funcionan igual de bien para una reunión familiar que para un regalo.'
    ]
  }
]

export default blogs
