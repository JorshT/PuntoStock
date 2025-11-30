import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';

const MySalesView = () => {
  // 1. MOCK DATA (Datos copiados de tu imagen)
  const initialSales = [
    { id: 1, product: 'Mouse razer viper mini', client: 'Laura Gomez', clientId: '92123134' },
    { id: 2, product: 'Monitor MSI 200Hz', client: 'Juan Venegas', clientId: '912340521' },
    { id: 3, product: 'Cable de Red RJ45 (5m)', client: 'Sol Diaz', clientId: '9867821' },
    { id: 4, product: 'Tornillos M8 x 50mm', client: 'Carlos Ruiz', clientId: '995634121' },
    { id: 5, product: 'Cable HDMI', client: 'Pedro Urdemales', clientId: '993411221' },
  ];

  // 2. ESTADOS
  const [searchTerm, setSearchTerm] = useState('');
  const [sales] = useState(initialSales);

  // 3. LÓGICA DE FILTRADO
  const filteredSales = sales.filter(sale => 
    sale.product.toLowerCase().includes(searchTerm.toLowerCase()) || 
    sale.clientId.includes(searchTerm) ||
    sale.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Simulación de descarga
  const handleDownload = (id) => {
    alert(`Descargando comprobante de venta #${id}...`);
  };

  return (
    // Usamos el layout. Nota: activeSidebarItem lo dejamos genérico o vacío por ahora si no tienes menú de ventas definido
    <MainLayout title="Gestión de Ventas" activeSidebarItem="Mis Ventas">
      
      {/* Subtítulo */}
      <h4 className="fw-bold mb-3">Registro de ventas</h4>

      {/* --- BARRA DE BÚSQUEDA Y FILTRO --- */}
      <div className="d-flex align-items-center mb-4 gap-3">
        
        {/* Input Buscador (Estilo gris de la imagen) */}
        <div className="input-group shadow-sm" style={{ maxWidth: '600px' }}>
          <span className="input-group-text bg-secondary bg-opacity-25 border-end-0">
            <i className="bi bi-search text-secondary"></i>
          </span>
          <input 
            type="text" 
            className="form-control bg-secondary bg-opacity-25 border-start-0 fw-bold text-secondary fst-italic" 
            placeholder="Buscar por nombre de Producto o Cod cliente" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Botón Filtrar (Azul) */}
        <button 
            className="btn btn-primary fw-bold px-5 rounded-pill shadow-sm"
            style={{ backgroundColor: '#2d6cf6' }}
        >
            filtrar
        </button>
      </div>

      {/* --- TABLA DE VENTAS --- */}
      <div className="table-responsive shadow-sm border rounded mb-4">
        <table className="table table-hover align-middle mb-0">
          <thead className="text-white" style={{ backgroundColor: '#6c757d' }}> {/* Gris oscuro */}
            <tr>
              <th className="py-3 ps-4">Producto</th>
              <th className="py-3 text-center">nombre cliente</th>
              <th className="py-3 text-center">cod cliente</th>
              <th className="py-3 text-center text-muted opacity-50">&gt;&gt;</th> {/* Columna decorativa imagen */}
              <th className="py-3 text-center pe-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.length > 0 ? (
                filteredSales.map((item) => (
                <tr key={item.id} className="bg-light border-bottom">
                    {/* Producto */}
                    <td className="py-3 ps-4 text-dark fw-normal">
                        {item.product}
                    </td>
                    
                    {/* Cliente */}
                    <td className="py-3 text-center text-dark">
                        {item.client}
                    </td>

                    {/* Cod Cliente */}
                    <td className="py-3 text-center text-dark">
                        {item.clientId}
                    </td>

                    {/* Espacio vacío decorativo */}
                    <td></td>

                    {/* Botón Acción */}
                    <td className="text-center pe-4">
                        <button 
                            onClick={() => handleDownload(item.id)}
                            className="btn btn-primary btn-sm px-3 py-1 rounded-pill fw-bold" 
                            style={{ backgroundColor: '#2d6cf6', fontSize: '0.8rem' }}
                        >
                            Descargar<br/>comprobante
                        </button>
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="5" className="text-center py-4 text-muted fst-italic">
                        No se encontraron ventas con ese criterio.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- PAGINACIÓN (Pie de página gris) --- */}
      <div className="bg-secondary bg-opacity-25 p-3 rounded text-center fw-bold text-secondary shadow-sm user-select-none">
        <span style={{cursor: 'pointer'}} className="me-3">&lt;&lt; Anterior</span>
        <span className="text-dark mx-2">|</span>
        <span className="text-dark mx-1 fw-bolder">1</span>
        <span style={{cursor: 'pointer'}} className="mx-1">2</span>
        <span style={{cursor: 'pointer'}} className="mx-1">3</span>
        <span className="text-dark mx-2">|</span>
        <span style={{cursor: 'pointer'}} className="ms-3">Siguiente &gt;&gt;</span>
      </div>

    </MainLayout>
  );
};

export default MySalesView;