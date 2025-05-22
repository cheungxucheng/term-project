const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv').config();

router.get('/', (req, res) => {
    const token = req.cookies.authcookie;

    if (!token) {
        return res.redirect('/');
    }
    let user;
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        if (!decoded || !decoded.dbres2 || !decoded.dbres2.id) {
            return res.redirect('/');
        }
        user = decoded.dbres2;
    } catch (err) {
        console.error('JWT verification error:', err.message);
        return res.redirect('/');
    }
    res.render('edit-pass');
});

// Change password route
router.post('/', (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  const token = authHeader.split(' ')[1];
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.SECRET);
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const userId = decoded.dbres2.id;
  db.get('SELECT password FROM Users WHERE id = ?', [userId], (err, row) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    if (!row) return res.status(404).json({ message: 'User not found' });

    bcrypt.compare(currentPassword, row.password, (err, result) => {
      if (err) return res.status(500).json({ message: 'Comparison error' });
      if (!result) return res.status(403).json({ message: 'Current password is incorrect' });
      
      if (currentPassword === newPassword) return res.status(500).json({message: 'New password cannot be the same as old password.'});

      bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: 'Hashing error' });

        db.run('UPDATE Users SET password = ? WHERE id = ?', [hashedPassword, userId], (err) => {
          if (err) return res.status(500).json({ message: 'Update error' });
          return res.status(200).json({ status: 'ok' });
        });
      });
    });
  });
});



module.exports = router;
