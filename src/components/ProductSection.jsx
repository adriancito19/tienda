import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import ProductGrid from './ProductGrid';

const ProductSection = () => {
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!supabase) {
                setLoading(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                if (data) {
                    const mappedProducts = data.map(p => ({
                        ...p,
                        image: p.image_url || p.image
                    }));
                    setProducts(mappedProducts);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Generar categorías dinámicas a partir de los productos
    const categories = ['Todos', ...new Set(products.map(p => p.category).filter(Boolean))];

    const filteredProducts = activeCategory === 'Todos'
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <section style={{ padding: '4rem 0', backgroundColor: 'var(--bg-primary)' }} className="product-section">
            <div className="container">
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '3rem',
                    textAlign: 'center'
                }}>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ fontSize: '2rem', marginBottom: '1.5rem', letterSpacing: '-0.5px' }}
                    >
                        Explora la Colección
                    </motion.h3>

                    {loading ? (
                        <div style={{ padding: '2rem', color: 'var(--text-secondary)' }}>Cargando catálogo...</div>
                    ) : (
                        <motion.div
                            className="filters-container"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            style={{
                                display: 'flex',
                                gap: '2.5rem',
                                borderBottom: '1px solid var(--border)',
                                paddingBottom: '1rem',
                                maxWidth: '100%',
                                justifyContent: 'center',
                                overflowX: 'auto'
                            }}
                        >
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    style={{
                                        textTransform: 'uppercase',
                                        fontSize: '0.8rem',
                                        letterSpacing: '2px',
                                        whiteSpace: 'nowrap',
                                        color: activeCategory === cat ? 'var(--text-primary)' : 'var(--text-secondary)',
                                        fontWeight: activeCategory === cat ? '600' : '400',
                                        position: 'relative',
                                        padding: '0.5rem 0',
                                        transition: 'color 0.3s ease'
                                    }}
                                >
                                    {cat}
                                    {activeCategory === cat && (
                                        <motion.div
                                            layoutId="activeFilter"
                                            style={{
                                                position: 'absolute',
                                                bottom: '-1px',
                                                left: 0,
                                                right: 0,
                                                height: '2px',
                                                backgroundColor: 'var(--accent)'
                                            }}
                                        />
                                    )}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        <ProductGrid products={filteredProducts} />
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default ProductSection;
