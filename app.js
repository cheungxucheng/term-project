const express = require('express');
require('dotenv').config();
const app = express();
const path = require('path');
const db = require('./src/config/db');
const cookieParser = require('cookie-parser');

// Routes
const storefrontRoutes = require('./src/routes/storefront/storefront');
const productRoutes = require('./src/routes/product/product');
const checkoutRoutes = require('./src/routes/checkout/checkout');
const profileRoutes = require('./src/routes/profile/profile');
const searchRoutes = require('./src/routes/search/search');
const faqRoutes = require('./src/routes/faq/faq');
const aboutRoutes = require('./src/routes/about/about');
const authRoutes = require('./src/routes/auth/auth');

const port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/checkout', checkoutRoutes);
app.use('/storefront', storefrontRoutes);
app.use('/product', productRoutes);
app.use('/profile', profileRoutes);
app.use('/search', searchRoutes);
app.use('/faq', faqRoutes);
app.use('/about', aboutRoutes);
authRoutes(app); // Setup /login and /registration routes

// Serve static login/registration pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login', 'index.html'));
});

app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'registration', 'index.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact', 'index.html'));
});

app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
});
