const express = require('express');
const db = require('../../config/db');
const router = express.Router();
const jsw = require('jsonwebtoken');
require('dotenv').config();
const { setProductToCart } = require('../../config/db.prepare')

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

router.post('/addToCart', async (req, res) => {
    const { productId } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    let user_id;
    try {
        const decoded = jsw.verify(token, process.env.SECRET);

        if (!decoded || !decoded.dbres2 || !decoded.dbres2.id) {
            return res.status(401).json({ error: 'Token structure invalid' });
        }

        user_id = decoded.dbres2.id;
    } catch (err) {
        console.error("JWT decode error:", err.message);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }

    db.serialize(() => {
        db.get('SELECT product_ids from carts where user_id = ?', [user_id], (err2, res2) => {
            if (err2) {
                console.error('Erreur UPDATE :', err3.message);
                res.status(500).json({ error: 'Erreur get data from cart' });
            } else {
                let new_list;
                if (res2.product_ids == '') {
                    new_list = productId;
                } else {
                    new_list = res2.product_ids + ';' + productId
                }
                setProductToCart.run([new_list, user_id], (err3) => {
                    if (err3) {
                        console.error('Erreur UPDATE :', err3.message);
                        res.status(500).json({ error: 'Erreur mise à jour panier' });
                    } else {
                        res.status(200).json({ status: 'ok', message: 'Produit ajouté' });
                    }
                });
            }
        })
    })
});

module.exports = router;
