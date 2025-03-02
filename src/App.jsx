import './App.css';
import './styles/NavBar.css';
import './index.css';
import React, { useState } from 'react';
import AnalyzeCrime from './Components/CrimeSeverityRating';
import ReportCrime from './Components/ReportCrime';
import Dashboard from './Components/Dashboard';
import Navbar from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Context from './Components/Context';

function App() {
  const [reports, setReports] = useState([]);
  const [showMap, setShowMap] = useState(false);
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