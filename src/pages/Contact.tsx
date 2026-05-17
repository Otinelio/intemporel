import React, { useEffect } from 'react';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import { getRestaurantData } from '../data/mockData';
import './Contact.css';

const Contact = () => {
  const { settings } = getRestaurantData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contact-page fade-in">
      <div className="contact-container">
        <h1 className="contact-title">Nous trouver.</h1>
        
        <div className="contact-content">
          <div className="contact-info-panel">
            <div className="info-block">
              <MapPin className="info-icon" size={20} />
              <div className="info-text">{settings.address}</div>
            </div>
            
            <div className="info-block">
              <Phone className="info-icon" size={20} />
              <div className="info-text">
                (+228) 90 66 23 20 <br />
                (+228) 91 91 85 82
              </div>
            </div>
            
            <div className="info-block">
              <Clock className="info-icon" size={20} />
              <div className="info-text">
                {settings.hours}
              </div>
            </div>
            
            <button 
              className="btn-whatsapp-full"
              onClick={() => window.open(`https://wa.me/${settings.whatsapp.replace('+', '')}`, '_blank')}
            >
              <MessageCircle size={20} />
              <span>ÉCRIRE SUR WHATSAPP</span>
            </button>
          </div>
          
          <div className="contact-map">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15873.34215893301!2d1.2059381!3d6.1260463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1023e1c6670868f7%3A0xc31919dc29df143a!2sKodjoviakop%C3%A9%2C%20Lom%C3%A9%2C%20Togo!5e0!3m2!1sfr!2sus!4v1716301234567!5m2!1sfr!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Carte Kodjoviakopé"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
