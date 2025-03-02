import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <div id="NavBar">
      <li>
        <button onClick={() => {navigate("/")}}> Home </button>
      </li>
      <li>
        <button onClick={() => {navigate("/Report")}}> Report </button>
      </li>
    </div>
    
  );
}

export default Navbar;