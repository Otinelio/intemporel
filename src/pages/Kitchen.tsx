import React, { useState, useEffect } from 'react';
import { LogOut, Archive, Clock, Flame, BellRing, CheckCircle, AlertCircle } from 'lucide-react';
import './Kitchen.css';

const CUISINE_PASSWORD = "cuisine2025";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  tableNumber: string;
  items: OrderItem[];
  note: string;
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'served';
  timestamp: number;
  statusUpdatedAt: number;
};

const Kitchen = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // To keep track of newly arrived orders for sound notification
  const [knownOrderIds, setKnownOrderIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (localStorage.getItem('cuisineAuth') === 'true') {
      setIsAuthenticated(true);
      loadOrders();
    }
    
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000);
    const pollInterval = setInterval(() => {
      if (localStorage.getItem('cuisineAuth') === 'true') {
        loadOrders();
      }
    }, 3000);
    
    const handleStorage = () => {
      if (localStorage.getItem('cuisineAuth') === 'true') loadOrders();
    };
    window.addEventListener('storage', handleStorage);
    
    return () => {
      clearInterval(timeInterval);
      clearInterval(pollInterval);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const playNotificationSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const playTone = (freq: number, startTime: number, duration: number) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.1, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };
      
      playTone(880, audioCtx.currentTime, 0.2);
      playTone(1100, audioCtx.currentTime + 0.2, 0.4);
    } catch (e) {
      console.error("Audio playback failed", e);
    }
  };

  const loadOrders = () => {
    const ordersStr = localStorage.getItem('legrm_orders');
    if (ordersStr) {
      try {
        const parsedOrders: Order[] = JSON.parse(ordersStr);
        setOrders(parsedOrders);
        
        // Check for new pending orders
        const currentPendingIds = parsedOrders.filter(o => o.status === 'pending').map(o => o.id);
        setKnownOrderIds(prev => {
          let hasNew = false;
          currentPendingIds.forEach(id => {
            if (!prev.has(id)) hasNew = true;
          });
          if (hasNew) playNotificationSound();
          return new Set(currentPendingIds);
        });
        
      } catch (e) {}
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    const newOrders = orders.map(o => {
      if (o.id === orderId) {
        return { ...o, status: newStatus, statusUpdatedAt: Date.now() };
      }
      return o;
    });
    setOrders(newOrders);
    localStorage.setItem('legrm_orders', JSON.stringify(newOrders));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CUISINE_PASSWORD) {
      localStorage.setItem('cuisineAuth', 'true');
      setIsAuthenticated(true);
      loadOrders();
    } else {
      alert("Mot de passe incorrect");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('cuisineAuth');
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleArchive = () => {
    if (window.confirm("Archiver les commandes servies depuis plus de 2h ?")) {
      const now = Date.now();
      const twoHoursMs = 2 * 60 * 60 * 1000;
      const newOrders = orders.filter(o => !(o.status === 'served' && (now - o.statusUpdatedAt) > twoHoursMs));
      setOrders(newOrders);
      localStorage.setItem('legrm_orders', JSON.stringify(newOrders));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="kitchen-login">
        <form onSubmit={handleLogin} className="kitchen-login-form">
          <h2>CUISINE L'INTEMPOREL</h2>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder="Code d'accès" 
          />
          <button type="submit">Entrer</button>
        </form>
      </div>
    );
  }

  const activeCount = orders.filter(o => o.status === 'pending' || o.status === 'preparing').length;

  return (
    <div className="kitchen-dashboard">
      <div className="kitchen-topbar">
        <div className="kitchen-brand">CUISINE L'INTEMPOREL</div>
        <div className="kitchen-clock">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="kitchen-actions">
          <div className="active-badge">{activeCount} ACTIVES</div>
          <button className="btn-kitchen-action" onClick={handleArchive}>
            <Archive size={16} /> Archive
          </button>
          <button className="btn-kitchen-action" onClick={handleLogout}>
            <LogOut size={16} /> Quitter
          </button>
        </div>
      </div>

      <div className="kanban-board">
        {['pending', 'preparing', 'ready', 'served'].map(status => {
          const colOrders = orders.filter(o => o.status === status);
          
          let Icon = Clock;
          let headerColor = '#C9A84C';
          let title = 'EN ATTENTE';
          
          if (status === 'preparing') { Icon = Flame; headerColor = '#E8883A'; title = 'EN PRÉPARATION'; }
          if (status === 'ready') { Icon = BellRing; headerColor = '#25D366'; title = 'PRÊT'; }
          if (status === 'served') { Icon = CheckCircle; headerColor = '#555555'; title = 'SERVI'; }
          
          return (
            <div key={status} className="kanban-col">
              <div className="kanban-header" style={{ color: headerColor }}>
                <Icon size={16} /> <span>{title}</span> <span className="col-count">{colOrders.length}</span>
              </div>
              <div className="kanban-cards">
                {colOrders.sort((a,b) => a.timestamp - b.timestamp).map(order => {
                  const minutesElapsed = Math.floor((Date.now() - order.timestamp) / 60000);
                  let timeClass = '';
                  if (minutesElapsed >= 10 && minutesElapsed < 20) timeClass = 'warning';
                  if (minutesElapsed >= 20) timeClass = 'danger';
                  
                  return (
                    <div key={order.id} className={`order-card status-${status} new-card-anim`}>
                      <div className="card-header">
                        <span className="table-num">Table {order.tableNumber}</span>
                        <div className={`time-elapsed ${timeClass}`}>
                          {minutesElapsed} min
                          {(timeClass === 'warning' || timeClass === 'danger') && <AlertCircle size={14} />}
                        </div>
                      </div>
                      
                      <div className="card-items">
                        {order.items.map(item => (
                          <div key={item.id} className="card-item-line">
                            {item.quantity}× {item.name}
                          </div>
                        ))}
                      </div>
                      
                      {order.note && (
                        <div className="card-note">
                          <AlertCircle size={14} /> {order.note}
                        </div>
                      )}
                      
                      <div className="card-actions">
                        {status === 'pending' && <button className="btn-status-act pending" onClick={() => updateOrderStatus(order.id, 'preparing')}>Prendre en charge</button>}
                        {status === 'preparing' && <button className="btn-status-act preparing" onClick={() => updateOrderStatus(order.id, 'ready')}>Commande prête</button>}
                        {status === 'ready' && <button className="btn-status-act ready" onClick={() => updateOrderStatus(order.id, 'served')}>Marquer servie</button>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Kitchen;
