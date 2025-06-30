import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Characters from './components/Characters';
import Lessons from './components/Lessons';
import Progress from './components/Progress';
import Explore from './components/Explore';
import Feedback from './components/Feedback';
import Chat from './components/Chat';
import ConnectionStatus from './components/ConnectionStatus';
import { integrationUtils } from './services/api';
import boltBadge from '/bolt-badge.png';

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [initError, setInitError] = useState(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await integrationUtils.initialize();
        setIsInitialized(true);
      } catch (error) {
        console.warn('App initialization completed with warnings:', error.message);
        // Continue anyway - app can work in demo mode
        setIsInitialized(true);
      }
    };

    initializeApp();
  }, []);

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Initializing Voicenary...</h2>
          <p className="text-gray-300">Setting up your language learning experience</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <ConnectionStatus />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/chat/:character" element={<Chat />} />
        </Routes>
      </div>

      {/* Bolt.new Badge - now in the top right, larger size */}
      <a
        href="https://bolt.new/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          top: '2rem',
          right: '2rem',
          zIndex: 1000,
          width: '90px',
          height: '90px',
          display: 'block',
        }}
        className="bolt-badge bolt-badge-top"
        aria-label="Powered by Bolt.new"
      >
        <img
          src={boltBadge}
          alt="Powered by Bolt.new"
          style={{ width: '100%', height: 'auto', maxWidth: '120px', minWidth: '50px' }}
        />
      </a>
    </Router>
  );
}

export default App;