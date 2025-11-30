import React, { useState, useEffect } from 'react';
import MainLayout from '../components/MainLayout';

const CreateSaleView = () => {
  // --- 1. DATOS INICIALES (Simulando tu inventario) ---
  const initialInventory = [
    { id: 1, name: 'Mouse Óptico inalámbrico', price: 11.99, stock: 150 },
    { id: 2, name: 'Cable de Red RJ45 (5m)', price: 5.10, stock: 85 },
    { id: 3, name: 'Disco SSD (500 GB)', price: 79.99, stock: 24 },
    { id: 4, name: 'Teclado Mecánico RGB', price: 69.99, stock: 10 },
    { id: 5, name: 'Monitor 24" IPS', price: 149.50, stock: 5 },
  ];

  // --- 2. ESTADOS ---
  const [products, setProducts] = useState(initialInventory); // Catálogo con stock
  const [cart, setCart] = useState([]); // Carrito de compras
  const [searchTerm, setSearchTerm] = useState('');
  const [clientName, setClientName] = useState('');

  // --- 3. LÓGICA DE NEGOCIO ---

  // A) Agregar al carrito y DISMINUIR inventario visualmente
  const addToCart = (product) => {
    if (product.stock === 0) return alert("¡Sin stock disponible!");

    // 1. Descontar del inventario visual
    const updatedProducts = products.map(p => 
        p.id === product.id ? { ...p, stock: p.stock - 1 } : p
    );
    setProducts(updatedProducts);

    // 2. Agregar al carrito
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        // Si ya existe, sumamos cantidad
        const updatedCart = cart.map(item => 
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
    } else {
        // Si es nuevo, lo agregamos
        setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // B) Eliminar del carrito y DEVOLVER al inventario
  const removeFromCart = (itemToRemove) => {
    // 1. Devolver stock al inventario
    const updatedProducts = products.map(p => 
        p.id === itemToRemove.id ? { ...p, stock: p.stock + 1 } : p
    );
    setProducts(updatedProducts);

    // 2. Restar del carrito o eliminar si es el último
    if (itemToRemove.quantity > 1) {
        const updatedCart = cart.map(item => 
            item.id === itemToRemove.id ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCart(updatedCart);
    } else {
        setCart(cart.filter(item => item.id !== itemToRemove.id));
    }
  };

  // C) Cálculos finales
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // D) Procesar Venta
  const handleProcessSale = () => {
    if (cart.length === 0) return alert("El carrito está vacío");
    if (!clientName) return alert("Debes ingresar un nombre de cliente");

    const saleData = {
        id: Date.now(),
        client: clientName,
        items: cart,
        total: total,
        date: new Date().toLocaleDateString()
    };

    console.log("VENTA GENERADA Y STOCK ACTUALIZADO:", saleData);
    alert(`¡Venta procesada con éxito!\nTotal: $${total.toFixed(2)}\n(El stock se ha descontado en esta vista)`);
    
    // Resetear carrito, pero MANTENER el stock descontado en 'products'
    setCart([]);
    setClientName('');
  };

  // Filtrado para el buscador
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout title="Generar Nueva Venta" activeSidebarItem="Nueva Venta">
      
      <div className="row h-100">
        
        {/* --- COLUMNA IZQUIERDA: CATÁLOGO DE PRODUCTOS --- */}
        <div className="col-md-7 d-flex flex-column">
            
            {/* Buscador */}
            <div className="input-group mb-3 shadow-sm">
                <span className="input-group-text bg-white border-end-0"><i className="bi bi-search"></i></span>
                <input 
                    type="text" 
                    className="form-control border-start-0" 
                    placeholder="Buscar producto para vender..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Grid de Productos */}
            <div className="row g-3 overflow-auto" style={{ maxHeight: '70vh' }}>
                {filteredProducts.map(product => (
                    <div key={product.id} className="col-md-6 col-lg-4">
                        <div className={`card h-100 shadow-sm border-0 ${product.stock === 0 ? 'opacity-50' : ''}`}>
                            <div className="card-body d-flex flex-column justify-content-between text-center">
                                <div>
                                    <h6 className="fw-bold mb-1">{product.name}</h6>
                                    <div className="text-primary fw-bold fs-5 mb-2">${product.price}</div>
                                </div>
                                
                                <div>
                                    <div className={`badge mb-2 ${product.stock > 5 ? 'bg-success' : 'bg-danger'}`}>
                                        Stock: {product.stock} un.
                                    </div>
                                    <button 
                                        className="btn btn-outline-primary w-100 rounded-pill btn-sm fw-bold"
                                        disabled={product.stock === 0}
                                        onClick={() => addToCart(product)}
                                    >
                                        {product.stock === 0 ? 'Agotado' : '+ Agregar'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* --- COLUMNA DERECHA: TICKET / CARRITO --- */}
        <div className="col-md-5">
            <div className="card shadow border-0 h-100">
                <div className="card-header bg-primary text-white fw-bold py-3">
                    <i className="bi bi-cart4 me-2"></i> Detalle de Venta
                </div>
                <div className="card-body d-flex flex-column">
                    
                    {/* Datos Cliente */}
                    <div className="mb-3">
                        <label className="small text-muted fw-bold">Cliente</label>
                        <input 
                            type="text" 
                            className="form-control bg-light" 
                            placeholder="Nombre del cliente / Razón Social"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                        />
                    </div>

                    {/* Lista de Items */}
                    <div className="flex-grow-1 overflow-auto mb-3 border rounded p-2 bg-light">
                        {cart.length === 0 ? (
                            <div className="text-center text-muted mt-5 opacity-50">
                                <i className="bi bi-basket fs-1"></i>
                                <p>El carrito está vacío</p>
                            </div>
                        ) : (
                            <ul className="list-group list-group-flush">
                                {cart.map(item => (
                                    <li key={item.id} className="list-group-item bg-transparent d-flex justify-content-between align-items-center">
                                        <div>
                                            <div className="fw-bold small">{item.name}</div>
                                            <div className="small text-muted">${item.price} x {item.quantity}</div>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <span className="fw-bold me-3">${(item.price * item.quantity).toFixed(2)}</span>
                                            <button 
                                                className="btn btn-sm btn-danger rounded-circle" 
                                                onClick={() => removeFromCart(item)}
                                            >
                                                <i className="bi bi-dash"></i>
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Totales */}
                    <div className="border-top pt-3">
                        <div className="d-flex justify-content-between mb-1">
                            <span className="text-muted">Subtotal</span>
                            <span>${(total / 1.19).toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <span className="text-muted">IVA (19%)</span>
                            <span>${(total - (total / 1.19)).toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between fw-bold fs-4 text-dark mb-4">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <button 
                            className="btn btn-success w-100 py-3 fw-bold shadow rounded-pill" 
                            onClick={handleProcessSale}
                            disabled={cart.length === 0}
                        >
                            <i className="bi bi-cash-coin me-2"></i> Confirmar Venta
                        </button>
                    </div>

                </div>
            </div>
        </div>

      </div>
    </MainLayout>
  );
};

export default CreateSaleView;