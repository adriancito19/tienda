import React from 'react';
import { ShoppingBag, User, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { cartCount, openCart } = useCart();

    return (
        <nav className="navbar">
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <h1 style={{ fontSize: '1.5rem', margin: 0, letterSpacing: '1px' }}>ESENCIA</h1>
                    <div className="nav-links" style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        <a href="#" style={{ textTransform: 'uppercase' }}>Colección</a>
                        <a href="#" style={{ textTransform: 'uppercase' }}>Novedades</a>
                        <a href="#" style={{ textTransform: 'uppercase' }}>Nosotros</a>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <Search size={20} strokeWidth={1.5} color="var(--text-primary)" style={{ cursor: 'pointer' }} className="hide-mobile" />
                    <User size={20} strokeWidth={1.5} color="var(--text-primary)" style={{ cursor: 'pointer' }} />
                    <div
                        style={{ position: 'relative', cursor: 'pointer' }}
                        onClick={openCart}
                    >
                        <ShoppingBag size={20} strokeWidth={1.5} color="var(--text-primary)" />
                        {cartCount > 0 && (
                            <span className="cart-badge">
                                {cartCount}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
