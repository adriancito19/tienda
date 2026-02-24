import React from 'react'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductSection from './components/ProductSection'
import './index.css'

function App() {
  return (
    <CartProvider>
      <div className="app-wrapper">
        <Navbar />
        <main>
          <Hero />
          <ProductSection />
        </main>


        <footer style={{
          padding: '4rem 0',
          borderTop: '1px solid var(--border)',
          marginTop: '5rem',
          backgroundColor: '#fafafa'
        }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>ESENCIA</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              &copy; 2026 Esencia Tienda. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </div>
    </CartProvider>
  )
}

export default App
