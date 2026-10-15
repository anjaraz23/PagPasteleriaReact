import { Link } from 'react-router-dom'
import '../css/inicio.css'

const features = [
  { img: '/images/iu/index1.avif', titulo: '100% Artesanal', texto: 'Hornear diariamente es nuestro compromiso con la frescura.' },
  { img: '/images/iu/index2.jpg', titulo: 'Recetas Únicas', texto: 'Combinaciones exclusivas de sabores y presentación impecable.' },
  { img: '/images/iu/sitio1.avif', titulo: 'Ambiente Acogedor', texto: 'El espacio perfecto para tus tardes de café y postres.' }
]

export default function Inicio() {
  return (
    <section id="inicio" className="section active">
      <div className="hero">
        <div className="hero-content">
          <span className="badge">Pastelería &amp; Repostería</span>
          <h1>Dulzura suave en cada bocado</h1>
          <p>
            En Creamy creamos momentos especiales con recetas artesanales, ingredientes seleccionados y el toque justo de magia morada.
          </p>
          <div className="hero-btns">
            <Link to="/productos" className="btn btn-primary non-link">Ver Productos</Link>
            <Link to="/reservas" className="btn btn-secondary non-link2">Reservar Mesa</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/comida/torta-chocolate.avif" alt="Pastel de Creamy" />
        </div>
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
