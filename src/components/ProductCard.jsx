import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                cursor: 'pointer',
                position: 'relative',
                group: 'true' // Logical group for hover effects
            }}
        >
            <div style={{
                aspectRatio: '3/4',
                backgroundColor: '#f0f0f0',
                overflow: 'hidden',
                position: 'relative'
            }}>
                <motion.img
                    src={product.image}
                    alt={product.name}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                    }}
                    style={{
                        position: 'absolute',
                        bottom: '1rem',
                        right: '1rem',
                        backgroundColor: 'white',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        opacity: 0.9,
                        transition: 'all 0.3s ease'
                    }}
                >
                    <Plus size={20} color="var(--text-primary)" />
                </button>
            </div>

            <div>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.25rem', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
                    {product.name}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    ${product.price.toFixed(2)}
                </p>
            </div>
        </motion.div>
    );
};

export default ProductCard;
