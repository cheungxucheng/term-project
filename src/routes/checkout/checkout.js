const express = require('express');
const jsw = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();
const db = require('../../config/db');
const { setProductToCart } = require('../../config/db.prepare')
const { addOrderToHistory } = require('../../config/db.prepare')

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

router.post('/api', (req, res) => {
    const authHeader = req.headers.authorization;
    const { product_id, index } = req.body

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
                let new_list = []
                if (list_products[index] === product_id) {
                    list_products.forEach((element, index2) => {
                        if (index2 != index) {
                            new_list.push(element)
                        }
                    });
                }
                const tmp = new_list.join(';')
                setProductToCart.run([tmp, user_id], (err3) => {
                    if (err3) {
                        console.error('Erreur UPDATE :', err3.message);
                        res.status(500).json({ error: 'Erreur mise à jour panier' });
                    } else {
                        res.status(200).json({ status: 'ok', message: 'Produit supprimer' });
                    }
                });
            }
        })
    })
})

router.post('/purchase', (req, res) => {
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
                const list_products = result.product_ids.split(';').filter(id => id);               
                let order_total = 0;

                Promise.all(list_products.map(id => {
                    return new Promise((resolve, reject) => {
                        db.get('SELECT price FROM Products WHERE id = ?', [id], (err, row) => {
                            if (err) return reject(err);
                            if (!row) return resolve(0); // if product not found
                            resolve(row.price);
                        });
                    });
                }))
                .then(prices => {
                    const totalPrice = prices.reduce((acc, curr) => acc + curr, 0);
                    db.run(`INSERT INTO Orders (user_id, order_total, status) VALUES (?, ?, ?)`, [user_id, totalPrice, 'Completed'], (err3) => {
                        if (err3) {
                            console.error('Error Update :', err3.message);
                            res.status(500).json({ error: 'Error adding orders to history.' });
                        }
                        setProductToCart.run(["", user_id], (err4) => {
                            if (err4) {
                                console.error('Error deleting list:', err4.message);
                                return res.status(500).json({ error: 'Error deleting user cart' });
                            }

                            return res.status(200).json({ status: 'ok', message: 'Cart cleared' });
                        });
                    });
                })
                .catch(err => {
                    console.error("Error calculating total:", err.message);
                    return res.status(500).json({ error: 'Error calculating total price.' });
                });
            }
        });
    })
});

module.exports = router;