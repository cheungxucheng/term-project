const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('faq');
});

module.exports = router;