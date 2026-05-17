import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Music2, UtensilsCrossed, MessageCircle, Star } from 'lucide-react';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page">
      {/* SECTION 1 - HERO IMMERSIF */}
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-pretitle delay-200">KODJOVIAKOPÉ · LOMÉ</div>
          <h1 className="hero-title delay-400">Le temps prend une autre saveur.</h1>
          <p className="hero-subtitle delay-700">
            Restaurant • Bar • Musique Live — à 200 mètres de la mer
          </p>
          <div className="hero-cta-group delay-900">
            <button className="btn-primary" onClick={() => navigate('/menu')}>
              Voir le menu
            </button>
            <button className="btn-secondary" onClick={() => navigate('/about')}>
              Notre histoire
            </button>
          </div>
        </div>
        <div className="hero-signature delay-1200">
          <span>VENDREDI & SAMEDI · MUSIQUE LIVE</span>
        </div>
      </section>

      {/* SECTION 2 - UNIVERS */}
      <section className="univers-section reveal fade-up">
        <div className="univers-content">
          <div className="univers-pretitle">L'UNIVERS</div>
          <h2 className="univers-title">Une maison où l'on revient toujours.</h2>
          <p className="univers-text">
            Au cœur du quartier Kodjoviakopé, à deux pas du Golfe de Guinée, L'Intemporel n'est pas simplement un restaurant. C'est un lieu que Lomé s'est approprié au fil des années. Un grand arbre qui donne de l'ombre. Une terrasse qui invite à rester. Une cuisine qui voyage. Une soirée qui commence sans qu'on sache quand elle finira.
          </p>
        </div>
        <div className="univers-image-wrapper reveal slide-left delay-200">
          <img 
            src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop" 
            alt="Terrasse" 
            className="univers-image img-treatment"
          />
        </div>
      </section>

      {/* SECTION 3 - POINTS FORTS */}
      <section className="points-section">
        <div className="points-grid">
          <div className="point-card reveal fade-up">
            <Sun className="point-icon" />
            <h3 className="point-title">La Terrasse Emblématique</h3>
            <p className="point-text">Un arbre centenaire, des tables ombrées, la brise de l'Atlantique à portée de main.</p>
          </div>
          <div className="point-card reveal fade-up delay-100">
            <Music2 className="point-icon" />
            <h3 className="point-title">Musique Live</h3>
            <p className="point-text">Les vendredis et samedis soir, la terrasse s'anime. Jazz, afro, acoustique — chaque semaine une surprise.</p>
          </div>
          <div className="point-card reveal fade-up delay-200">
            <UtensilsCrossed className="point-icon" />
            <h3 className="point-title">Cuisine du Monde</h3>
            <p className="point-text">Du petit-déjeuner au dîner, des suggestions du chef aux classiques — ici, chaque palais trouve sa saveur.</p>
          </div>
        </div>
      </section>

      {/* SECTION 4 - LA TERRASSE & LE JARDIN */}
      <section className="terrasse-section">
        <h2 className="terrasse-title reveal fade-up">Le jardin où le temps s'arrête.</h2>
        <div className="terrasse-citation reveal fade-up delay-100">
          « Ici, les conversations durent aussi longtemps que les bouteilles. »
        </div>
        <div className="masonry-grid">
          <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop" alt="Terrasse 1" className="masonry-item item-large reveal fade-up img-treatment" />
          <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop" alt="Terrasse 2" className="masonry-item reveal fade-up delay-100 img-treatment" />
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop" alt="Terrasse 3" className="masonry-item reveal fade-up delay-200 img-treatment" />
          <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000&auto=format&fit=crop" alt="Cocktail" className="masonry-item reveal fade-up delay-300 img-treatment" />
        </div>
      </section>

      {/* SECTION 5 - MUSIQUE & MOMENTS */}
      <section className="musique-section">
        <div className="musique-overlay" />
        <div className="musique-content reveal slide-right">
          <div className="musique-label">VENDREDI & SAMEDI SOIR</div>
          <h2 className="musique-title">La musique qui fait durer la nuit.</h2>
          <p className="musique-text">
            Chaque fin de semaine, des artistes prennent possession de la terrasse. Jazz, afro, acoustique, folklore togolais. La musique n'est pas un fond sonore — elle est le cœur de la soirée.
          </p>
          <button className="btn-outline-accent">Réserver pour une soirée live</button>
        </div>
      </section>

      {/* SECTION 6 - GALERIE IMMERSIVE */}
      <section className="galerie-section">
        <h2 className="galerie-title">Des moments qui restent.</h2>
        <div className="galerie-grid">
          {["https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop", 
            "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1478147424044-84683050fb3d?q=80&w=2080&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop"
          ].map((src, i) => (
            <div className="galerie-item" key={i}>
              <img src={src} alt="Galerie" className="img-treatment" />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7 - RÉSERVATION RAPIDE */}
      <section className="reservation-section">
        <h2 className="reservation-title">Réservez votre moment.</h2>
        <form className="reservation-form">
          <input type="date" className="res-input" />
          <input type="time" className="res-input" />
          <select className="res-input">
            <option value="2">2 Personnes</option>
            <option value="4">4 Personnes</option>
            <option value="6">6 Personnes</option>
            <option value="8+">8+ Personnes</option>
          </select>
          <select className="res-input">
            <option value="diner">Dîner</option>
            <option value="famille">Famille</option>
            <option value="anniversaire">Anniversaire</option>
            <option value="business">Business</option>
            <option value="live">Soirée Live Music</option>
          </select>
          <button type="button" className="btn-submit-res" onClick={() => {
            window.open('https://wa.me/22890662320?text=Bonjour,%20je%20souhaite%20r%C3%A9server%20une%20table.', '_blank');
          }}>Réserver</button>
        </form>
        <div className="reservation-whatsapp">
          <p>Ou contactez-nous sur WhatsApp</p>
          <button className="btn-whatsapp-res" onClick={() => {
            window.open('https://wa.me/22890662320', '_blank');
          }}>
            <MessageCircle size={18} />
          </button>
        </div>
      </section>

      {/* SECTION 8 - TÉMOIGNAGES */}
      <section className="temoignages-section">
        <div className="temoignages-grid">
          {[
            { text: "L'arbre, la terrasse, la lumière du soir... On est revenu trois fois en un mois.", author: "Jean-Michel K., Lomé" },
            { text: "La meilleure soirée musicale de Lomé. Le chef est une bénédiction.", author: "Amélie T., Cotonou" },
            { text: "Un endroit qui ressemble à peu d'autres. On y mange bien, on s'y sent chez soi.", author: "David A., Accra" }
          ].map((t, i) => (
            <div className="temoignage-card reveal fade-up" style={{ animationDelay: `${i * 100}ms` }} key={i}>
              <p className="temoignage-text">"{t.text}"</p>
              <div className="temoignage-author">{t.author}</div>
              <div className="temoignage-stars">
                <Star size={16} fill="var(--color-accent)" stroke="none" />
                <Star size={16} fill="var(--color-accent)" stroke="none" />
                <Star size={16} fill="var(--color-accent)" stroke="none" />
                <Star size={16} fill="var(--color-accent)" stroke="none" />
                <Star size={16} fill="var(--color-accent)" stroke="none" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
