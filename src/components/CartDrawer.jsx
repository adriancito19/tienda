import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = ({ onCheckout }) => {
    const {
        cart,
        isOpen,
        closeCart,
        removeFromCart,
        updateQuantity,
        cartTotal
    } = useCart();

    const handleCheckoutClick = () => {
        closeCart();
        onCheckout();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="cart-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                    />

                    {/* Drawer */}
                    <motion.div
                        className="cart-drawer"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <div className="cart-header">
                            <h3>Tu Carrito</h3>
                            <button onClick={closeCart} className="close-cart-btn">
                                <X size={24} strokeWidth={1.5} />
                            </button>
                        </div>

                        <div className="cart-content">
                            {cart.length === 0 ? (
                                <div className="empty-cart">
                                    <ShoppingBag size={48} strokeWidth={1} color="var(--border)" />
                                    <p>Tu carrito está vacío</p>
                                    <button onClick={closeCart} className="continue-shopping">
                                        Explorar Colección
                                    </button>
                                </div>
                            ) : (
                                <div className="cart-items">
                                    {cart.map((item) => (
                                        <div key={item.id} className="cart-item">
                                            <div className="cart-item-image">
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                            <div className="cart-item-details">
                                                <div className="cart-item-row">
                                                    <h4>{item.name}</h4>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="remove-btn"
                                                    >
                                                        <Trash2 size={16} strokeWidth={1.5} />
                                                    </button>
                                                </div>
                                                <p className="cart-item-price">${item.price.toFixed(2)}</p>
                                                <div className="cart-item-controls">
                                                    <div className="quantity-selector">
                                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                            <Minus size={14} />
                                                        </button>
                                                        <span>{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                    <span className="item-subtotal">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="cart-footer">
                                <div className="cart-total-row">
                                    <span>Total</span>
                                    <span className="total-amount">${cartTotal.toFixed(2)}</span>
                                </div>
                                <p className="cart-disclaimer">Impuestos y envío calculados al finalizar la compra.</p>
                                <button
                                    className="checkout-btn"
                                    onClick={handleCheckoutClick}
                                >
                                    Finalizar Compra
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
