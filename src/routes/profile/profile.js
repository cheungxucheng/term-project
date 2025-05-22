const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const jwt = require('jsonwebtoken');
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

    db.all('SELECT * FROM Orders WHERE user_id = ? ORDER BY created_at DESC', [user.id], (err, orders) => {
        if (err) {
            console.error('Error fetching orders:', err.message);
            return res.status(500).send('Server error');
        }
        console.log(orders);
        res.render('profile', { user, orders });
    });
});

module.exports = router;
