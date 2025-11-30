// src/components/MainLayout.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MainLayout = ({ children, title, activeSidebarItem }) => {
  const location = useLocation();
  
  // 1. Detectar en qué módulo estamos
  const isSalesModule = location.pathname.includes('/ventas');

  // 2. Definir los menús de cada módulo
  const menuCompra = [
    { label: 'Inventario', path: '/inventario' },
    { label: 'Mis ordenes', path: '/ordenes' },
    { label: 'Crear orden', path: '/crear-orden' },
    { label: 'Proveedores', path: '/proveedores' },
  ];

  const menuVentas = [
    { label: 'Mis Ventas', path: '/ventas' },
    { label: 'Nueva Venta', path: '/generar-venta' },
    // Aquí podrías agregar: 'Clientes', 'Facturación', etc.
  ];

  // 3. Elegir qué menú mostrar según la URL
  const currentNavItems = isSalesModule ? menuVentas : menuCompra;

  // Estilos de botones superiores
  const activeBtnClass = "btn btn-info text-white fw-bold me-2 rounded-0";
  const inactiveBtnClass = "btn btn-link text-white text-decoration-none fw-bold me-2 opacity-75";

  return (
    <div className="d-flex flex-column vh-100">
      
      {/* --- TOP NAVBAR --- */}
      <header className="navbar navbar-expand-lg navbar-dark bg-primary px-4 py-2 d-flex justify-content-between align-items-center" style={{ backgroundColor: '#2d6cf6' }}>
        
        <div className="d-flex align-items-center text-white fw-bold fs-4">
          <i className="bi bi-vinyl-fill me-2"></i>
          PuntoStock
        </div>

        {/* --- NAVEGACIÓN ENTRE MÓDULOS --- */}
        <div className="d-flex">
            <Link 
                to="/inventario" 
                className={!isSalesModule ? activeBtnClass : inactiveBtnClass}
            >
                Módulo de compra
            </Link>

            <Link 
                to="/ventas" 
                className={isSalesModule ? activeBtnClass : inactiveBtnClass}
            >
                Módulo de ventas
            </Link>
        </div>

        {/* Usuario */}
        <div className="d-flex align-items-center text-white">
          <span className="me-2 fw-bold">Juan Pérez</span>
          <i className="bi bi-person-circle fs-2 me-4"></i>
          <div className="d-flex align-items-center cursor-pointer">
            <span className="fw-bold me-1">EXIT</span>
            <i className="bi bi-door-open-fill fs-2"></i>
          </div>
        </div>
      </header>

      {/* --- BODY --- */}
      <div className="d-flex flex-grow-1 overflow-hidden">
        
        {/* --- SIDEBAR DINÁMICA --- */}
        <aside className="bg-secondary bg-opacity-25 p-3 d-flex flex-column gap-3 border-end" style={{ width: '250px', minWidth: '250px' }}>
          
          {/* Mapeamos la lista que elegimos en el paso 3 */}
          {currentNavItems.map((item) => (
            <Link 
              key={item.label}
              to={item.path}
              className={`btn w-100 rounded-pill py-2 fw-bold text-white shadow-sm text-decoration-none ${activeSidebarItem === item.label ? 'btn-info' : 'btn-secondary'}`}
              style={{ textAlign: 'center' }}
            >
              {item.label}
            </Link>
          ))}
        </aside>

        {/* --- CONTENIDO --- */}
        <main className="flex-grow-1 p-5 overflow-auto bg-white">
          <h2 className="fw-bold mb-4">{title}</h2>
          {children}
        </main>

      </div>
    </div>
  );
};

export default MainLayout;