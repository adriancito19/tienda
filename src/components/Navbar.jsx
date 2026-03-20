import React from 'react';
import { ShoppingBag, User, Search, LogOut, Settings } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { cartCount, openCart } = useCart();
    const { user, isAdmin, signOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h1 style={{ fontSize: '1.5rem', margin: 0, letterSpacing: '1px' }}>ESENCIA</h1>
                    </Link>
                    <div className="nav-links" style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        <a href="#" style={{ textTransform: 'uppercase', textDecoration: 'none', color: 'inherit' }}>Colección</a>
                        <a href="#" style={{ textTransform: 'uppercase', textDecoration: 'none', color: 'inherit' }}>Novedades</a>
                        <a href="#" style={{ textTransform: 'uppercase', textDecoration: 'none', color: 'inherit' }}>Nosotros</a>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <Search size={20} strokeWidth={1.5} color="var(--text-primary)" style={{ cursor: 'pointer' }} className="hide-mobile" />

                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            {isAdmin && (
                                <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#4f46e5', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500' }} title="Panel Admin">
                                    <Settings size={18} />
                                    <span className="hide-mobile">Admin</span>
                                </Link>
                            )}
                            <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-primary)', padding: 0, fontSize: '0.875rem', fontWeight: '500' }} title="Cerrar sesión">
                                <LogOut size={20} strokeWidth={1.5} />
                                <span className="hide-mobile">Cerrar sesión</span>
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" style={{ color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', fontWeight: '500' }} title="Iniciar sesión">
                            <User size={20} strokeWidth={1.5} />
                            <span className="hide-mobile">Iniciar sesión</span>
                        </Link>
                    )}

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
