import { Modal } from 'react-bootstrap'
import { formatoCLP } from '../context/CarritoContext.jsx'

export default function ProductoModal({ producto, onCerrar, onAgregar }) {
  return (
    <Modal show={!!producto} onHide={onCerrar} centered size="lg">
      {producto && (
        <>
          <Modal.Header closeButton>
            <Modal.Title as="h4">{producto.nombre}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row g-3 align-items-center">
              <div className="col-md-6">
                <img
                  src={producto.imagen}
                  alt={producto.alt}
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-md-6">
                <p className=" modal-letra-descripcion">{producto.descripcion}</p>
                <p className="modal-letra-detalle">{producto.detalle}</p>
                <p className="price">{formatoCLP(producto.precio)}</p>
                <button
                  className="btn btn-primary full-width"
                  onClick={() => {
                    onAgregar(producto)
                    onCerrar()
                  }}
                >
                  Añadir al carrito
                </button>
              </div>
            </div>
          </Modal.Body>
        </>
      )}
    </Modal>
  )
}