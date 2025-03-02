import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from './Context';

function Navbar() {
  const navigate = useNavigate();
  const {showMap, setShowMap} = useContext(Context);

  const bigNav = () => {
    // navigate("/map")
    setShowMap(!showMap)
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