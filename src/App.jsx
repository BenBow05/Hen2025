import './styles/App.css';
import './styles/Navbar.css'
import './styles/index.css'
import React, {useState} from 'react';
import AnalyzeCrime from './Components/CrimeSeverityRating';
import Dashboard from './Components/Dashboard';
import Navbar from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Context from './Components/Context';

function App() {
  const [reports, setReports] = useState([
      {id: 0, severity: 5, crime: "I saw someone", location: "AMERICA", safety: "Close eyes"},
  ]);
  const [showMap, setShowMap] = useState(false);
  return (
    <div>
      <Context.Provider value={{ reports, setReports, showMap, setShowMap }}>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/Report' element={<AnalyzeCrime/>}/>
          {/* <Route path="/map" element={<MapView/>}/> */}
        </Routes>
      </Context.Provider>
    </div>
  )
}

export default App;