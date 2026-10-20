import { Carousel } from 'react-bootstrap'
import '../css/inicio.css'

const slides = [
  {
    img: '/images/carrusel/pastel_chocolate.jpg',
    alt: 'Tortas artesanales',
    titulo: 'Tortas artesanales',
    texto: 'Hechas cada mañana con ingredientes frescos.',
    className: 'carrusel-inicio'
  },
  {
    img: '/images/carrusel/rollito_canela.jpg',
    alt: 'Macarons',
    titulo: 'Rollitos de canela',
    texto: 'Perfectos para regalar.',
    className: 'carrusel-inicio'
  },
  {
    img: '/images/carrusel/pie_limon.jpg',
    alt: 'Salón Creamy',
    titulo: 'Disfruta nuestros sabores',
    texto: 'Para compartir con amigos y familia.',
    className: 'carrusel-inicio'
  }
]

export default function CarruselInicio() {
  return (
    <Carousel className="carrusel-inicio" interval={6000} pause="hover">
      {slides.map((s) => (
        <Carousel.Item key={s.titulo}>
          <img className="d-block w-100" src={s.img} alt={s.alt} />
          <Carousel.Caption>
            <h1>{s.titulo}</h1>
            <h4>{s.texto}</h4>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}