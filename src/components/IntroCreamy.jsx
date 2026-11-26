import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import '../css/intro.css'

// Se reinicia al recargar la página, pero no al volver a Inicio desde otra ruta
let yaMostrada = false

const LETRAS = 'Creamy'.split('')

export default function IntroCreamy() {
  const [visible, setVisible] = useState(
    () => !yaMostrada && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const raiz = useRef(null)

  useLayoutEffect(() => {
    if (!visible) return

    document.body.style.overflow = 'hidden'

    const ctx = gsap.context(() => {
      const contador = { valor: 0 }
      const numero = raiz.current.querySelector('.intro-numero')

      const tl = gsap.timeline({
        onComplete: () => {
          yaMostrada = true
          setVisible(false)
        }
      })

      tl
        // pequeños textos laterales
        .from('.intro-meta', { opacity: 0, y: 8, duration: 0.4, ease: 'power2.out' }, 0)

        // letras suben desde la máscara
        .from(
          '.intro-letra',
          { yPercent: 110, duration: 0.7, stagger: 0.05, ease: 'expo.out' },
          0.2
        )

        // línea de progreso + contador 0 → 100
        .to('.intro-linea-progreso', { scaleX: 1, duration: 1.1, ease: 'power2.inOut' }, 0.05)
        .to(
          contador,
          {
            valor: 100,
            duration: 1.1,
            ease: 'power2.inOut',
            onUpdate: () => {
              numero.textContent = String(Math.round(contador.valor)).padStart(3, '0')
            }
          },
          0.05
        )

        // las letras salen hacia arriba
        .to(
          '.intro-letra',
          { yPercent: -110, duration: 0.5, stagger: 0.035, ease: 'expo.in' },
          '+=0.3'
        )
        .to('.intro-meta, .intro-linea', { opacity: 0, duration: 0.3 }, '<')

        // la cortina se levanta y deja ver la página
        .to(
          raiz.current,
          { yPercent: -100, duration: 0.7, ease: 'expo.inOut' },
          '-=0.2'
        )
    }, raiz)

    return () => {
      ctx.revert()
      document.body.style.overflow = ''
    }
  }, [visible])

  if (!visible) return null

  return (
    <div className="intro-creamy" ref={raiz} aria-hidden="true">
      <span className="intro-meta intro-meta--izq">Creamy®</span>
      <span className="intro-meta intro-meta--der">
        <span className="intro-numero">000</span>
      </span>

      <div className="intro-texto">
        {LETRAS.map((l, i) => (
          <span className="intro-mascara" key={i}>
            <span
              className={`intro-letra${i === LETRAS.length - 1 ? ' intro-letra--y' : ''}`}
            >
              {l}
            </span>
          </span>
        ))}
      </div>

      <div className="intro-linea">
        <div className="intro-linea-progreso" />
      </div>
    </div>
  )
}