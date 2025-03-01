import React, { useContext, useState } from 'react';
import Context from './Context';

function Dashboard() {

  const {reports, setReports} = useContext(Context);
  return (
    <>
        <div>
            <h1>Welcome to CrimeScope™</h1>
            <p>Below you will see a list of local reports</p>
        </div>
        <div>
            <ul>
                {reports.map((report) => (
                  <li>{report.crime}</li>
                ))}
            </ul>
        </div>
    </>
    
  );
}

export default Dashboard;