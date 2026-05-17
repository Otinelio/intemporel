import React, { useEffect } from 'react';
import './About.css';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page fade-in">
      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="about-pretitle">DEPUIS KODJOVIAKOPÉ</div>
          <h1 className="about-title">Hors du Temps.</h1>
          <hr className="about-divider" />
          <p className="about-intro">
            Un lieu que Lomé a appris à aimer.
          </p>
        </div>
        <div className="about-hero-image-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop" 
            alt="L'Intemporel" 
            className="about-hero-image img-treatment"
          />
        </div>
      </section>

      {/* HISTOIRE SECTION */}
      <section className="histoire-section">
        <div className="histoire-content">
          <p className="histoire-text">
            L'Intemporel est né d'une conviction simple : dans une ville qui s'accélère, il faut des lieux qui ralentissent. À 200 mètres du Golfe de Guinée, au cœur du quartier Kodjoviakopé, cet hôtel-restaurant s'est construit autour d'un arbre, d'une terrasse, et d'une idée : que manger ensemble est un acte de résistance au temps qui passe.
          </p>
        </div>
        <div className="histoire-image-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop" 
            alt="Jardin" 
            className="histoire-image img-treatment"
          />
        </div>
      </section>

      {/* VALEURS SECTION */}
      <section className="valeurs-section">
        <div className="valeur">Authenticité</div>
        <div className="valeur-separator"></div>
        <div className="valeur">Convivialité</div>
        <div className="valeur-separator"></div>
        <div className="valeur">Intemporalité</div>
      </section>

      {/* PHILOSOPHIE SECTION */}
      <section className="philosophie-section">
        <div className="philosophie-overlay" />
        <h2 className="philosophie-title">L'arbre au centre de tout.</h2>
        <p className="philosophie-text">
          Chaque branche raconte une histoire. Chaque feuille offre un peu d'ombre. Autour de cet arbre, nous avons voulu créer plus qu'un simple espace : une véritable maison.
        </p>
      </section>
    </div>
  );
};

export default About;
