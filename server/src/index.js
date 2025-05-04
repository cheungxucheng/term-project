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
const storefrontRoutes = require('./routes/storefront/storefront')
const port = process.env.PORT

app.use('/storefront', storefrontRoutes);

app.listen(port , () => {
    console.log(`API at http://localhost:${port}`);
});