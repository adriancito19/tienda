import React, { useState } from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import ProductSection from './ProductSection'
import CartDrawer from './CartDrawer'
import CheckoutModal from './CheckoutModal'

export default function Storefront() {
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    return (
        <div className="app-wrapper">
            <Navbar />
            <CartDrawer onCheckout={() => setIsCheckoutOpen(true)} />
            <main>
                <Hero />
                <ProductSection />
            </main>

            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
            />

            <footer style={{
                padding: '4rem 0',
                borderTop: '1px solid var(--border)',
                marginTop: '5rem',
                backgroundColor: '#fafafa'
            }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>ESENCIA</h2>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        &copy; {new Date().getFullYear()} Esencia Tienda. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
        </div>
    )
}
