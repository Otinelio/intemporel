import React, { useState, useEffect } from 'react';
import { LogOut, Save, Download, Pencil, Trash2, FolderOpen, ChevronUp, ChevronDown } from 'lucide-react';
import { getRestaurantData, saveRestaurantData, DEFAULT_DATA } from '../data/mockData';
import './Admin.css';

const ADMIN_PASSWORD = "intemporel2025";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('menu');
  const [data, setData] = useState(DEFAULT_DATA);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('adminAuth') === 'true') {
      setIsAuthenticated(true);
      setData(getRestaurantData());
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
      setData(getRestaurantData());
    } else {
      alert("Mot de passe incorrect");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleSave = () => {
    saveRestaurantData(data);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleExport = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    alert("Configuration copiée dans le presse-papier !");
  };

  const handleReset = () => {
    if (window.confirm("Êtes-vous sûr de vouloir tout réinitialiser ?")) {
      setData(DEFAULT_DATA);
      saveRestaurantData(DEFAULT_DATA);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <form className="admin-login-form" onSubmit={handleLogin}>
          <h2>L'Intemporel Admin</h2>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder="Mot de passe" 
            className="admin-input"
          />
          <button type="submit" className="admin-btn">Connexion</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-topbar">
        <div className="admin-brand">L'Intemporel — Admin</div>
        <button className="btn-logout" onClick={handleLogout}>
          <LogOut size={16} /> Déconnexion
        </button>
      </div>

      <div className="admin-tabs">
        <button className={`admin-tab ${activeTab === 'menu' ? 'active' : ''}`} onClick={() => setActiveTab('menu')}>Menu</button>
        <button className={`admin-tab ${activeTab === 'categories' ? 'active' : ''}`} onClick={() => setActiveTab('categories')}>Catégories</button>
        <button className={`admin-tab ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>Paramètres</button>
        <button className={`admin-tab ${activeTab === 'export' ? 'active' : ''}`} onClick={() => setActiveTab('export')}>Export</button>
      </div>

      <div className="admin-content">
        {activeTab === 'menu' && (
          <div className="admin-panel">
            <div className="panel-header">
              <h3>Gestion du Menu</h3>
              <button className="admin-btn-primary">Ajouter un plat</button>
            </div>
            {data.categories.map(cat => (
              <div key={cat.id} className="admin-cat-section">
                <h4>{cat.name}</h4>
                <div className="admin-item-list">
                  {data.items.filter(i => i.categoryId === cat.id).map(item => (
                    <div key={item.id} className="admin-item-row">
                      <div className="admin-item-info">
                        <strong>{item.name}</strong> — {item.price} FCFA
                      </div>
                      <div className="admin-item-actions">
                        <label className="switch">
                          <input 
                            type="checkbox" 
                            checked={item.available} 
                            onChange={(e) => {
                              const newItems = data.items.map(i => i.id === item.id ? {...i, available: e.target.checked} : i);
                              setData({...data, items: newItems});
                            }} 
                          />
                          <span className="slider round"></span>
                        </label>
                        <button className="btn-icon"><Pencil size={16} /></button>
                        <button className="btn-icon danger"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button className="admin-btn-save" onClick={handleSave}>
              <Save size={16} /> {isSaved ? 'Sauvegardé!' : 'Enregistrer les modifications'}
            </button>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="admin-panel">
            <h3>Catégories</h3>
            <div className="admin-cat-list">
              {data.categories.sort((a,b) => a.order - b.order).map((cat, index) => (
                <div key={cat.id} className="admin-cat-row">
                  <div className="cat-order-controls">
                    <button disabled={index === 0} className="btn-icon"><ChevronUp size={16} /></button>
                    <button disabled={index === data.categories.length - 1} className="btn-icon"><ChevronDown size={16} /></button>
                  </div>
                  <div className="cat-name"><FolderOpen size={16} /> {cat.name}</div>
                  <div className="cat-actions">
                    <button className="btn-icon"><Pencil size={16} /></button>
                    <button className="btn-icon danger"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="admin-panel">
            <h3>Paramètres</h3>
            <div className="settings-form">
              <label>Nom
                <input type="text" className="admin-input" value={data.settings.name} onChange={e => setData({...data, settings: {...data.settings, name: e.target.value}})} />
              </label>
              <label>Tagline
                <input type="text" className="admin-input" value={data.settings.tagline} onChange={e => setData({...data, settings: {...data.settings, tagline: e.target.value}})} />
              </label>
              <label>WhatsApp
                <input type="text" className="admin-input" value={data.settings.whatsapp} onChange={e => setData({...data, settings: {...data.settings, whatsapp: e.target.value}})} />
              </label>
              <label>Adresse
                <input type="text" className="admin-input" value={data.settings.address} onChange={e => setData({...data, settings: {...data.settings, address: e.target.value}})} />
              </label>
              <button className="admin-btn-save" onClick={handleSave}>
                <Save size={16} /> {isSaved ? 'Sauvegardé!' : 'Enregistrer'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'export' && (
          <div className="admin-panel">
            <h3>Exportation</h3>
            <p className="admin-help-text">Transmettez ce JSON à votre développeur pour mettre à jour les données par défaut du site.</p>
            <button className="admin-btn" onClick={handleExport}><Download size={16} /> Copier la config JSON</button>
            <hr className="admin-divider" />
            <button className="admin-btn danger" onClick={handleReset}>Réinitialiser aux données par défaut</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
