const express = require('express');
const router = express.Router();

router.get('/bagCheckIn', (req, res) => {
  const data = {
    id: '1',
    numberOfBags: 2,
    checkInStatus: 'Confirmed',
  };
  res.json(data);
});

module.exports = router;
