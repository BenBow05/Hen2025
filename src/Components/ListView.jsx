import React, { useContext, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import Context from './Context';
import * as crimeService from "../Services/CrimeService";

function ListView() {
  const { reports, setReports } = useContext(Context);

  useEffect(() => {
    crimeService.getAllCrimes().then(response => {
      setReports(response);
    });
  }, []);

  function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString();
  }

  return (
    <>
      <h1>Report List</h1>
      <Grid container spacing={3}>
        {reports.map((report, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {report.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Reccommended Actions:</strong> {report.safetyMeasures}
                </Typography>
                
                <Typography variant="body2" color="textSecondary">
                  {report.severity} / 10 Severity Rating
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {report.location}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                   {formatDate(report.created)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default ListView;
