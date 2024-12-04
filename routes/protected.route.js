const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');

router.get('/protected-data', authenticateToken, (req, res) => {
  res.json({ message: "Ini adalah data yang dilindungi", user: req.user });
});

module.exports = router;
