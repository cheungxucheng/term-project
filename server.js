const express = require('express');
require('dotenv').config();
const app = express();
var path = require('path');
const db = require('./config/db');
const storefrontRoutes = require('./routes/storefront/storefront');
const productRoutes = require('./routes/product/product');
const checkoutRoutes = require('./routes/checkout/checkout');
const port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/checkout', checkoutRoutes);
app.use('/storefront', storefrontRoutes);
app.use('/product', productRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login', 'index.html'));
});

app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'registration', 'index.html'));
})

app.listen(port , () => {
    console.log(`API at http://localhost:${port}`);
});