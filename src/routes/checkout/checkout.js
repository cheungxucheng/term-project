const express = require('express');
const jsw = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();
const db = require('../../config/db');
    
router.get('/', (req, res) => {
    res.render('checkout');
});

router.get('/api', (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Aucun token fourni' });
    }
  
    const token = authHeader.split(' ')[1];

    const decoded = jsw.verify(token, process.env.SECRET)
    const user_id = decoded.dbres2.id;

    db.serialize(() => {
        db.get(`SELECT product_ids FROM carts WHERE user_id = ?`, [user_id], (err, result) => {
            if (err) {
                console.error('Error fetching products:', err.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            } else {
                const list_products = result.product_ids.split(';');
    
                function getProductById(id) {
                    return new Promise((resolve, reject) => {
                        db.get('SELECT * FROM Products WHERE id = ?', [id], (err, row) => {
                            if (err) return reject(err);
                                resolve(row);
                        });
                    });
                }
    
                Promise.all(list_products.map(getProductById))
                .then(products => {
                    res.send({ products: products })
                })
                .catch(err => {
                    console.error("Erreur :", err.message);
                });
            }
        })
    })
})

module.exports = router;