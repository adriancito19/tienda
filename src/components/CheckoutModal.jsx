import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabaseClient';
import { sendOrderEmails } from '../lib/emailService';

const CheckoutModal = ({ isOpen, onClose }) => {
    const { cart, cartTotal, clearCart } = useCart();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cart.length === 0) return;

        if (!supabase) {
            alert('La base de datos no está configurada. Por favor, configura tu archivo .env con las claves de Supabase.');
            return;
        }

        setIsSubmitting(true);
        try {
            // 1. Crear el Order en Supabase
            const { data: order, error: orderError } = await supabase
                .from('orders')
                .insert([{
                    customer_name: formData.name,
                    customer_email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    total: cartTotal
                }])
                .select()
                .single();

            if (orderError) throw orderError;

            // 2. Crear los Order Items
            const orderItems = cart.map(item => ({
                order_id: order.id,
                product_id: item.id,
                quantity: item.quantity,
                price: item.price
            }));

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItems);

            if (itemsError) throw itemsError;

            // 3. Enviar los correos (Cliente y Admin)
            await sendOrderEmails({
                ...formData,
                order_id: order.id.split('-')[0].toUpperCase(),
                total: cartTotal,
                items: cart
            });

            // 4. Éxito
            setIsSuccess(true);
            clearCart();
        } catch (error) {
            console.error('Error procesando el pedido:', error);
            alert('Hubo un error al procesar tu pedido. Por favor, inténtalo de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 3000,
                    padding: '1rem'
                }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            backdropFilter: 'blur(4px)'
                        }}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="checkout-modal-content"
                        style={{
                            backgroundColor: 'var(--bg-primary)',
                            padding: '2.5rem',
                            borderRadius: '4px',
                            width: '100%',
                            maxWight: '500px',
                            maxWidth: '500px',
                            position: 'relative',
                            zIndex: 3001,
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                        }}
                    >
                        {isSuccess ? (
                            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                <div style={{ marginBottom: '1.5rem', color: 'var(--success)' }}>
                                    <CheckCircle size={64} strokeWidth={1.5} style={{ margin: '0 auto' }} />
                                </div>
                                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>¡Pedido Confirmado!</h2>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                                    Gracias por tu compra, {formData.name}. Hemos enviado un correo con los detalles a {formData.email}.
                                </p>
                                <button
                                    onClick={onClose}
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        backgroundColor: 'var(--text-primary)',
                                        color: 'white',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px'
                                    }}
                                >
                                    Cerrar
                                </button>
                            </div>
                        ) : (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                    <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Finalizar Pago</h3>
                                    <button onClick={onClose} style={{ color: 'var(--text-secondary)' }}>
                                        <X size={24} strokeWidth={1.5} />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                            Nombre Completo
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', fontFamily: 'inherit' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                            Correo Electrónico
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', fontFamily: 'inherit' }}
                                        />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                                Teléfono
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                                style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', fontFamily: 'inherit' }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                            Dirección de Envío
                                        </label>
                                        <textarea
                                            name="address"
                                            required
                                            value={formData.address}
                                            onChange={handleChange}
                                            style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', fontFamily: 'inherit', minHeight: '80px' }}
                                        />
                                    </div>

                                    <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                            <span style={{ fontWeight: 600 }}>Total Anticipado</span>
                                            <span style={{ fontWeight: 600 }}>${cartTotal.toFixed(2)}</span>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            style={{
                                                width: '100%',
                                                padding: '1.25rem',
                                                backgroundColor: 'var(--text-primary)',
                                                color: 'white',
                                                fontWeight: 600,
                                                textTransform: 'uppercase',
                                                letterSpacing: '2px',
                                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                                opacity: isSubmitting ? 0.7 : 1
                                            }}
                                        >
                                            {isSubmitting ? 'Procesando...' : 'Confirmar Pedido'}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CheckoutModal;
