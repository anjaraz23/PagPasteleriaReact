import { Carousel } from 'react-bootstrap'

const slides = [
  {
    img: '/images/carrusel/pastel_chocolate.jpg',
    alt: 'Tortas artesanales',
    titulo: 'Tortas artesanales',
    texto: 'Hechas cada mañana con ingredientes frescos.'
  },
  {
    img: '/images/carrusel/rollito_canela.jpg',
    alt: 'Macarons',
    titulo: 'Rollitos de canela',
    texto: 'Perfectos para regalar.'
  },
  {
    img: '/images/carrusel/pie_limon.jpg',
    alt: 'Salón Creamy',
    titulo: 'Disfruta nuestros sabores',
    texto: 'Para compartir con amigos y familia.'
  }
]

export default function CarruselInicio() {
  return (
    <Carousel className="carrusel-inicio" interval={6000} pause="hover">
      {slides.map((s) => (
        <Carousel.Item key={s.titulo}>
          <img className="d-block w-100" src={s.img} alt={s.alt} />
          <Carousel.Caption>
            <h3>{s.titulo}</h3>
            <p>{s.texto}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}