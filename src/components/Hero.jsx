import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f5f3ef',
            overflow: 'hidden',
            position: 'relative'
        }}>
            <div className="container hero-grid" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                alignItems: 'center',
                gap: '4rem'
            }}>
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <span style={{
                        textTransform: 'uppercase',
                        letterSpacing: '3px',
                        fontSize: '0.8rem',
                        color: 'var(--accent)',
                        display: 'block',
                        marginBottom: '1rem'
                    }}>
                        Nueva Colección 2026
                    </span>
                    <h2 className="hero-title" style={{ fontSize: '4rem', lineHeight: '1.1', marginBottom: '2rem' }}>
                        Donde la elegancia <br />
                        <span style={{ fontStyle: 'italic', fontWeight: '400' }}>encuentra su esencia.</span>
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '400px', fontSize: '1.1rem' }}>
                        Curada con amor para la mujer moderna que valora la sofisticación y el bienestar.
                    </p>
                    <button style={{
                        backgroundColor: 'var(--text-primary)',
                        color: 'white',
                        padding: '1rem 2.5rem',
                        fontSize: '0.9rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        transition: 'all 0.3s ease'
                    }}>
                        Explorar Tienda
                    </button>
                </motion.div>

                <motion.div
                    className="hero-image-container"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    style={{ position: 'relative', height: '100%', display: 'flex', justifyContent: 'flex-end' }}
                >
                    <div style={{
                        width: '100%',
                        height: '600px',
                        backgroundColor: '#e9e6e0',
                        backgroundImage: 'url("https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=2000&auto=format&fit=crop")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '2px'
                    }} />
                    <div className="secondary-image" style={{
                        position: 'absolute',
                        bottom: '-2rem',
                        left: '2rem',
                        width: '200px',
                        height: '250px',
                        backgroundColor: 'var(--bg-primary)',
                        padding: '1px',
                        boxShadow: '20px 20px 60px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            backgroundImage: 'url("https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=2000&auto=format&fit=crop")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }} />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
