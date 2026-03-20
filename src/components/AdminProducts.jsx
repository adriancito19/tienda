import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import ProductFormModal from './ProductFormModal';

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error("Error fetching products", error);
        else setProducts(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('¿Seguro que quieres eliminar este producto?')) return;

        // To handle image deletion from storage as well, we would need the path
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) {
            alert("Error eliminando: " + error.message);
            console.error("Error deleting", error);
        } else {
            fetchProducts();
        }
    };

    const openAddModal = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    return (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '0.5rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Productos</h2>
                <button
                    onClick={openAddModal}
                    style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', backgroundColor: '#000', color: '#fff', padding: '0.5rem 1rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontWeight: 500 }}
                >
                    <Plus size={20} />
                    Añadir Producto
                </button>
            </div>

            {loading ? (
                <p>Cargando productos...</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                                <th style={{ padding: '0.75rem 1rem', fontWeight: '600' }}>Imagen</th>
                                <th style={{ padding: '0.75rem 1rem', fontWeight: '600' }}>Nombre</th>
                                <th style={{ padding: '0.75rem 1rem', fontWeight: '600' }}>Precio</th>
                                <th style={{ padding: '0.75rem 1rem', fontWeight: '600' }}>Stock</th>
                                <th style={{ padding: '0.75rem 1rem', fontWeight: '600' }}>Categoría</th>
                                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', textAlign: 'right' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(p => (
                                <tr key={p.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '0.75rem 1rem' }}>
                                        {p.image_url ? (
                                            <img src={p.image_url} alt={p.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '0.25rem', border: '1px solid #e5e7eb' }} />
                                        ) : (
                                            <div style={{ width: '48px', height: '48px', backgroundColor: '#f3f4f6', borderRadius: '0.25rem', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: '10px' }}>Sin img</div>
                                        )}
                                    </td>
                                    <td style={{ padding: '0.75rem 1rem', fontWeight: '500' }}>{p.name}</td>
                                    <td style={{ padding: '0.75rem 1rem', color: '#4b5563' }}>${Number(p.price).toFixed(2)}</td>
                                    <td style={{ padding: '0.75rem 1rem', color: '#4b5563' }}>{p.stock}</td>
                                    <td style={{ padding: '0.75rem 1rem', color: '#4b5563' }}>{p.category}</td>
                                    <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                                        <button onClick={() => openEditModal(p)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3b82f6', marginRight: '1rem', padding: '0.25rem' }} title="Editar">
                                            <Edit2 size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: '0.25rem' }} title="Eliminar">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                                        No hay productos todavía. Haz clic en "Añadir Producto" para empezar.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {isModalOpen && (
                <ProductFormModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={fetchProducts}
                    product={editingProduct}
                />
            )}
        </div>
    );
}
