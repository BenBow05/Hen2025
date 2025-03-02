import './App.css';
import './styles/NavBar.css';
import './index.css';
import React, { useState, useEffect } from 'react';
import AnalyzeCrime from './Components/CrimeSeverityRating';
import Dashboard from './Components/Dashboard';
import Navbar from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Context from './Components/Context';
import ReportCrime from './Components/ReportCrime';

function App() {
  const [reports, setReports] = useState([]);
  const [showMap, setShowMap] = useState(false);
  
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_MAPS_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);
  return (
    <div>
      <Context.Provider value={{ reports, setReports, showMap, setShowMap }}>
        <Navbar />
        <div>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/Report' element={<ReportCrime />} />
          </Routes>
        </div>

      </Context.Provider>
    </div>
  )
}

export default App;