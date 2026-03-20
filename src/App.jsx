import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Storefront from './components/Storefront'
import AdminLayout from './components/AdminLayout'
import AdminProducts from './components/AdminProducts'
import './index.css'

function App() {
  return (
    <CartProvider>
      <HashRouter>
        <Routes>
          <Route path="/*" element={<Storefront />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminProducts />} />
          </Route>
        </Routes>
      </HashRouter>
    </CartProvider>
  )
}

export default App
