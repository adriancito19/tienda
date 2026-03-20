import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { X, Upload } from 'lucide-react';

export default function ProductFormModal({ isOpen, onClose, onSuccess, product }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: 'ropamujer'
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const isEditing = !!product;

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                description: product.description || '',
                price: product.price || '',
                stock: product.stock !== undefined ? product.stock : '0',
                category: product.category || 'ropamujer'
            });
            setPreviewUrl(product.image_url || '');
        }
    }, [product]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        try {
            let finalImageUrl = product?.image_url || '';

            if (imageFile) {
                // Subir a Supabase Storage
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('product-images')
                    .upload(filePath, imageFile);

                if (uploadError) {
                    throw new Error('Error subiendo la imagen: ' + uploadError.message);
                }

                const { data: publicData } = supabase.storage
                    .from('product-images')
                    .getPublicUrl(filePath);

                finalImageUrl = publicData.publicUrl;
            }

            const productData = {
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock, 10),
                category: formData.category,
                image_url: finalImageUrl
            };

            if (isEditing) {
                const { error } = await supabase
                    .from('products')
                    .update(productData)
                    .eq('id', product.id);

                if (error) throw new Error('Error actualizando producto: ' + error.message);
            } else {
                const { error } = await supabase
                    .from('products')
                    .insert([productData]);

                if (error) throw new Error('Error creando producto: ' + error.message);
            }

            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            setErrorMsg(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
            <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '0.75rem', width: '100%', maxWidth: '550px', maxHeight: '90vh', overflowY: 'auto', position: 'relative', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>
                <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: '0.25rem' }}>
                    <X size={24} />
                </button>

                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', marginTop: 0, color: '#111827' }}>
                    {isEditing ? 'Editar Producto' : 'Añadir Nuevo Producto'}
                </h2>

                {errorMsg && (
                    <div style={{ backgroundColor: '#fef2f2', color: '#b91c1c', padding: '1rem', borderRadius: '0.375rem', marginBottom: '1.5rem', border: '1px solid #f87171' }}>
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151', fontSize: '0.875rem' }}>Nombre del Producto</label>
                        <input required type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxSizing: 'border-box', outline: 'none', fontSize: '1rem' }} />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151', fontSize: '0.875rem' }}>Descripción</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows="3" style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxSizing: 'border-box', resize: 'vertical', outline: 'none', fontSize: '1rem' }} />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151', fontSize: '0.875rem' }}>Precio ($)</label>
                            <input required type="number" step="0.01" min="0" name="price" value={formData.price} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxSizing: 'border-box', outline: 'none', fontSize: '1rem' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151', fontSize: '0.875rem' }}>Stock Inicial</label>
                            <input required type="number" min="0" name="stock" value={formData.stock} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxSizing: 'border-box', outline: 'none', fontSize: '1rem' }} />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151', fontSize: '0.875rem' }}>Categoría</label>
                        <select name="category" value={formData.category} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxSizing: 'border-box', backgroundColor: '#fff', outline: 'none', fontSize: '1rem' }}>
                            <option value="ropamujer">Ropa de Mujer</option>
                            <option value="ropahombre">Ropa de Hombre</option>
                            <option value="accesorios">Accesorios</option>
                            <option value="infantil">Infantil</option>
                            <option value="vela">Velas / Aromaterapia</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151', fontSize: '0.875rem' }}>Imagen del Producto</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            {previewUrl ? (
                                <img src={previewUrl} alt="Preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }} />
                            ) : (
                                <div style={{ width: '80px', height: '80px', backgroundColor: '#f3f4f6', borderRadius: '0.5rem', border: '1px dashed #d1d5db', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
                                    <Upload size={24} />
                                </div>
                            )}
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#f9fafb', color: '#4b5563', borderRadius: '0.375rem', border: '1px solid #d1d5db', cursor: 'pointer', fontWeight: '500', transition: 'all 0.2s', fontSize: '0.875rem' }}>
                                    <Upload size={16} />
                                    <span>{imageFile ? imageFile.name : 'Seleccionar archivo...'}</span>
                                    <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                                </label>
                                <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#6b7280', margin: '0.5rem 0 0 0' }}>La imagen se subirá a Supabase Storage (bucket `product-images`).</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
                        <button type="button" onClick={onClose} disabled={loading} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#fff', color: '#4b5563', borderRadius: '0.375rem', border: '1px solid #d1d5db', cursor: 'pointer', fontWeight: '500', fontSize: '0.875rem' }}>
                            Cancelar
                        </button>
                        <button type="submit" disabled={loading} style={{ padding: '0.75rem 1.5rem', backgroundColor: loading ? '#4b5563' : '#000', color: '#fff', borderRadius: '0.375rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                            {loading ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Producto')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
