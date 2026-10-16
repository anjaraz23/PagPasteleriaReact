import { formatoCLP } from '../context/CarritoContext.jsx'

export default function ProductCard({ producto, onAgregar, onVer }) {
  return (
    //on click y on ver es para poder clickear la card y que se abra el modal y ver una descripcion mas detallada del producto
    <div className="product-card"
    onClick={() => onVer(producto)}
    style={{ cursor: onVer ? 'pointer' : 'default' }}
    >


      {producto.tag && <div className="product-tag">{producto.tag}</div>}
      <img src={producto.imagen} alt={producto.alt} />
      <div className="product-details">
        <h3>{producto.nombre}</h3>
        <div className="product-bottom">
          <span className="price">{formatoCLP(producto.precio)}</span>
          <button
          className="btn btn-small btn-agregar" 
          onClick={(e) =>{ e.stopPropagation(); 
          onAgregar(producto)}}
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  )
}
