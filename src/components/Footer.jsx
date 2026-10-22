// Reemplaza a components/footer.html (contenido provisional: reemplázalo por el original)
export default function Footer() {
  return (
    <footer>
      <div>
        <strong>Creamy - Pastelería Artesanal</strong>
        <p className="mb-0">Av. Dulzura 770, Providencia, Santiago</p>
      </div>
      <div className="footer-redes">
        <a className="cambio" href="mailto:contacto@creamy.com">contacto@creamy.com</a>
      </div>
      <div className="footer-elcopy">© {new Date().getFullYear()} Creamy. Todos los derechos reservados.</div>
    </footer>
  )
}
