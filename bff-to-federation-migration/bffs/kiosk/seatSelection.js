const express = require('express');
const router = express.Router();

router.get('/seatSelection', (req, res) => {
  
  const data = {
    id: '1',
    seatNumber: '12A',
    seatClass: 'Economy',
  };
  res.json(data);
});

module.exports = router;
