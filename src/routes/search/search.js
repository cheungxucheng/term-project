const express = require('express');
const db = require('../../config/db');
const router = express.Router();

router.get('/', (req, res) => {

    // db.serialize(() => {
    //     db.all('SELECT * FROM Products', [], (err, products) => {
    //         if (err) {
    //             console.error('Error fetching products:', err.message);
    //             res.status(500).json({ error: 'Internal Server Error' });
    //         }
    //         res.render('storefront', { products });
    //     });
    // })
});

router.post('/', (req, res) => {
    const keyword = `%${req.body.keyword}%`;
    const query = `SELECT * FROM products WHERE name LIKE ?`;

    db.all(query, [keyword], (err, rows) => {
        if (err) return res.status(500).send("Database error");
        res.render('search', {products: rows, keyword: req.body.keyword })
    });
});
module.exports = router;