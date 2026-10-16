import { useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import ProductoModal from '../components/ProductModal.jsx'
import productos from '../data/productos.js'
import { useCarrito } from '../context/CarritoContext.jsx'
import { useMensaje } from '../context/MensajeContext.jsx'
import '../css/productos.css'

export default function Productos() {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const { agregar } = useCarrito()
  const { mostrarMensaje } = useMensaje()

  const handleAgregar = (producto) => {
    agregar({ nombre: producto.nombre, precio: producto.precio, imagen: producto.imagen })
    mostrarMensaje(`${producto.nombre} se agregó al carrito.`, 'success')
  }

  return (
    <section id="productos" className="section active">
      <div className="section-header">
        <h2>Nuestras Creaciones</h2>
        <p>Explora nuestra selección dulce preparada hoy</p>
      </div>
      <div className="products-grid">
        {productos.map((p) => (
          <ProductCard
          key={p.nombre}
          producto={p} 
          onAgregar={handleAgregar} 
          onVer={setProductoSeleccionado}
          />
        ))}
      </div>
      <ProductoModal
        producto={productoSeleccionado}
        onCerrar={() => setProductoSeleccionado(null)}
        onAgregar={handleAgregar}
      />
    </section>
  )
}