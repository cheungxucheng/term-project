const express = require('express');
const db = require('../../config/db');
const router = express.Router();


router.get('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    db.serialize(() => {
        db.get('SELECT * FROM Products WHERE id = ?', [productId], (err, product) => {
            if (err) {
                console.error('Error fetching product with id:', err.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.render('product', { product });
        });
    })
});

module.exports = router;
