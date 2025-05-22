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
        console.log(user.id);
    } catch (err) {
        console.error('JWT verification error:', err.message);
        return res.redirect('/');
    }
    res.render('edit-profile');
});

router.post('/', (req, res) => {
    const { firstname, lastname, email } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Aucun token fourni' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET)
    const userId = decoded.dbres2.id;

    console.log(userId);
    db.serialize(() => {
        db.run('UPDATE Users SET firstname = ?, lastname = ?, email = ? WHERE id = ?', [firstname, lastname, email, userId], (err) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Server error' });
            }
            db.get('SELECT * FROM Users WHERE id = ?', [userId], (err2, dbres2) => {
                if (err2) {
                    console.error('Database error:', err2);
                    return res.status(500).json({ message: 'Server error' });
                }

                const newToken = jwt.sign({dbres2}, process.env.SECRET);
                res.cookie('authcookie', newToken, {
                    httpOnly: true,
                    secure: true, // Set to false if not using HTTPS
                    maxAge: 36000000
                });

                return res.status(200).json({ message: 'Profile updated successfully', token: newToken});
            });
        });
    });
});


module.exports = router;
