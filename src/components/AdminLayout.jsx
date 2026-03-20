import React from 'react';
import { Outlet, Link, Navigate } from 'react-router-dom';
import { Package, Store } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
    const { user, isAdmin, loading } = useAuth();

    if (loading) {
        return <div style={{ display: 'flex', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>Cargando permisos...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6', padding: '2rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>Acceso Denegado</h2>
                <p style={{ color: '#4b5563', marginBottom: '2rem' }}>No tienes permisos de administrador para ver esta página.</p>
                <Link to="/" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#000', color: '#fff', borderRadius: '0.375rem', textDecoration: 'none', fontWeight: '500' }}>
                    Volver a la tienda
                </Link>
            </div>
        );
    }

    return (
        <div className="admin-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f3f4f6' }}>
            <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Package size={28} />
                    <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>Panel de Administración</h1>
                </div>
                <nav style={{ display: 'flex', gap: '1.5rem' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4b5563', textDecoration: 'none', fontWeight: '500' }}>
                        <Store size={20} />
                        <span>Volver a la tienda</span>
                    </Link>
                </nav>
            </header>
            <main style={{ flex: 1, padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                <Outlet />
            </main>
        </div>
    );
}
