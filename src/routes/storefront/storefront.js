const express = require('express');
const db = require('../../config/db');
const router = express.Router();

router.get('/', (req, res) => {

    db.serialize(() => {
        db.all('SELECT * FROM Products', [], (err, products) => {
            if (err) {
                console.error('Error fetching products:', err.message);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            res.render('storefront', { products });
        });
    })
});

module.exports = router;