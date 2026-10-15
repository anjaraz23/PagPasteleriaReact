import { formatoCLP } from '../context/CarritoContext.jsx'

export default function ProductCard({ producto, onAgregar }) {
  return (
    <div className="product-card">
      {producto.favorito && <div className="product-tag">Favorito</div>}
      <img src={producto.imagen} alt={producto.alt} />
      <div className="product-details">
        <h3>{producto.nombre}</h3>
        <p>{producto.descripcion}</p>
        <div className="product-bottom">
          <span className="price">{formatoCLP(producto.precio)}</span>
          <button className="btn btn-small btn-agregar" onClick={() => onAgregar(producto)}>
            Añadir
          </button>
        </div>
      </div>
    </div>
  )
}
