import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import StepGuidePage from './pages/StepGuidePage';
import SearchResults from './pages/SearchResults';
import { SearchProvider } from './context/SearchContext';

function App() {
  // Default to light mode (false)
  const [darkMode, setDarkMode] = useState(false);

  // Apply dark mode class to document root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <SearchProvider>
      <Router>
        <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/guide/:module/:step" element={<StepGuidePage />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </div>
      </Router>
    </SearchProvider>
  );
}

export default App;
