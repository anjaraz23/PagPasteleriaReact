import { useMemo, useState } from 'react'
import { Modal } from 'react-bootstrap'
import blogs, { categorias } from '../data/blogs.js'
import { filtrarBlogs, formatoFecha } from '../utils/blogs.js'
import '../css/blog.css'

export default function Blog() {
  const [texto, setTexto] = useState('')
  const [categoria, setCategoria] = useState('Todas')
  const [post, setPost] = useState(null)
  const [mostrar, setMostrar] = useState(false)

  const visibles = useMemo(() => filtrarBlogs(blogs, { texto, categoria }), [texto, categoria])

  const abrir = (p) => {
    setPost(p)
    setMostrar(true)
  }

  const limpiar = () => {
    setTexto('')
    setCategoria('Todas')
  }

  return (
    <section id="blog" className="section active">
      <div className="container blog-container">
        <div className="section-header">
          <h2>Blog de Creamy</h2>
          <p>Consejos, guías y un poco de historia sobre lo que más nos gusta: la pastelería.</p>
        </div>

        <div className="blog-controles">
          <label htmlFor="blog-buscar" className="visually-hidden">Buscar artículos</label>
          <input
            id="blog-buscar"
            type="search"
            className="form-control blog-buscar"
            placeholder="Buscar por título o tema"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
          <div className="blog-filtros" role="group" aria-label="Filtrar por categoría">
            {['Todas', ...categorias].map((c) => (
              <button
                key={c}
                type="button"
                className={`btn btn-sm ${categoria === c ? 'btn-primary' : 'btn-outline-secondary'}`}
                aria-pressed={categoria === c}
                onClick={() => setCategoria(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <p className="blog-conteo" aria-live="polite">
          {visibles.length === 1 ? '1 artículo' : `${visibles.length} artículos`}
        </p>

        {visibles.length === 0 ? (
          <div className="blog-vacio">
            <p>No encontramos artículos con esa búsqueda.</p>
            <button type="button" className="btn btn-primary" onClick={limpiar}>
              Ver todos los artículos
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {visibles.map((p) => (
              <div key={p.id} className="col-12 col-md-6 col-lg-4">
                <article className="blog-card">
                  <img src={p.imagen} alt={p.alt} className="blog-card-img" loading="lazy" />
                  <div className="blog-card-body">
                    <span className="badge text-bg-secondary blog-categoria">{p.categoria}</span>
                    <h3>{p.titulo}</h3>
                    <p className="blog-meta">
                      {formatoFecha(p.fecha)}, {p.minutos} min de lectura
                    </p>
                    <p className="blog-resumen">{p.resumen}</p>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm mt-auto align-self-start"
                      onClick={() => abrir(p)}
                    >
                      Leer artículo
                    </button>
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal show={mostrar} onHide={() => setMostrar(false)} size="lg" centered scrollable>
        {post && (
          <>
            <Modal.Header closeButton>
              <Modal.Title as="h4">{post.titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="blog-lectura">
              <img src={post.imagen} alt={post.alt} className="blog-lectura-img" />
              <p className="blog-meta">
                Por {post.autor}, {formatoFecha(post.fecha)}, {post.minutos} min de lectura
              </p>
              {post.contenido.map((parrafo, i) => (
                <p key={i}>{parrafo}</p>
              ))}
            </Modal.Body>
          </>
        )}
      </Modal>
    </section>
  )
}
