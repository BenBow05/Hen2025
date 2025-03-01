import './App.css';
import React, {useState} from 'react';
import AnalyzeCrime from './Components/CrimeSeverityRating';
import Dashboard from './Components/Dashboard';
import MapView from './Components/MapView';
import Navbar from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/Report' element={<AnalyzeCrime/>}/>
      <Route path="/map" element={<MapView/>}/>
    </Routes>
    </>
  )
}

export default App;