import { Navigate, useNavigate } from 'react-router-dom'
import { useSesion } from '../context/SesionContext.jsx'
import AdminPanel from '../components/AdminPanel.jsx'

export default function Admin() {
  const { usuario, cerrarSesion } = useSesion()
  const navigate = useNavigate()

  const rol = (usuario?.role || usuario?.rol || '').toLowerCase()

  if (rol !== 'admin') {
    return <Navigate to={usuario ? '/' : '/login'} replace />
  }

  const salir = () => {
    navigate('/')
    cerrarSesion()
  }

  return <AdminPanel onSalir={salir} />
}