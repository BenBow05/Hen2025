import React, { useContext, useEffect } from 'react';
import Context from './Context';
import * as crimeService from "../Services/CrimeService";
import '../styles/table.css';

function ListView() {
  const { reports, setReports } = useContext(Context);

  useEffect(() => {
    crimeService.getAllCrimes().then(response => {
      setReports(response);
    })
  }, [])

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>
              Description
            </th>
            <th>
              Safety Measures
            </th>
            <th>
              Location
            </th>
            <th>
              Severity
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