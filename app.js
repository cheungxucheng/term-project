const express = require('express');
require('dotenv').config();
const app = express();
var path = require('path');
const bodyParser = require('body-parser');
const db = require('./src/config/db');
const storefrontRoutes = require('./src/routes/storefront/storefront');
const productRoutes = require('./src/routes/product/product');
const checkoutRoutes = require('./src/routes/checkout/checkout');
const profileRoutes = require('./src/routes/profile/profile');
const searchRoutes = require('./src/routes/search/search')
const port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
//app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/checkout', checkoutRoutes);
app.use('/storefront', storefrontRoutes);
app.use('/product', productRoutes);
app.use('/profile', profileRoutes);
app.use('/search', searchRoutes);

require('./src/routes/auth/auth')(app);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login', 'index.html'));
});

app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'registration', 'index.html'));
})

app.get('/faq', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'FAQ', 'index.html'));
})

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'About', 'index.html'));
})

app.listen(port , () => {
    console.log(`API at http://localhost:${port}`);
});