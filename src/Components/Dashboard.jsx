import React, { useContext, useState, useEffect } from 'react';
import Context from './Context';
import * as crimeService from '../Services/CrimeService';
import '../css/table.css'
import MapView from './MapView';

function Dashboard() {

  const {reports, setReports} = useContext(Context);
  const {showMap, setShowMap} = useContext(Context);

  useEffect(() => {
    crimeService.getAllCrimes().then(response => {
      setReports(response);
    })
  }, [])
  return (
    <>
        <div>
            <h1>Welcome to CrimeScope</h1>
            <p>Below you will see a list of recent local reports</p>
        </div>
        <div>
          <table className='table'>
            <thead>
              <tr className='row'>
                <th>
                  description
                </th>
                <th>
                  safetyMeasures
                </th>
                <th>
                  location
                </th>
                <th>
                  severity
                </th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
              <tr>
                <td>
                  {report.description}
                </td>
                <td>
                  {report.safetyMeasures}
                </td>
                <td>
                  {report.location}
                </td>
                <td>{report.severity}</td>
              </tr>
            ))}
            </tbody>
          </table>
          {showMap ? <MapView/> : ""}
        </div>
    </>
    
  );
}

export default Dashboard;