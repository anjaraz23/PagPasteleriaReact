// el "detalle" es para mostrar los ingredientes de los productos por si es que alguien fuese alergico a los frutos secos
// o por si no les gusta algun sabor :D 
const productos = [
  {
    "id": 1,
    "nombre": "Torta de crema y frutilla",
    "descripcion": "Bizcocho suave de vainilla con capas de crema chantilly y frutillas frescas, ideal para quienes disfrutan los sabores clásicos.",
    "detalle": "Ingredientes: Harina de trigo, huevos, azúcar, leche, mantequilla, crema para batir, frutillas y esencia de vainilla.",
    "precio": 1990,
    "imagen": "/images/comida/pastel_frutilla.jpg",
    "alt": "pastel de frutilla",
    "categoria": "Tortas",
    "tag": "Favorito"
  },
  {
    "id": 2,
    "nombre": "Torta de chocolate",
    "descripcion": "Torta de chocolate intenso con relleno cremoso y cobertura de ganache para los amantes del cacao.",
    "detalle": "Ingredientes: Harina de trigo, huevos, azúcar, cacao en polvo, chocolate, leche, mantequilla y crema.",
    "precio": 4490,
    "imagen": "/images/comida/pastel_chocolate.jpg",
    "alt": "pastel de chocolate",
    "categoria": "Tortas",
    "tag": "Favorito"
  },
  {
    "id": 3,
    "nombre": "Cheesecake de frambuesa",
    "descripcion": "Cheesecake suave y cremoso sobre una base crujiente de galletas, acompañado de salsa de frutos rojos.",
    "detalle": "Ingredientes: Queso crema, galletas, mantequilla, azúcar, huevos, crema de leche, frambuesas.",
    "precio": 4490,
    "imagen": "/images/comida/cheesecake_fram.jpg",
    "alt": "cheesecake de frambuesa",
    "categoria": "Cheesecakes",
    "tag": null
  },
  {
    "id": 4,
    "nombre": "Pie de limón con merengue",
    "descripcion": "Masa crujiente con relleno cítrico y una capa de merengue suave y ligeramente dorado.",
    "detalle": "Ingredientes: Harina de trigo, mantequilla, azúcar, huevos, leche condensada, limón y azúcar para el merengue.",
    "precio": 3490,
    "imagen": "/images/comida/pie_limon.jpg",
    "alt": "pie de limón con merengue",
    "categoria": "Pies",
    "tag": null
  },
  {
    "id": 5,
    "nombre": "Torta tres leches",
    "descripcion": "Bizcocho húmedo impregnado con una mezcla de tres leches y cubierto con crema chantilly.",
    "detalle": "Ingredientes: Harina de trigo, huevos, azúcar, leche evaporada, leche condensada, leche entera y crema para batir.",
    "precio": 3990,
    "imagen": "/images/comida/tres_leches.jpg",
    "alt": "torta tres leches",
    "categoria": "Tortas",
    "tag": "Favorito"
  },
  {
    "id": 6,
    "nombre": "Mil hojas",
    "descripcion": "Delicadas capas crujientes de masa con abundante manjar, terminadas con migas de hojaldre.",
    "detalle": "Ingredientes: Harina de trigo, mantequilla, huevos, azúcar, manjar y leche.",
    "precio": 4490,
    "imagen": "/images/comida/mil_hojas.jpg",
    "alt": "mil hojas",
    "categoria": "Tortas",
    "tag": "Favorito"
  },
  {
    "id": 7,
    "nombre": "Torta de zanahoria",
    "descripcion": "Bizcocho húmedo con zanahoria, especias suaves y una cobertura de queso crema.",
    "detalle": "Ingredientes: Harina de trigo, zanahoria, huevos, azúcar, aceite vegetal, canela, nueces y queso crema.",
    "precio": 3990,
    "imagen": "/images/comida/pastel_zana.jpg",
    "alt": "torta de zanahoria",
    "categoria": "Tortas",
    "tag": null
  },
  {
    "id": 8,
    "nombre": "Kuchen de manzana",
    "descripcion": "Pastel de manzana con un toque de canela y cubierta crocante de migas dulces.",
    "detalle": "Ingredientes: Harina de trigo, manzanas, mantequilla, azúcar, huevos, canela y leche.",
    "precio": 3490,
    "imagen": "/images/comida/kuchen_manzana.jpg",
    "alt": "kuchen de manzana",
    "categoria": "Kuchen",
    "tag": null
  },
  {
    "id": 9,
    "nombre": "Brownie de chocolate",
    "descripcion": "Brownie de textura húmeda, centro denso y sabor intenso a chocolate.",
    "detalle": "Ingredientes: Chocolate, cacao, harina, huevos, azúcar y mantequilla.",
    "precio": 2490,
    "imagen": "/images/comida/brownie.jpg",
    "alt": "brownie de chocolate",
    "categoria": "Brownies",
    "tag": null
  },
  {
    "id": 10,
    "nombre": "Caja de 3 macarons surtidos",
    "descripcion": "Pequeños bocados de almendra con exterior delicado y relleno cremoso. Disponibles en sabores como vainilla, frambuesa y chocolate.",
    "detalle": "Ingredientes: Harina, almendras, azúcar flor, claras de huevo, azúcar granulada, chocolate y crema.",
    "precio": 5990,
    "imagen": "/images/comida/macarons.jpg",
    "alt": "caja de macarons surtidos",
    "categoria": "Macarons",
    "tag": null
  },
  {
    "id": 11,
    "nombre": "Rollito de crema y chocolate",
    "descripcion": "Masa ligera rellena de crema pastelera de vainilla y terminada con cobertura de chocolate.",
    "detalle": "Ingredientes: Harina, huevos, mantequilla, leche, azúcar, vainilla, maicena y chocolate.",
    "precio": 1990,
    "imagen": "/images/comida/rollito_crema.jpg",
    "alt": "rollito de crema",
    "categoria": "Rollitos",
    "tag": null
  },
  {
    "id": 12,
    "nombre": "Rollito de canela",
    "descripcion": "Masa esponjosa enrollada con canela y azúcar, cubierta con un glaseado suave.",
    "detalle": "Ingredientes: Harina de trigo, leche, levadura, huevos, mantequilla, azúcar, canela y queso crema.",
    "precio": 2490,
    "imagen": "/images/comida/rollito_canela.jpg",
    "alt": "rollito de canela",
    "categoria": "Rollitos",
    "tag": null
  },
  {
    "id": 13,
    "nombre": "Chilenito de manjar",
    "descripcion": "Dos galletas suaves rellenas de manjar y espolvoreadas con azúcar flor.",
    "detalle": "Ingredientes: Harina de trigo, maicena, mantequilla, azúcar, huevos, manjar y azúcar flor.",
    "precio": 1490,
    "imagen": "/images/comida/chilenito.jpg",
    "alt": "chilenito de manjar",
    "categoria": "Nacionales",
    "tag": null
  },
  {
    "id": 14,
    "nombre": "Galleton con chips",
    "descripcion": "Galleta dorada por fuera y suave por dentro, con abundantes trozos de chocolate.",
    "detalle": "Ingredientes: Harina, mantequilla, azúcar rubia, azúcar blanca, huevos, chocolate y vainilla.",
    "precio": 1490,
    "imagen": "/images/comida/galleton.jpg",
    "alt": "galleton con chips",
    "categoria": "Galletas",
    "tag": null 
  },
  {
    "id": 15,
    "nombre": "Berlin crema pastelera",
    "descripcion": "Masa dulce y esponjosa, rellena de crema pastelera y cubierta con azúcar flor.",
    "detalle": "Ingredientes: Harina de trigo, leche, levadura, huevos, mantequilla, azúcar, crema pastelera y aceite vegetal.",
    "precio": 1490,
    "imagen": "/images/comida/berlin_crema.jpg",
    "alt": "berlin crema",
    "categoria": "Berlines",
    "tag": null
  },
  {
    "id": 16,
    "nombre": "Tartaleta de frutas",
    "descripcion": "Base crujiente rellena de crema pastelera, decorada con frutillas frescas.",
    "detalle": "Ingredientes: Harina de trigo, mantequilla, azúcar, huevos, leche, maicena, vainilla y frutillas.",
    "precio": 3490,
    "imagen": "/images/comida/tartaleta_frutilla.jpg",
    "alt": "tartaleta de frutas",
    "categoria": "Tortas",
    "tag": null
  },
  {
    "id": 17,
    "nombre": "Espresso",
    "descripcion": "Café concentrado, aromático y con cuerpo, ideal para quienes prefieren disfrutar el sabor del grano sin leche.",
    "detalle": "Ingredientes: Café arabe de especialidad molido y agua filtrada.",
    "precio": 1990,
    "imagen": "/images/bebestible/espresso.jpg",
    "alt": "espresso",
    "categoria": "Cafés",
    "tag": null
  },
  {
    "id": 18,
    "nombre": "Capuchino",
    "descripcion": "Espresso combinado con leche vaporizada y una capa de espuma sedosa.",
    "detalle": "Ingredientes: Café arabe de especialidad molido, leche y agua filtrada.",
    "precio": 2990,
    "imagen": "/images/bebestible/capuchino.jpg",
    "alt": "capuchino",
    "categoria": "Cafés",
    "tag": null
  },
  {
    "id": 19,
    "nombre": "Latte de vainilla",
    "descripcion": "Espresso combinado con leche vaporizada, un toque de vainilla y una capa de espuma sedosa.",
    "detalle": "Ingredientes: Café arabe de especialidad molido, leche, jarabe de vainilla y agua filtrada.",
    "precio": 3490,
    "imagen": "/images/bebestible/latte_vainilla.jpg",
    "alt": "latte",
    "categoria": "Cafés",
    "tag": "Favorito"
  },
  {
    "id": 20,
    "nombre": "Moka",
    "descripcion": "Café con un toque de chocolate, ideal para los amantes del sabor intenso.",
    "detalle": "Ingredientes: Café arabe de especialidad molido, leche, chocolate y agua filtrada.",
    "precio": 3490,
    "imagen": "/images/bebestible/moka.jpg",
    "alt": "moka",
    "categoria": "Cafés",
    "tag": null
  },
  {
    "id": 21,
    "nombre": "Latte frio",
    "descripcion": "Espresso servido con leche fría y hielo, una alternativa refrescante para los días cálidos.",
    "detalle": "Ingredientes: Café de especialidad, leche y hielo.",
    "precio": 3490,
    "imagen": "/images/bebestible/latte_frio.jpg",
    "alt": "latte frio",
    "categoria": "Cafés",
    "tag": null
  },
  {
    "id": 22,
    "nombre": "Latte de caramelo",
    "descripcion": "Espresso combinado con leche vaporizada y un toque de caramelo.",
    "detalle": "Ingredientes: Café arabe de especialidad molido, leche, caramelo y agua filtrada.",
    "precio": 3490,
    "imagen": "/images/bebestible/latte_caramelo.jpg",
    "alt": "latte de caramelo",
    "categoria": "Cafés",
    "tag": "Favorito"
  },
  {
    "id": 23,
    "nombre": "Matcha rosa",
    "descripcion": "Una bebida cremosa y refrescante hecha con polvo de matcha y un toque de frutilla.",
    "detalle": "Ingredientes: Polvo de matcha, leche, pure de frutilla y agua filtrada.",
    "precio": 3990,
    "imagen": "/images/bebestible/matcha.jpg",
    "alt": "matcha rosa",
    "categoria": "Cafés",
    "tag": null
  },
  {
    "id": 24,
    "nombre": "Chocolate caliente",
    "descripcion": "Una bebida caliente y reconfortante hecha con chocolate fundido y leche.",
    "detalle": "Ingredientes: Chocolate fundido, leche y agua filtrada.",
    "precio": 3490,
    "imagen": "/images/bebestible/chocolate.jpg",
    "alt": "chocolate caliente",
    "categoria": "Cafés",
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
  //  "categoria": "",
  //  "tag": null
  //},


]
export default productos  
