import './App.css';
import React, {useState} from 'react';
import AnalyzeCrime from './Components/CrimeSeverityRating';
import Dashboard from './Components/Dashboard';
import MapView from './Components/MapView';
import Navbar from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Context from './Components/Context';

function App() {
  const [reports, setReports] = useState([
      {id: 0, severity: 5, crime: "I saw someone", location: "AMERICA", safety: "Close eyes"},
    ]);

  return (
    <>
    <Context.Provider value={{ reports, setReports }}>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/Report' element={<AnalyzeCrime/>}/>
        <Route path="/map" element={<MapView/>}/>
      </Routes>
    </Context.Provider>
    </>
  )
}

export default App;