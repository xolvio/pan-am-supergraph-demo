const express = require('express');
const app = express();
const port = 3001;

const flightCheckInRoutes = require('./flightCheckIn');
const seatSelectionRoutes = require('./seatSelection');

app.use('/mobile', flightCheckInRoutes);
app.use('/mobile', seatSelectionRoutes);

app.listen(port, () => {
  console.log(`Mobile BFF listening at http://localhost:${port}`);
});
