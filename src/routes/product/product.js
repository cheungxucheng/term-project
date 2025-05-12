const express = require('express');
const db = require('../../config/db');
const router = express.Router();
const { getProducts } = require('./../../config/db.prepare');
const auth = require('../../middleware/auth');

router.get('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    db.serialize(() => {
        db.get('SELECT * FROM Products WHERE id = ?', productId, (err, product) => {
            if (err) {
                console.error('Error fetching product:', err.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            else if (!product) {
                        return res.status(404).send('Product not found');
            }
            else {
                res.render('product', { product });
            }
        })
    })
});

module.exports = router;