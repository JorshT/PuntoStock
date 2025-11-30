// src/views/CreateOrderView.jsx
import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';

// 1. SIMULACIÓN DE BASE DE DATOS DE PRODUCTOS
const PRODUCTS_DB = [
  { id: 101, name: 'Mouse Óptico Inalámbrico', description: 'Caja x 10', price: 55.00 },
  { id: 102, name: 'Teclado Mecánico RGB', description: 'Unidad', price: 69.99 },
  { id: 103, name: 'Monitor 24" IPS', description: 'Unidad', price: 149.50 },
  { id: 104, name: 'Cable HDMI 2m', description: 'Bolsa', price: 5.90 },
  { id: 105, name: 'Disco SSD 1TB', description: 'Unidad', price: 89.00 },
  { id: 106, name: 'Silla Ergonómica Office', description: 'Unidad', price: 120.00 },
];

const CreateOrderView = () => {
  // --- ESTADOS ---
  const [items, setItems] = useState([]); // Productos en la tabla
  const [showModal, setShowModal] = useState(false); // Controla si se ve el modal
  
  // Estado para el formulario de "Agregar Producto"
  const [newProductSelection, setNewProductSelection] = useState({
    productId: '',
    quantity: 1
  });

  // Estado para datos de cabecera (Proveedor, Fechas)
  const [orderHeader, setOrderHeader] = useState({
    provider: '',
    dateCreated: '2025-10-29',
    dateDelivery: ''
  });

  // --- LÓGICA DE NEGOCIO ---

  // Calcular totales
  const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
  const tax = subtotal * 0.19; 
  const total = subtotal + tax;

  // Manejar cambios en cabecera
  const handleHeaderChange = (e) => {
    setOrderHeader({ ...orderHeader, [e.target.name]: e.target.value });
  };

  // Agregar producto a la lista
  const handleAddItem = () => {
    const { productId, quantity } = newProductSelection;
    
    // Validar
    if (!productId) return alert("Por favor selecciona un producto");
    if (quantity <= 0) return alert("La cantidad debe ser mayor a 0");

    // Buscar info completa del producto en la "DB"
    const productInfo = PRODUCTS_DB.find(p => p.id === parseInt(productId));

    // Crear objeto para la tabla
    const newItem = {
      id: Date.now(), // ID único temporal
      ...productInfo,
      quantity: parseInt(quantity)
    };

    setItems([...items, newItem]);
    setShowModal(false); // Cerrar modal
    setNewProductSelection({ productId: '', quantity: 1 }); // Resetear form
  };

  // Eliminar producto
  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // GUARDAR ORDEN (Simulación)
  const handleSaveOrder = () => {
    if (items.length === 0) return alert("No puedes guardar una orden vacía.");
    if (!orderHeader.provider) return alert("Debes seleccionar un proveedor.");

    const finalOrder = {
      ...orderHeader,
      items: items,
      totals: { subtotal, tax, total }
    };

    console.log("ORDEN GUARDADA EXITOSAMENTE:", finalOrder);
    alert("¡Orden creada!");
    // Aquí iría tu llamada al Backend: axios.post('/api/orders', finalOrder)
  };

  return (
    <MainLayout title="Crear Orden" activeSidebarItem="Crear Orden">
      
      {/* --- FORMULARIO DATOS GENERALES --- */}
      <div className="mb-5">
        <h5 className="fw-bold mb-3">Datos generales de la orden</h5>
        <div className="row g-4">
            <div className="col-md-6">
                <select 
                    className="form-select bg-secondary bg-opacity-10 border-0 py-3 fw-bold text-secondary"
                    name="provider"
                    onChange={handleHeaderChange}
                >
                    <option value="">Seleccionar proveedor</option>
                    <option value="Tecno Suministros S.A">Tecno Suministros S.A</option>
                    <option value="CompuWorld Ltda.">CompuWorld Ltda.</option>
                </select>
            </div>
            <div className="col-md-6">
                 <div className="form-floating">
                    <input 
                        type="date" 
                        className="form-control bg-secondary bg-opacity-25 border-0 fw-bold" 
                        name="dateCreated"
                        value={orderHeader.dateCreated}
                        onChange={handleHeaderChange}
                    />
                    <label className="text-muted fst-italic">Fecha de creación</label>
                 </div>
            </div>
            <div className="col-md-6">
                <input type="text" className="form-control bg-secondary bg-opacity-25 border-0 py-3 fw-bold text-secondary fst-italic" placeholder="Dirección de entrega (Predefinida)" readOnly />
            </div>
            <div className="col-md-6">
                <div className="form-floating">
                    <input 
                        type="date" 
                        className="form-control bg-secondary bg-opacity-25 border-0 fw-bold"
                        name="dateDelivery"
                        onChange={handleHeaderChange}
                    />
                    <label className="text-muted fst-italic">Fecha de entrega</label>
                </div>
            </div>
        </div>
      </div>

      {/* --- TABLA DE ITEMS --- */}
      <h5 className="fw-bold mb-3">Detalle de productos/items</h5>
      <div className="table-responsive shadow-sm border rounded mb-0">
        <table className="table table-hover align-middle mb-0">
          <thead className="text-white" style={{ backgroundColor: '#6c757d' }}>
            <tr>
              <th className="py-3 ps-4">Items</th>
              <th className="py-3">Descripción</th>
              <th className="py-3 text-center">Cant.</th>
              <th className="py-3 text-end">Precio Unit.</th>
              <th className="py-3 text-end">Total</th>
              <th className="py-3 text-center pe-4">Acción</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="bg-light border-bottom">
                <td className="py-3 ps-4 fw-bold">{item.name}</td>
                <td className="text-secondary">{item.description}</td>
                <td className="text-center">{item.quantity}</td>
                <td className="text-end">${item.price.toFixed(2)}</td>
                <td className="text-end fw-bold">${(item.quantity * item.price).toFixed(2)}</td>
                <td className="text-center pe-4">
                  <button onClick={() => handleDelete(item.id)} className="btn btn-danger btn-sm px-3 rounded-pill text-white fw-bold">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
                <tr><td colSpan="6" className="text-center py-4 text-muted fst-italic">La orden está vacía.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- FOOTER TOTALES Y BOTÓN AGREGAR --- */}
      <div className="bg-light bg-opacity-50 p-4 rounded-bottom border border-top-0 mb-5 d-flex justify-content-between align-items-center">
        <button 
            onClick={() => setShowModal(true)} 
            className="btn btn-primary fw-bold px-4 py-2 rounded-pill shadow-sm"
            style={{ backgroundColor: '#2d6cf6' }}
        >
            <i className="bi bi-plus-lg me-2"></i> Agregar producto
        </button>

        <div className="text-end">
            <div className="mb-1 text-muted fw-bold small">Subtotal: <span className="text-dark ms-2">${subtotal.toFixed(2)}</span></div>
            <div className="mb-2 text-muted small">IVA (19%): <span className="text-dark ms-2">${tax.toFixed(2)}</span></div>
            <div className="fs-4 fw-bolder text-dark border-top pt-2">TOTAL: <span className="ms-2">${total.toFixed(2)}</span></div>
        </div>
      </div>

      {/* --- BOTONES FINALES --- */}
      <div className="d-flex justify-content-end gap-3 mb-5">
            <button className="btn btn-secondary fw-bold px-4 py-2 rounded-pill text-white shadow-sm">Guardar Borrador</button>
            <button 
                onClick={handleSaveOrder}
                className="btn btn-info fw-bold px-4 py-2 rounded-pill text-white shadow-sm" 
                style={{backgroundColor: '#5bc0de'}}
            >
                Confirmar pedido
            </button>
      </div>

      {/* --- MODAL FLOTANTE (Manual, sin depender de JS de Bootstrap) --- */}
      {showModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
            <div className="bg-white rounded shadow-lg p-4 animate__animated animate__fadeInDown" style={{ width: '500px' }}>
                <h5 className="fw-bold mb-4">Seleccionar Producto</h5>
                
                <div className="mb-3">
                    <label className="form-label fw-bold small text-muted">Producto</label>
                    <select 
                        className="form-select"
                        value={newProductSelection.productId}
                        onChange={(e) => setNewProductSelection({...newProductSelection, productId: e.target.value})}
                    >
                        <option value="">-- Elige una opción --</option>
                        {PRODUCTS_DB.map(p => (
                            <option key={p.id} value={p.id}>{p.name} - ${p.price}</option>
                        ))}
                    </select>
                </div>
                
                <div className="mb-4">
                    <label className="form-label fw-bold small text-muted">Cantidad</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        min="1"
                        value={newProductSelection.quantity}
                        onChange={(e) => setNewProductSelection({...newProductSelection, quantity: e.target.value})}
                    />
                </div>

                <div className="d-flex justify-content-end gap-2">
                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                    <button className="btn btn-primary" onClick={handleAddItem} style={{backgroundColor: '#2d6cf6'}}>Agregar a la orden</button>
                </div>
            </div>
        </div>
      )}

    </MainLayout>
  );
};

export default CreateOrderView;