import { createContext, useContext, useState, useCallback, useRef } from 'react'
import { Modal, Button } from 'react-bootstrap'

// Reemplaza a mostrarModalMensaje / mostrarModalMensajeYLuego de script.js
const MensajeContext = createContext(null)

export function MensajeProvider({ children }) {
  const [modal, setModal] = useState({ show: false, mensaje: '', tipo: 'success', titulo: '' })
  const alCerrar = useRef(null)

  const mostrarMensaje = useCallback((mensaje, tipo = 'success', titulo = '', callback = null) => {
    alCerrar.current = callback
    setModal({ show: true, mensaje, tipo, titulo })
  }, [])

  const cerrar = () => setModal((m) => ({ ...m, show: false }))

  const handleExited = () => {
    const cb = alCerrar.current
    alCerrar.current = null
    if (cb) cb()
  }

  return (
    <MensajeContext.Provider value={{ mostrarMensaje }}>
      {children}
      <Modal show={modal.show} onHide={cerrar} onExited={handleExited} centered>
        <Modal.Header closeButton>
          <Modal.Title as="h5" className={modal.tipo === 'success' ? 'text-success' : 'text-danger'}>
            {modal.titulo || (modal.tipo === 'success' ? '¡Listo!' : 'Atención')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{modal.mensaje}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrar}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </MensajeContext.Provider>
  )
}

export const useMensaje = () => useContext(MensajeContext)
