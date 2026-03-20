import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function EmailConfirmationModal() {
    const [show, setShow] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Detectamos si la URL contiene los parámetros que añade Supabase al confirmar un correo.
        // PKCE Flow añade ?code=...
        // Implicit Flow añade #access_token=...&type=signup
        const hasCode = new URLSearchParams(window.location.search).has('code');
        const isSignupImplicit = window.location.hash.includes('type=signup') || window.location.hash.includes('access_token=');
        const hasError = window.location.hash.includes('error=') || window.location.search.includes('error=');

        if (!hasError && (hasCode || isSignupImplicit)) {
            setShow(true);

            // Opcional: Limpiar la URL después de unos segundos para que no vuelva a 
            // salir el modal si el usuario refresca la página.
            setTimeout(() => {
                window.history.replaceState({}, document.title, window.location.pathname);
            }, 2000);
        }
    }, [location]);

    if (!show) return null;

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem', animation: 'fadeIn 0.3s ease-out' }}>
            <div style={{ backgroundColor: '#fff', padding: '2.5rem 2rem', borderRadius: '1rem', width: '100%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', transform: 'translateY(0)' }}>
                <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto 1.5rem' }} strokeWidth={1.5} />

                <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#111827', marginTop: 0 }}>
                    ¡Correo Confirmado!
                </h2>

                <p style={{ color: '#4b5563', marginBottom: '2rem', fontSize: '1rem', lineHeight: 1.5 }}>
                    Tu cuenta ha sido verificada exitosamente. Ya puedes acceder a todas las funciones de tu cuenta.
                </p>

                <button
                    onClick={() => setShow(false)}
                    style={{ width: '100%', padding: '0.875rem', backgroundColor: '#000', color: '#fff', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: '500', fontSize: '1rem', transition: 'background-color 0.2s' }}
                >
                    Continuar
                </button>
            </div>
        </div>
    );
}
