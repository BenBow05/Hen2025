import React, { useContext, useState } from 'react';
import MapView from './MapView';
import ListView from './ListView';
import Context from './Context';

function Dashboard() {  
  const {showMap, setShowMap} = useContext(Context);
  const switchView = () => {
    setShowMap(!showMap)
  }

  return (
    <>
    
    <br></br>

        <div>
          <h1>Welcome to CrimeScope!</h1>
        </div>
        <div>
          <button onClick={switchView}>{showMap ? "List View" : "Map View"}</button>
        </div>
        {showMap ? <MapView/> : <ListView/>}
    </>
    
  );
}

export default Dashboard;