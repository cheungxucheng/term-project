const express = require('express');
const path = require('path');
const app = express();
app.use(express.json())

app.use(express.static(path.join(__dirname, '..', '..', 'public')));
app.set('view engine', 'pug');
app.set('views', './views');
require('dotenv').config();
require('./routes/auth/auth')(app);
//require('./routes/user/user')(app);
//require('./routes/todos/todos')(app);
const storefrontRoutes = require('./routes/storefront/storefront');
const productRoutes = require('./routes/product/product');
const checkoutRoutes = require('./routes/checkout/checkout');
const port = process.env.PORT

app.use('/checkout', checkoutRoutes);
app.use('/storefront', storefrontRoutes);
app.use('/product', productRoutes);

app.listen(port , () => {
    console.log(`API at http://localhost:${port}`);
});