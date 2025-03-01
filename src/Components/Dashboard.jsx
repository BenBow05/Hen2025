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
          <table>
            <tr>
              <th>
                crime
              </th>
              <th>
                safety
              </th>
              <th>
                location
              </th>
              <th>
                severity
              </th>
            </tr>
            {reports.map((report) => (
              <tr>
                <td>
                  {report.crime}
                </td>
                <td>
                  {report.safety}
                </td>
                <td>
                  {report.location}
                </td>
                <td>{report.severity}</td>
              </tr>
            ))}
          </table>
        </div>
    </>
    
  );
}

export default Dashboard;