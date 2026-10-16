import { Link } from 'react-router-dom'
import CarruselInicio from '../components/Carrusel.jsx'
import '../css/inicio.css'

const features = [
  { img: '/images/iu/index1.avif', titulo: '100% Artesanal', texto: 'Hornear diariamente es nuestro compromiso con la frescura.' },
  { img: '/images/iu/index2.jpg', titulo: 'Recetas Únicas', texto: 'Combinaciones exclusivas de sabores y presentación impecable.' },
  { img: '/images/iu/sitio1.avif', titulo: 'Ambiente Acogedor', texto: 'El espacio perfecto para tus tardes de café y postres.' }
]

export default function Inicio() {
  return (
    <section className="inicio">
      <div className="mt-4">
        <CarruselInicio />
      </div>

      <div className="features">
        {features.map((f) => (
          <div className="feature-card" key={f.titulo}>
            <div><img src={f.img} alt={f.titulo} /></div>
            <h3>{f.titulo}</h3>
            <p>{f.texto}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
