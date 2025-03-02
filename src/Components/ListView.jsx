import React, { useContext, useEffect } from 'react';
import Context from './Context';
import * as crimeService from "../Services/CrimeService"

function ListView() {
    const {reports, setReports} = useContext(Context);

    useEffect(() => {
    crimeService.getAllCrimes().then(response => {
      setReports(response);
    })}, [])

  return (
    <>
        <table>
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
    </>
    
  );
}

export default ListView;