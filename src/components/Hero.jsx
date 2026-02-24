import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="container hero-grid">
                <motion.div
                    className="hero-image-container"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <div className="main-hero-image" />
                    <div className="secondary-image">
                        <div className="secondary-hero-image-inner" />
                    </div>
                </motion.div>

                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <div className="hero-text-card">
                        <span className="hero-subtitle">
                            Nueva Colección 2026
                        </span>
                        <h2 className="hero-title">
                            Donde la elegancia <br />
                            <span className="hero-title-italic">encuentra su esencia.</span>
                        </h2>
                        <p className="hero-description">
                            Curada con amor para la mujer moderna que valora la sofisticación y el bienestar.
                        </p>
                        <button className="hero-button">
                            Explorar Tienda
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
