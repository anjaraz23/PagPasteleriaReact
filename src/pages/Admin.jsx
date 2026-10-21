import { Navigate, useNavigate } from 'react-router-dom'
import { useSesion } from '../context/SesionContext.jsx'
import AdminPanel from '../components/AdminPanel.jsx'

export default function Admin() {
  const { usuario, cerrarSesion } = useSesion()
  const navigate = useNavigate()

  // Sin sesión va al login; con sesión de cliente, al inicio
  if (usuario?.rol !== 'admin') {
    return <Navigate to={usuario ? '/' : '/login'} replace />
  }

  const salir = () => {
    navigate('/')
    cerrarSesion()
  }

  return <AdminPanel onSalir={salir} />
}