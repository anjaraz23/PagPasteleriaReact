import { Link } from 'react-router-dom'
import CarruselInicio from '../components/Carrusel.jsx'
import '../css/inicio.css'

const features = [
  { img: '/images/iconos/apreton-de-manos (1).png', titulo: '100% Artesanal', texto: 'Hornear diariamente es nuestro compromiso con la frescura.'},
  { img: '/images/iconos/libro-de-recetas.png', titulo: 'Recetas Únicas', texto: 'Combinaciones exclusivas de sabores y presentación impecable.' },
  { img: '/images/iconos/vibras-positivas.png', titulo: 'Ambiente Acogedor', texto: 'El espacio perfecto para tus tardes de café y postres.' },
  { img: '/images/iconos/tarta-de-queso.png', titulo: 'Sabores únicos', texto: 'Revisa nuestra carta de productos', to: '/productos'}
]

export default function Inicio() {
  return (
    <section className="inicio">
      <div className="mt-4">
        <CarruselInicio />
      </div>

      <div className="features">
        {features.map((f) => {
          const contenido = (
            <>
            <div><img src={f.img} alt={f.titulo} /></div>
            <h3>{f.titulo}</h3>
            <p>{f.texto}</p>
            </>
          )
          
          return f.to ? (
            <Link to={f.to} className="feature-card feature-link" key={f.titulo}>
              {contenido}
            </Link>
          ) :  (  
            <div className="feature-card" key={f.titulo}>
              {contenido}
          </div>
        )
        })}
      </div>
    </section>
  )
}
