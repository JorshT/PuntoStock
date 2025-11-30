// src/views/MyOrdersView.jsx
import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';

// 1. DATA SIMULADA (Ahora es un Array con items dentro)
const allOrders = [
  {
    id: 'NC-2025',
    supplier: 'Tecno Suministros S.A',
    createdDate: '2025-10-20',
    deliveryDate: '2025-10-25',
    address: 'Av. Siempre Viva 742',
    warehouse: 'Bodega Principal',
    status: 'En Proceso',
    items: [
      { id: 1, name: 'Tornillos M8', description: 'Caja', unit: 50, total: 223.00, status: 'Solicitado' },
      { id: 2, name: 'Cable RJ45', description: 'Unidad', unit: 20, total: 170.20, status: 'Cancelado' }
    ]
  },
  {
    id: 'NC-2026',
    supplier: 'CompuWorld Ltda.',
    createdDate: '2025-10-22',
    deliveryDate: '2025-10-30',
    address: 'Calle Falsa 123',
    warehouse: 'Sucursal Norte',
    status: 'Completado',
    items: [
      { id: 1, name: 'Monitor 24"', description: 'Unidad', unit: 5, total: 850.00, status: 'Recibido' },
      { id: 2, name: 'Mouse Pad', description: 'Pack 10', unit: 2, total: 50.00, status: 'Recibido' }
    ]
  },
  {
    id: 'NC-2027',
    supplier: 'Office Depot',
    createdDate: '2025-10-24',
    deliveryDate: 'Pendiente',
    address: 'Av. Siempre Viva 742',
    warehouse: 'Bodega Principal',
    status: 'Pendiente',
    items: [
      { id: 1, name: 'Silla Ergonómica', description: 'Unidad', unit: 10, total: 1200.00, status: 'Solicitado' }
    ]
  }
];

const MyOrdersView = () => {
  // 2. ESTADO: ¿Qué orden está seleccionada? (null = ninguna, muestra la lista)
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Helper para colores de estado
  const getStatusBadge = (status) => {
    switch(status) {
      case 'Completado': case 'Recibido': return 'bg-success';
      case 'Pendiente': case 'Solicitado': return 'bg-warning text-dark';
      case 'Cancelado': return 'bg-secondary';
      default: return 'bg-primary';
    }
  };

  // --- VISTA 1: TABLA MAESTRA (LISTA DE ÓRDENES) ---
  const renderOrderList = () => (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">Mis Órdenes de Compra</h4>
        <div className="input-group w-25">
             <input type="text" className="form-control form-control-sm" placeholder="Buscar orden..." />
             <button className="btn btn-outline-secondary btn-sm"><i className="bi bi-search"></i></button>
        </div>
      </div>

      <div className="table-responsive shadow-sm border rounded bg-white">
        <table className="table table-hover align-middle mb-0">
          <thead className="bg-light">
            <tr>
              <th className="py-3 ps-3">ID Orden</th>
              <th>Proveedor</th>
              <th>Fecha Creación</th>
              <th>Bodega</th>
              <th className="text-center">Estado</th>
              <th className="text-center">Acción</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order) => (
              <tr key={order.id}>
                <td className="ps-3 fw-bold text-primary">{order.id}</td>
                <td>{order.supplier}</td>
                <td className="text-muted small">{order.createdDate}</td>
                <td>{order.warehouse}</td>
                <td className="text-center">
                   <span className={`badge rounded-pill ${getStatusBadge(order.status)}`}>{order.status}</span>
                </td>
                <td className="text-center">
                  <button 
                    className="btn btn-sm btn-outline-primary rounded-pill px-3"
                    onClick={() => setSelectedOrder(order)} // <--- AQUÍ OCURRE LA MAGIA
                  >
                    Ver Detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  // --- VISTA 2: DETALLE DE LA ORDEN (TU CÓDIGO ANTERIOR ADAPTADO) ---
  const renderOrderDetail = () => (
    <div className="animate__animated animate__fadeIn"> {/* Animación simple opcional */}
      
      {/* Botón Volver */}
      <button 
        className="btn btn-link text-decoration-none fw-bold mb-3 ps-0" 
        onClick={() => setSelectedOrder(null)} // <--- RESETEA EL ESTADO PARA VOLVER
      >
        <i className="bi bi-arrow-left me-2"></i>Volver al listado
      </button>

      <div className="card border-0 shadow-sm mb-5">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
             <h5 className="fw-bold m-0">Detalle Orden: <span className="text-primary">{selectedOrder.id}</span></h5>
             <span className={`badge ${getStatusBadge(selectedOrder.status)} fs-6`}>{selectedOrder.status}</span>
          </div>
          
          <div className="row g-3">
            <div className="col-md-4">
              <label className="text-muted small fw-bold">Proveedor</label>
              <div className="p-2 bg-light rounded border text-dark"><i className="bi bi-building me-2 text-primary"></i>{selectedOrder.supplier}</div>
            </div>
            <div className="col-md-4">
              <label className="text-muted small fw-bold">Fecha Entrega</label>
              <div className="p-2 bg-light rounded border text-dark"><i className="bi bi-calendar-event me-2 text-primary"></i>{selectedOrder.deliveryDate}</div>
            </div>
             <div className="col-md-4">
              <label className="text-muted small fw-bold">Dirección</label>
              <div className="p-2 bg-light rounded border text-dark"><i className="bi bi-geo-alt me-2 text-danger"></i>{selectedOrder.address}</div>
            </div>
          </div>
        </div>
      </div>

      <h5 className="fw-bold mb-3">Productos solicitados</h5>
      <div className="table-responsive shadow-sm border rounded mb-5">
        <table className="table table-hover align-middle mb-0">
          <thead className="text-white" style={{ backgroundColor: '#6c757d' }}>
            <tr>
              <th className="py-3 ps-4">Item</th>
              <th className="py-3">Descripción</th>
              <th className="py-3 text-center">Cant.</th>
              <th className="py-3 text-end pe-4">Total</th>
              <th className="py-3 text-center">Estado Item</th>
            </tr>
          </thead>
          <tbody>
            {selectedOrder.items.map((item) => (
              <tr key={item.id} className="bg-light border-bottom">
                <td className="py-3 ps-4 fw-bold">{item.name}</td>
                <td className="text-secondary">{item.description}</td>
                <td className="text-center">{item.unit}</td>
                <td className="text-end pe-4 fw-bold">${item.total}</td>
                <td className="text-center"><span className={`badge rounded-pill ${getStatusBadge(item.status)}`}>{item.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <MainLayout title="Seguimiento de compras" activeSidebarItem="Mis Ordenes">
      {/* 3. RENDERIZADO CONDICIONAL: Si no hay orden seleccionada, muestra lista, sino muestra detalle */}
      {!selectedOrder ? renderOrderList() : renderOrderDetail()}
    </MainLayout>
  );
};

export default MyOrdersView;