import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'
import { useCarrito } from '../context/CarritoContext.jsx'
import { useSesion } from '../context/SesionContext.jsx'
import '../css/inicio.css'

const enlaces = [
  { to: '/', label: 'Inicio' },
  { to: '/productos', label: 'Productos' },
  { to: '/reservas', label: 'Encargos' },
  { to: '/blog', label: 'Blog' },
  { to: '/contacto', label: 'Contacto' }
]

export default function Header() {
  const { totalItems, setAbierto } = useCarrito()
  const { usuario, cerrarSesion } = useSesion()
  const navigate = useNavigate()

  const salir = () => {
    cerrarSesion()
    navigate('/')
  }

  const inicial = (usuario?.nombre || '?').trim().charAt(0).toUpperCase()

  return (
    <header>
      <div className="nav-container">
        <Link to="/" className="logo">
          Cream<span>y</span>
        </Link>

        <ul className="nav-links">
          {enlaces.map((e) => (
            <li key={e.to}>
              <NavLink to={e.to} end className={({ isActive }) => (isActive ? 'active' : '')}>
                {e.label}
              </NavLink>
            </li>
          ))}

          <li>
            <button className="btn-carrito" type="button" onClick={() => setAbierto(true)} aria-label="Abrir carrito">
              🛒
              {totalItems > 0 && <span className="carrito-badge">{totalItems}</span>}
            </button>
          </li>

          <li>
            {usuario ? (
              <Dropdown align="end">
                <Dropdown.Toggle as="button" bsPrefix="user-circle" id="user-circle" title={usuario.nombre}>
                  {inicial}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {usuario.rol === 'admin' && (
                  <Dropdown.Item as={Link} to="/admin">
                    Panel de administración
                  </Dropdown.Item>
                  )}
                  <Dropdown.ItemText>{usuario.nombre}</Dropdown.ItemText>
                  <Dropdown.Divider />
                  {usuario.rol !== 'admin' && (
                  <Dropdown.Item as={Link} to="/mis-compras">
                  Mis compras
                  </Dropdown.Item>
                  )}
                  <Dropdown.Item as="button" type="button" onClick={salir}>
                    Cerrar sesión
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div className= "auth-botones">
                <Link className="btn-login" to="/login">
                  Ingresar
                </Link>
                <Link className='btn-registrarse' to="/registro">
                  Registrarse
                </Link>
              </div>  
            )}
          </li>
        </ul>
      </div>
    </header>
  )
}
