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
const searchRoutes = require('./src/routes/search/search');
const faqRoutes = require('./src/routes/faq/faq');
const aboutRoutes = require('./src/routes/about/about');
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
app.use('/faq', faqRoutes)
app.use('/about', aboutRoutes)

require('./src/routes/auth/auth')(app);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login', 'index.html'));
});

app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'registration', 'index.html'));
})

app.listen(port , () => {
    console.log(`API at http://localhost:${port}`);
});

//Render Profile with orders
const sqlite3 = require('sqlite3').verbose();

app.get('/profile', (req, res) => {
    const token = req.cookies.authToken; 

    if (!token) return res.redirect('/');

    const user = parseJwt(token).dbres2;
    const userId = user.id;

    const db = new sqlite3.Database('./database.sqlite');

    db.all("SELECT * FROM carts WHERE user_id = ?", [userId], (err, orders) => {
        if (err) return res.status(500).send("Could not load orders.");

        res.render("profile", {
            user: user,
            orders: orders
        });
    });
});

// Helper to decode JWT 
function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
