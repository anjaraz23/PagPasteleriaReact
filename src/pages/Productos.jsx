import { useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import ProductoModal from '../components/ProductModal.jsx'
import productos from '../data/productos.js'
import { useCarrito } from '../context/CarritoContext.jsx'
import '../css/productos.css'

const categorias = ['Todos', ...new Set(productos.map((p) => p.categoria))]

export default function Productos() {

  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const [categoria, setCategoria] = useState('Todos')
  const { agregar, setAbierto } = useCarrito()

  const visibles = 
    categoria == 'Todos'
    ? productos
    : productos.filter((p) => p.categoria === categoria)

  const handleAgregar = (producto) => {
    agregar({ nombre: producto.nombre, precio: producto.precio, imagen: producto.imagen })
    setAbierto(true)
  }

  return (
    <section id="productos" className="section active">
      <div className="section-header">
        <h2>Nuestras Creaciones</h2>
        <h4>Explora nuestra selección dulce preparada hoy</h4>
      </div>
     
      <div className="filtro-contenedor">
        <label htmlFor="filtro-categoria">Filtro: </label>
          <select
          id="filtro-categoria"
          className="form-select filtro-select"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          >
          {categorias.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>  
      </div>


      <div className="products-grid">
        {visibles.map((p) => (
          <ProductCard
          key={p.id}
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