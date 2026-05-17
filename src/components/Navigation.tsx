import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, UtensilsCrossed, Leaf, MapPin } from 'lucide-react';
import './Navigation.css';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`desktop-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-brand" onClick={() => navigate('/')}>
          L'INTEMPOREL
        </div>
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/menu" className={({ isActive }) => isActive ? 'active' : ''}>Menu</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>Hors du Temps</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>
        </div>
        <div className="nav-cta">
          <button className="btn-reserve">RÉSERVER</button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="mobile-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? 'mobile-tab active' : 'mobile-tab'}>
          <Home size={20} />
          <span>HOME</span>
        </NavLink>
        <NavLink to="/menu" className={({ isActive }) => isActive ? 'mobile-tab active' : 'mobile-tab'}>
          <UtensilsCrossed size={20} />
          <span>MENU</span>
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'mobile-tab active' : 'mobile-tab'}>
          <Leaf size={20} />
          <span>HORS DU TEMPS</span>
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'mobile-tab active' : 'mobile-tab'}>
          <MapPin size={20} />
          <span>CONTACT</span>
        </NavLink>
      </nav>
    </>
  );
};

export default Navigation;
