const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    if (!product) return res.status(404).send('Product not found');
    res.render('product', { product });
});

module.exports = router;