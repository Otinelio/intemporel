import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import Loader from './Loader';

const Layout = () => {
  const [loading, setLoading] = useState(true);

  // Use useEffect to handle initial load
  useEffect(() => {
    // Only show loader on the first site visit in the session
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setLoading(false);
    } else {
      sessionStorage.setItem('hasVisited', 'true');
    }
  }, []);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <div className="layout-container fade-in">
          <Navigation />
          <main style={{ minHeight: '100vh', paddingBottom: '64px' }}>
            <Outlet />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Layout;
