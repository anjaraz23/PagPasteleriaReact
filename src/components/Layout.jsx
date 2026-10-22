import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import CarritoOffcanvas from './CarritoOffcanvas.jsx'

export default function Layout() {
  const { pathname } = useLocation()

  // Al cambiar de página, volver arriba (antes lo hacía navigateTo en script.js)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CarritoOffcanvas />
    </>
  )
}
