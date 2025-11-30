// views/InventoryView.jsx
import React from 'react';
import MainLayout from '../components/MainLayout'; // Ajusta la ruta

const InventoryView = () => {
  
  // Datos simulados (Mock Data)
  const products = [
    { id: 1, name: 'Mouse Óptico inalámbrico', units: 150, cost: 5.5, price: 11.99 },
    { id: 2, name: 'Cable de Red RJ45 (5m)', units: 85, cost: 2.3, price: 5.1 },
    { id: 3, name: 'Disco SSD (500 GB)', units: 240, cost: 45, price: 79.99 },
    { id: 4, name: 'Cable HDMI', units: 60, cost: 3.25, price: 7.5 },
    { id: 5, name: 'Teclado Mecánico RGB', units: 110, cost: 38, price: 69.99 },
    { id: 6, name: 'Webcam HD 1080p', units: 24, cost: 13.75, price: 24.99 },
  ];

  return (
    <MainLayout title="Inventario" activeSidebarItem="Inventario">
      
      {/* Buscador */}
      <div className="input-group mb-5 shadow-sm" style={{ maxWidth: '600px' }}>
        <span className="input-group-text bg-light border-end-0">
          <i className="bi bi-search fs-4 text-secondary"></i>
        </span>
        <input 
          type="text" 
          className="form-control bg-light border-start-0 py-2" 
          placeholder="Buscar por nombre u OC" 
          style={{ fontStyle: 'italic' }}
        />
      </div>

      {/* Sección Detalle */}
      <h4 className="fw-bold mb-3">Detalle de productos/items</h4>

      {/* Tabla */}
      <div className="table-responsive shadow-sm border rounded">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-secondary text-white">
            <tr style={{ backgroundColor: '#6c757d' }}> {/* Color forzado para igualar imagen */}
              <th className="py-3 bg-secondary text-white fs-5">Nombre</th>
              <th className="py-3 bg-secondary text-white fs-5 text-center">Unidades</th>
              <th className="py-3 bg-secondary text-white fs-5">Costo</th>
              <th className="py-3 bg-secondary text-white fs-5">Precio venta</th>
              <th className="py-3 bg-secondary text-white fs-5 text-center">Acción</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="bg-light">
                <td className="py-3 bg-light fw-normal">{product.name}</td>
                <td className="py-3 bg-light text-center">{product.units}</td>
                <td className="py-3 bg-light">${product.cost}</td>
                <td className="py-3 bg-light">${product.price}</td>
                <td className="py-3 bg-light text-center">
                  <button className="btn btn-primary fw-bold px-4 rounded-pill" style={{backgroundColor: '#2d6cf6'}}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </MainLayout>
  );
};

export default InventoryView;