import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import StepGuidePage from './pages/StepGuidePage';
import SearchResults from './pages/SearchResults';
import { SearchProvider } from './context/SearchContext';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SearchProvider>
      <Router>
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
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
