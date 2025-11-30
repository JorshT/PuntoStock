// src/views/ProvidersView.jsx
import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';

const ProvidersView = () => {
  // --- 1. DATOS INICIALES ---
  const initialProviders = [
    { id: 1, name: 'Tecno Suministros S.A', contact: 'Laura Gomez', phone: '92123134' },
    { id: 2, name: 'Ferretería Central E.I.R.L', contact: 'Juan Venegas', phone: '912340521' },
    { id: 3, name: 'Importadora Sol S.A', contact: 'Sol Diaz', phone: '9867821' },
    { id: 4, name: 'Materiales El Constructor S.A.C', contact: 'Carlos Ruiz', phone: '995634121' },
    { id: 5, name: 'Pedro Urdemales E.I.R.L', contact: 'Pedro Urdemales', phone: '993411221' },
  ];

  // --- 2. ESTADOS ---
  const [providers, setProviders] = useState(initialProviders);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estados para el Modal y Formulario
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // ¿Estamos editando?
  const [formData, setFormData] = useState({ id: null, name: '', contact: '', phone: '' });

  // --- 3. LÓGICA CRUD ---

  // A) PREPARAR FORMULARIO (Resetear o Llenar)
  const openModal = (provider = null) => {
    if (provider) {
      // MODO EDICIÓN: Cargamos los datos del click
      setIsEditing(true);
      setFormData(provider);
    } else {
      // MODO CREAR: Limpiamos el form
      setIsEditing(false);
      setFormData({ id: null, name: '', contact: '', phone: '' });
    }
    setShowModal(true);
  };

  // B) GUARDAR (Crear o Actualizar)
  const handleSave = () => {
    // Validar campos vacíos
    if (!formData.name || !formData.contact) return alert("Completa los datos obligatorios");

    if (isEditing) {
      // ACTUALIZAR: Buscamos el ID y reemplazamos los datos
      const updatedList = providers.map(p => 
        p.id === formData.id ? formData : p
      );
      setProviders(updatedList);
    } else {
      // CREAR: Agregamos uno nuevo con ID temporal
      const newProvider = { ...formData, id: Date.now() };
      setProviders([...providers, newProvider]);
    }

    setShowModal(false); // Cerrar modal
  };

  // C) ELIMINAR
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este proveedor?")) {
      const filteredList = providers.filter(p => p.id !== id);
      setProviders(filteredList);
    }
  };

  // D) FILTRADO (Buscador)
  const filteredProviders = providers.filter(provider => 
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout title="Gestión de Proveedores" activeSidebarItem="Proveedores">

      {/* --- BARRA SUPERIOR --- */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div className="input-group shadow-sm" style={{ maxWidth: '500px' }}>
          <span className="input-group-text bg-secondary bg-opacity-25 border-end-0">
            <i className="bi bi-search text-secondary"></i>
          </span>
          <input 
            type="text" 
            className="form-control bg-secondary bg-opacity-25 border-start-0 fw-bold text-secondary" 
            placeholder="Buscar por nombre..." 
            style={{ fontStyle: 'italic' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button 
            className="btn btn-primary fw-bold px-4 py-2 rounded-pill shadow-sm"
            style={{ backgroundColor: '#2d6cf6' }}
            onClick={() => openModal(null)} // null = Modo Crear
        >
            <i className="bi bi-plus-lg me-2"></i> Agregar nuevo proveedor
        </button>
      </div>

      <h4 className="fw-bold mb-3">Listado de Proveedores</h4>

      {/* --- TABLA --- */}
      <div className="table-responsive shadow-sm border rounded mb-4">
        <table className="table table-hover align-middle mb-0">
          <thead className="text-white" style={{ backgroundColor: '#6c757d' }}>
            <tr>
              <th className="py-3 ps-4">Nombre</th>
              <th className="py-3">Contacto</th>
              <th className="py-3">Teléfono</th>
              <th className="py-3 text-center pe-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProviders.length > 0 ? (
                filteredProviders.map((item) => (
                <tr key={item.id} className="bg-light border-bottom">
                    <td className="py-3 ps-4 fw-bold text-dark">{item.name}</td>
                    <td className="text-secondary">{item.contact}</td>
                    <td className="text-secondary">{item.phone}</td>
                    <td className="text-center pe-4">
                      <div className="d-flex justify-content-center gap-2">
                        {/* Botón EDITAR */}
                        <button 
                            onClick={() => openModal(item)} // Pasamos el item entero
                            className="btn btn-primary btn-sm px-3 rounded-pill fw-bold" 
                            style={{ backgroundColor: '#2d6cf6' }}
                        >
                            Editar
                        </button>
                        {/* Botón ELIMINAR */}
                        <button 
                            onClick={() => handleDelete(item.id)}
                            className="btn btn-danger btn-sm px-2 rounded-circle"
                            title="Eliminar"
                        >
                            <i className="bi bi-trash-fill"></i>
                        </button>
                      </div>
                    </td>
                </tr>
                ))
            ) : (
                <tr><td colSpan="4" className="text-center py-4 text-muted">No se encontraron resultados.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- MODAL REUTILIZABLE (Crear/Editar) --- */}
      {showModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
            <div className="bg-white rounded shadow-lg p-4 animate__animated animate__fadeInDown" style={{ width: '450px' }}>
                <h5 className="fw-bold mb-4 text-primary">
                    {isEditing ? 'Editar Proveedor' : 'Nuevo Proveedor'}
                </h5>
                
                <div className="mb-3">
                    <label className="form-label fw-bold small text-muted">Nombre Empresa</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    />
                </div>
                
                <div className="mb-3">
                    <label className="form-label fw-bold small text-muted">Nombre Contacto</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={formData.contact} 
                        onChange={(e) => setFormData({...formData, contact: e.target.value})} 
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label fw-bold small text-muted">Teléfono</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={formData.phone} 
                        onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                    />
                </div>

                <div className="d-flex justify-content-end gap-2">
                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                    <button className="btn btn-primary" onClick={handleSave} style={{backgroundColor: '#2d6cf6'}}>
                        {isEditing ? 'Actualizar' : 'Guardar'}
                    </button>
                </div>
            </div>
        </div>
      )}

    </MainLayout>
  );
};

export default ProvidersView;