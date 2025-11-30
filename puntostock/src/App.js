import logo from './logo.svg';
import './App.css';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import MainLayout from './components/MainLayout';
// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importas tus vistas aquí
import InventoryView from './views/InventoryView';
import ProvidersView from './views/ProvidersView';
import MyOrdersView from './views/MyOrdersView';
import CreateOrderView from './views/CreateOrderView';
import MisVentas from './views/MisVentas';
import CreateSaleView from './views/CreateSaleView';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta por defecto redirige a inventario */}
        <Route path="/" element={<Navigate to="/inventario" replace />} />
        
        {/* Tus rutas definidas */}
        <Route path="/inventario" element={<InventoryView />} />
        <Route path="/proveedores" element={<ProvidersView />} />
        <Route path="/ordenes" element={<MyOrdersView />} />
        <Route path="/crear-orden" element={<CreateOrderView />} />
        <Route path="/ventas" element={<MisVentas />} />
        <Route path="/generar-venta" element={<CreateSaleView />} />
        
        {/* Aquí agregarías las otras rutas: /ordenes, /crear-orden, etc. */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;