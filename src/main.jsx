import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import './css/style.css'
import App from './App.jsx'
import { MensajeProvider } from './context/MensajeContext.jsx'
import { SesionProvider } from './context/SesionContext.jsx'
import { CarritoProvider } from './context/CarritoContext.jsx'
import { ProductosProvider } from './context/ProductosContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MensajeProvider>
        <SesionProvider>
          <CarritoProvider>
            <ProductosProvider>
              <App />
            </ProductosProvider>
          </CarritoProvider>
        </SesionProvider>
      </MensajeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
