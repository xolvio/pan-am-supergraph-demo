const express = require('express');
const router = express.Router();

router.get('/flightCheckIn', (req, res) => {
  const data = {
    id: '1',
    flightNumber: 'AA123',
    checkInStatus: 'Confirmed',
  };
  res.json(data);
});

module.exports = router;
