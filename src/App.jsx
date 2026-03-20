import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Storefront from './components/Storefront'
import AdminLayout from './components/AdminLayout'
import AdminProducts from './components/AdminProducts'
import AuthPage from './components/AuthPage'
import EmailConfirmationModal from './components/EmailConfirmationModal'
import './index.css'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <EmailConfirmationModal />
          <Routes>
            <Route path="/*" element={<Storefront />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminProducts />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
