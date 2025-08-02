const express = require('express');
const router = express.Router();

// Dummy users for demo (hardcoded)
const users = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'agent', password: 'agent123', role: 'agent' },
  { username: 'user', password: 'user123', role: 'user' }
];

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    // In real apps, you'd return JWT here
    res.json({ success: true, user: { username: user.username, role: user.role } });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

module.exports = router;
