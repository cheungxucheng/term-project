const express = require('express');
require('dotenv').config();
const app = express();
var path = require('path');
const db = require('./config/db');
const port = process.env.PORT

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login', 'index.html'));
});

app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'registration', 'index.html'));
})

app.listen(port , () => {
    console.log(`API at http://localhost:${port}`);
});