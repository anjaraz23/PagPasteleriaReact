// el "detalle" es para mostrar los ingredientes de los productos por si es que alguien fuese alergico a los frutos secos
// o por si no les gusta algun sabor :D 
const productos = [
  {
    "id": 1,
    "nombre": "Torta de crema y frutilla",
    "descripcion": "Bizcocho suave de vainilla con capas de crema chantilly y frutillas frescas, ideal para quienes disfrutan los sabores clásicos.",
    "detalle": "Ingredientes: Harina de trigo, huevos, azúcar, leche, mantequilla, crema para batir, frutillas y esencia de vainilla.",
    "precio": 1990,
    "imagen": "/images/cake.jpg",
    "alt": "pastel de frutilla",
    "tag": "Favorito"
  },
  {
    "id": 2,
    "nombre": "Torta de chocolate - bruce bruce",
    "descripcion": "Torta de chocolate intenso con relleno cremoso y cobertura de ganache para los amantes del cacao.",
    "detalle": "Ingredientes: Harina de trigo, huevos, azúcar, cacao en polvo, chocolate, leche, mantequilla y crema.",
    "precio": 4490,
    "imagen": "/images/chocolate_cake.jpg",
    "alt": "pastel de chocolate",
    "tag": "Favorito"
  },
  {
    "id": 3,
    "nombre": "Cheesecake de frambuesa - dulce acido",
    "descripcion": "Cheesecake suave y cremoso sobre una base crujiente de galletas, acompañado de salsa de frutos rojos.",
    "detalle": "Ingredientes: Queso crema, galletas, mantequilla, azúcar, huevos, crema de leche, frambuesas.",
    "precio": 4490,
    "imagen": "",
    "alt": "cheesecake de frambuesa",
    "tag": null
  },
  {
    "id": 4,
    "nombre": "Pie de limón con merengue - cítrico y delicioso",
    "descripcion": "Masa crujiente con relleno cítrico y una capa de merengue suave y ligeramente dorado.",
    "detalle": "Ingredientes: Harina de trigo, mantequilla, azúcar, huevos, leche condensada, limón y azúcar para el merengue.",
    "precio": 3490,
    "imagen": "",
    "alt": "pie de limón con merengue",
    "tag": null
  },
  {
    "id": 5,
    "nombre": "Torta tres leches - abrazo dulce",
    "descripcion": "Bizcocho húmedo impregnado con una mezcla de tres leches y cubierto con crema chantilly.",
    "detalle": "Ingredientes: Harina de trigo, huevos, azúcar, leche evaporada, leche condensada, leche entera y crema para batir.",
    "precio": 3990,
    "imagen": "",
    "alt": "torta tres leches",
    "tag": "Favorito"
  },
  {
    "id": 6,
    "nombre": "Mil hojas - dulce manjar",
    "descripcion": "Delicadas capas crujientes de masa con abundante manjar, terminadas con migas de hojaldre.",
    "detalle": "Ingredientes: Harina de trigo, mantequilla, huevos, azúcar, manjar y leche.",
    "precio": 4490,
    "imagen": "",
    "alt": "mil hojas",
    "tag": "Favorito"
  },
  {
    "id": 7,
    "nombre": "Torta de zanahoria - abrazo de zanahoria",
    "descripcion": "Bizcocho húmedo con zanahoria, especias suaves y una cobertura de queso crema.",
    "detalle": "Ingredientes: Harina de trigo, zanahoria, huevos, azúcar, aceite vegetal, canela, nueces y queso crema.",
    "precio": 3990,
    "imagen": "",
    "alt": "torta de zanahoria",
    "tag": null
  },
  {
    "id": 8,
    "nombre": "Kuchen de manzana - clásico y reconfortante",
    "descripcion": "Pastel de manzana con un toque de canela y cubierta crocante de migas dulces.",
    "detalle": "Ingredientes: Harina de trigo, manzanas, mantequilla, azúcar, huevos, canela y leche.",
    "precio": 3490,
    "imagen": "",
    "alt": "kuchen de manzana",
    "tag": null
  },
  {
    "id": 9,
    "nombre": "Brownie de chocolate - intenso y húmedo",
    "descripcion": "Brownie de textura húmeda, centro denso y sabor intenso a chocolate.",
    "detalle": "Ingredientes: Chocolate, cacao, harina, huevos, azúcar y mantequilla.",
    "precio": 2490,
    "imagen": "",
    "alt": "brownie de chocolate",
    "tag": null
  },
  {
    "id": 10,
    "nombre": "Caja de macarons surtidos - colores y sabores",
    "descripcion": "Pequeños bocados de almendra con exterior delicado y relleno cremoso. Disponibles en sabores como vainilla, frambuesa y chocolate.",
    "detalle": "Ingredientes: Harina, almendras, azúcar flor, claras de huevo, azúcar granulada, chocolate y crema.",
    "precio": 5990,
    "imagen": "",
    "alt": "caja de macarons surtidos",
    "tag": null
  },
  {
    "id": 11,
    "nombre": "Rollito de crema y chocolate - dulce tentación",
    "descripcion": "Masa ligera rellena de crema pastelera de vainilla y terminada con cobertura de chocolate.",
    "detalle": "Ingredientes: Harina, huevos, mantequilla, leche, azúcar, vainilla, maicena y chocolate.",
    "precio": 1990,
    "imagen": "",
    "alt": "rollito de crema",
    "tag": null
  },
  {
    "id": 12,
    "nombre": "Rollito de canela - aroma y sabor",
    "descripcion": "Masa esponjosa enrollada con canela y azúcar, cubierta con un glaseado suave.",
    "detalle": "Ingredientes: Harina de trigo, leche, levadura, huevos, mantequilla, azúcar, canela y queso crema.",
    "precio": 2490,
    "imagen": "",
    "alt": "rollito de canela",
    "tag": null
  },
  {
    "id": 13,
    "nombre": "Chilenito de manjar - clásico chileno",
    "descripcion": "Dos galletas suaves rellenas de manjar y espolvoreadas con azúcar flor.",
    "detalle": "Ingredientes: Harina de trigo, maicena, mantequilla, azúcar, huevos, manjar y azúcar flor.",
    "precio": 1490,
    "imagen": "",
    "alt": "chilenito de manjar",
    "tag": null
  },
  {
    "id": 14,
    "nombre": "Galleton con chips - crujiente y dulce",
    "descripcion": "Galleta dorada por fuera y suave por dentro, con abundantes trozos de chocolate.",
    "detalle": "Ingredientes: Harina, mantequilla, azúcar rubia, azúcar blanca, huevos, chocolate y vainilla.",
    "precio": 1490,
    "imagen": "",
    "alt": "galleton con chips",
    "tag": null
  },
  {
    "id": 15,
    "nombre": "Berlin crema pastelera - esponjoso relleno",
    "descripcion": "Masa dulce y esponjosa, rellena de crema pastelera y cubierta con azúcar flor.",
    "detalle": "Ingredientes: Harina de trigo, leche, levadura, huevos, mantequilla, azúcar, crema pastelera y aceite vegetal.",
    "precio": 1490,
    "imagen": "",
    "alt": "berlin crema",
    "tag": null
  },
  {
    "id": 16,
    "nombre": "Tartaleta de frutas - fresca y colorida",
    "descripcion": "Base crujiente rellena de crema pastelera, decorada con frutillas frescas.",
    "detalle": "Ingredientes: Harina de trigo, mantequilla, azúcar, huevos, leche, maicena, vainilla y frutillas.",
    "precio": 3490,
    "imagen": "",
    "alt": "tartaleta de frutas",
    "tag": null
  },
  {
    "id": 17,
    "nombre": "Espresso - pequeño trago de energía",
    "descripcion": "Café concentrado, aromático y con cuerpo, ideal para quienes prefieren disfrutar el sabor del grano sin leche.",
    "detalle": "Ingredientes: Café arabe de especialidad molido y agua filtrada.",
    "precio": 1990,
    "imagen": "",
    "alt": "espresso",
    "tag": null
  },
  {
    "id": 18,
    "nombre": "Capuchino - espuma y sabor",
    "descripcion": "Espresso combinado con leche vaporizada y una capa de espuma sedosa.",
    "detalle": "Ingredientes: Café arabe de especialidad molido, leche y agua filtrada.",
    "precio": 2990,
    "imagen": "",
    "alt": "capuchino",
    "tag": null
  },
  {
    "id": 19,
    "nombre": "Latte de vainilla - suave y cremoso",
    "descripcion": "Espresso combinado con leche vaporizada, un toque de vainilla y una capa de espuma sedosa.",
    "detalle": "Ingredientes: Café arabe de especialidad molido, leche, jarabe de vainilla y agua filtrada.",
    "precio": 3490,
    "imagen": "",
    "alt": "latte",
    "tag": "Favorito"
  },
  {
    "id": 20,
    "nombre": "Moka - chocolate y café",
    "descripcion": "Café con un toque de chocolate, ideal para los amantes del sabor intenso.",
    "detalle": "Ingredientes: Café arabe de especialidad molido, leche, chocolate y agua filtrada.",
    "precio": 3490,
    "imagen": "",
    "alt": "moka",
    "tag": null
  },
  {
    "id": 21,
    "nombre": "Latte frio - refrescante y suave",
    "descripcion": "Espresso servido con leche fría y hielo, una alternativa refrescante para los días cálidos.",
    "detalle": "Ingredientes: Café de especialidad, leche y hielo.",
    "precio": 3490,
    "imagen": "",
    "alt": "latte frio",
    "tag": null
  },
  {
    "id": 22,
    "nombre": "Latte de caramelo - dulce y cremoso",
    "descripcion": "Espresso combinado con leche vaporizada y un toque de caramelo.",
    "detalle": "Ingredientes: Café arabe de especialidad molido, leche, caramelo y agua filtrada.",
    "precio": 3490,
    "imagen": "",
    "alt": "latte de caramelo",
    "tag": "Favorito"
  },
  {
    "id": 23,
    "nombre": "Matcha rosa - bebida cremosa y refrescante",
    "descripcion": "Una bebida cremosa y refrescante hecha con polvo de matcha y un toque de frutilla.",
    "detalle": "Ingredientes: Polvo de matcha, leche, pure de frutilla y agua filtrada.",
    "precio": 3990,
    "imagen": "",
    "alt": "matcha rosa",
    "tag": null
  },
  {
    "id": 24,
    "nombre": "Chocolate caliente - clásico y reconfortante",
    "descripcion": "Una bebida caliente y reconfortante hecha con chocolate fundido y leche.",
    "detalle": "Ingredientes: Chocolate fundido, leche y agua filtrada.",
    "precio": 3490,
    "imagen": "",
    "alt": "chocolate caliente",
    "tag": null
  },
  //base de los productos :D
  //{
  //  "id": ,
  //  "nombre": "",
  //  "descripcion": "",
  //  "detalle": "Ingredientes: ",
  //  "precio": 4490,
  //  "imagen": "",
  //  "alt": "",
  //  "tag": null
  //},


]
export default productos  
