const express = require('express');
const app = express();
const port = 3000;

const bagCheckInRoutes = require('./bagCheckIn');
const flightCheckInRoutes = require('./flightCheckIn');
const seatSelectionRoutes = require('./seatSelection');

app.use('/kiosk', bagCheckInRoutes);
app.use('/kiosk', flightCheckInRoutes);
app.use('/kiosk', seatSelectionRoutes);

app.listen(port, () => {
  console.log(`Kiosk BFF listening at http://localhost:${port}`);
});
