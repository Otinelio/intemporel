import React from 'react';
import { NavLink } from 'react-router-dom';
import { MapPin, MessageCircle } from 'lucide-react';
import './Footer.css';
import { getRestaurantData } from '../data/mockData';

const Footer = () => {
  const { settings } = getRestaurantData();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-col brand-col">
          <h2 className="footer-brand">{settings.name}</h2>
          <p className="footer-tagline">{settings.tagline}</p>
          <div className="footer-address">
            <MapPin size={16} className="icon" />
            <span>{settings.address}</span>
          </div>
        </div>

        <div className="footer-col nav-col">
          <h3 className="footer-label">NAVIGATION</h3>
          <div className="footer-links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/menu">Menu</NavLink>
            <NavLink to="/about">Hors du Temps</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>
        </div>

        <div className="footer-col contact-col">
          <h3 className="footer-label">NOUS JOINDRE</h3>
          <p className="footer-phone">Téléphone : (+228) 90 66 23 20</p>
          <p className="footer-whatsapp-text">WhatsApp : {settings.whatsapp}</p>
          
          <a href={`https://wa.me/${settings.whatsapp.replace('+', '')}`} target="_blank" rel="noreferrer" className="btn-whatsapp-compact">
            <MessageCircle size={16} />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="legal-text">© 2025 L'Intemporel · Lomé, Togo</p>
      </div>
    </footer>
  );
};

export default Footer;
