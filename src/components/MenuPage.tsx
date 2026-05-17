import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Minus, ShoppingCart, Trash2, Hash, Clock, ChefHat, BellRing, CheckCircle, MessageCircle } from 'lucide-react';
import { getRestaurantData } from '../data/mockData';
import './MenuPage.css';

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export const MenuPage = ({ scanMode }: { scanMode: boolean }) => {
  const { categories, items, settings } = getRestaurantData();
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id);
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [note, setNote] = useState('');
  
  // Scan mode states
  const [tableNumber, setTableNumber] = useState<string | null>(null);
  const [showTableModal, setShowTableModal] = useState(false);
  const [tempTableInput, setTempTableInput] = useState('');
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);
  const [orderStatus, setOrderStatus] = useState<string | null>(null);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) {}
    }

    if (scanMode) {
      const savedTable = localStorage.getItem('tableNumber');
      if (savedTable) {
        setTableNumber(savedTable);
      } else {
        setShowTableModal(true);
      }
      
      const lastId = localStorage.getItem('legrm_last_order_id');
      if (lastId) {
        setLastOrderId(lastId);
        pollOrderStatus();
      }
      
      const handleStorage = () => pollOrderStatus();
      window.addEventListener('storage', handleStorage);
      const interval = setInterval(pollOrderStatus, 3000);
      
      return () => {
        window.removeEventListener('storage', handleStorage);
        clearInterval(interval);
      };
    }
  }, [scanMode]);

  const pollOrderStatus = () => {
    const lastId = localStorage.getItem('legrm_last_order_id');
    if (!lastId) return;
    setLastOrderId(lastId);
    
    const ordersStr = localStorage.getItem('legrm_orders');
    if (ordersStr) {
      try {
        const orders = JSON.parse(ordersStr);
        const order = orders.find((o: any) => o.id === lastId);
        if (order) {
          setOrderStatus(order.status);
        }
      } catch (e) {}
    }
  };

  const handleTableConfirm = () => {
    if (tempTableInput.trim()) {
      localStorage.setItem('tableNumber', tempTableInput.trim());
      setTableNumber(tempTableInput.trim());
      setShowTableModal(false);
    }
  };

  const updateCart = (item: any, delta: number) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      let nextCart;
      if (existing) {
        const nextQty = existing.quantity + delta;
        if (nextQty <= 0) {
          nextCart = prev.filter(i => i.id !== item.id);
        } else {
          nextCart = prev.map(i => i.id === item.id ? { ...i, quantity: nextQty } : i);
        }
      } else if (delta > 0) {
        nextCart = [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
      } else {
        nextCart = prev;
      }
      localStorage.setItem('cart', JSON.stringify(nextCart));
      return nextCart;
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const nextCart = prev.filter(i => i.id !== id);
      localStorage.setItem('cart', JSON.stringify(nextCart));
      return nextCart;
    });
  };

  const cartTotal = useMemo(() => cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0), [cart]);
  const cartItemCount = useMemo(() => cart.reduce((acc, curr) => acc + curr.quantity, 0), [cart]);

  const handleCheckout = () => {
    const itemsText = cart.map(i => `${i.quantity}x ${i.name} - ${i.price * i.quantity} FCFA`).join('\n');
    let message = '';
    
    if (scanMode) {
      const orderId = "order_" + Date.now();
      const newOrder = {
        id: orderId,
        tableNumber: tableNumber,
        items: cart,
        note: note,
        total: cartTotal,
        status: "pending",
        timestamp: Date.now(),
        statusUpdatedAt: Date.now()
      };
      
      const existingOrdersStr = localStorage.getItem('legrm_orders');
      let existingOrders = [];
      if (existingOrdersStr) {
        try { existingOrders = JSON.parse(existingOrdersStr); } catch (e) {}
      }
      localStorage.setItem('legrm_orders', JSON.stringify([...existingOrders, newOrder]));
      localStorage.setItem('legrm_last_order_id', orderId);
      setLastOrderId(orderId);
      setOrderStatus('pending');
      
      message = `Commande — Table ${tableNumber} :\n${itemsText}\n\nTotal : ${cartTotal} FCFA`;
      if (note) message += `\nNote : ${note}`;
    } else {
      message = `Commande :\n${itemsText}\n\nTotal : ${cartTotal} FCFA`;
    }
    
    setCart([]);
    localStorage.removeItem('cart');
    setIsCartOpen(false);
    window.open(`https://wa.me/${settings.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleNewOrder = () => {
    localStorage.removeItem('legrm_last_order_id');
    setLastOrderId(null);
    setOrderStatus(null);
  };

  const scrollToCategory = (catId: string) => {
    setActiveCategory(catId);
    const el = document.getElementById(`cat-${catId}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 140; // offset for navs
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className={`menu-wrapper ${scanMode ? 'scan-mode' : ''}`}>
      {showTableModal && (
        <div className="table-modal-overlay">
          <div className="table-modal">
            <Hash size={40} className="modal-icon" />
            <h2 className="modal-title">Votre numéro de table ?</h2>
            <p className="modal-subtitle">Entrez le numéro inscrit sur votre table</p>
            <input 
              type="number" 
              min="1" 
              className="modal-input" 
              placeholder="ex : 12" 
              value={tempTableInput}
              onChange={e => setTempTableInput(e.target.value)}
            />
            <button className="modal-btn" onClick={handleTableConfirm}>CONFIRMER</button>
          </div>
        </div>
      )}

      <div className="category-nav">
        {categories.map(cat => (
          <button 
            key={cat.id} 
            className={`cat-pill ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => scrollToCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="menu-content">
        {scanMode && lastOrderId && orderStatus && (
          <div className="order-status-block">
            {orderStatus === 'pending' && <><Clock size={20} className="status-icon pending" /> <span className="status-text pending">En attente de la cuisine...</span></>}
            {orderStatus === 'preparing' && <><ChefHat size={20} className="status-icon preparing" /> <span className="status-text preparing">En préparation en ce moment...</span></>}
            {orderStatus === 'ready' && <><BellRing size={20} className="status-icon ready animate-pulse" /> <span className="status-text ready">Votre commande est prête !</span></>}
            {orderStatus === 'served' && (
              <>
                <CheckCircle size={20} className="status-icon served" /> 
                <span className="status-text served" style={{flex: 1}}>Commande servie — Bon appétit !</span>
                <button className="btn-new-order" onClick={handleNewOrder}>Nouvelle commande</button>
              </>
            )}
          </div>
        )}

        {categories.map(cat => {
          const catItems = items.filter(i => i.categoryId === cat.id && i.available);
          if (catItems.length === 0) return null;
          
          return (
            <div key={cat.id} id={`cat-${cat.id}`} className="menu-category-section">
              <h2 className="cat-title">{cat.name}</h2>
              <div className="menu-grid">
                {catItems.map(item => {
                  const cartItem = cart.find(i => i.id === item.id);
                  const qty = cartItem ? cartItem.quantity : 0;
                  
                  return (
                    <div className="menu-item-card" key={item.id}>
                      <img src={item.image} alt={item.name} className="item-img img-treatment" />
                      <div className="item-details">
                        <div className="item-header">
                          <h3 className="item-name">{item.name}</h3>
                        </div>
                        <p className="item-desc">{item.description}</p>
                        <div className="item-footer">
                          <div className="item-price">{item.price} FCFA</div>
                          {qty > 0 ? (
                            <div className="qty-controls">
                              <button onClick={() => updateCart(item, -1)}><Minus size={16} /></button>
                              <span>{qty}</span>
                              <button onClick={() => updateCart(item, 1)}><Plus size={16} /></button>
                            </div>
                          ) : (
                            <button className="btn-add" onClick={() => updateCart(item, 1)}>
                              <Plus size={18} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {cartItemCount > 0 && (
        <button className="cart-fab" onClick={() => setIsCartOpen(true)}>
          <ShoppingCart size={24} />
          <span className="cart-badge">{cartItemCount}</span>
        </button>
      )}

      {isCartOpen && (
        <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-drawer" onClick={e => e.stopPropagation()}>
            <div className="cart-header">
              <h2 className="cart-title">Votre commande</h2>
            </div>
            
            {cart.length === 0 ? (
              <div className="cart-empty">
                <ShoppingCart size={48} className="empty-icon" />
                <p>Votre panier est vide</p>
              </div>
            ) : (
              <div className="cart-body">
                <div className="cart-items">
                  {cart.map(item => (
                    <div className="cart-item" key={item.id}>
                      <div className="cart-item-info">
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-price">{item.price} FCFA</div>
                      </div>
                      <div className="cart-item-actions">
                        <div className="qty-controls">
                          <button onClick={() => updateCart(item, -1)}><Minus size={14} /></button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateCart(item, 1)}><Plus size={14} /></button>
                        </div>
                        <button className="btn-remove" onClick={() => removeFromCart(item.id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="cart-footer">
                  <div className="cart-total-row">
                    <span>Total</span>
                    <span className="total-amount">{cartTotal} FCFA</span>
                  </div>
                  
                  <textarea 
                    className="cart-note" 
                    placeholder="Note pour la cuisine..." 
                    value={note}
                    onChange={e => setNote(e.target.value)}
                  />
                  
                  <button className="btn-checkout" onClick={handleCheckout}>
                    <MessageCircle size={20} />
                    <span>ENVOYER LA COMMANDE</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
