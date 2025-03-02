import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className='navbar'>
  
        <button onClick={() => {navigate("/")}}> Home </button>
     
        <button onClick={() => {navigate("/Report")}}> Report </button>
      
    </div>
    
  );
}

export default Navbar;