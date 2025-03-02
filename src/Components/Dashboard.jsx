import React, { useContext, useState } from 'react';
import MapView from './MapView';
import ListView from './ListView';
import Context from './Context';

function Dashboard() {  
  const {showMap, setShowMap} = useContext(Context);
  const bigNav = () => {
    // navigate("/map")
    setShowMap(!showMap)
  }

  return (
    <>
        <div>
            <h1>Welcome to CrimeScope™</h1>
            <p>Below you will see a list of local reports</p>
        </div>
        <div>
          <button onClick={bigNav}>click</button>
        </div>
        {showMap ? <MapView/> : <ListView/>}
    </>
    
  );
}

export default Dashboard;