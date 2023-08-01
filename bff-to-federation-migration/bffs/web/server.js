const express = require('express');
const app = express();
const port = 3002;

const flightCheckInRoutes = require('./flightCheckIn');
const seatSelectionRoutes = require('./seatSelection');

app.use('/web', flightCheckInRoutes);
app.use('/web', seatSelectionRoutes);

app.listen(port, () => {
  console.log(`Web BFF listening at http://localhost:${port}`);
});
