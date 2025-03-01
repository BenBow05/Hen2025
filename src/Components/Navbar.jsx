import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const bigNav = () => {
    navigate("/map")
  }
  return (
    <>
        <div>
            <h1>I am a Navbar?????????</h1>
            <button onClick={bigNav}>click</button>
        </div> 
    </>
    
  );
}

export default Navbar;