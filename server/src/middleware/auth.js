const jsw = require('jsonwebtoken')
require('dotenv').config();

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (!token)
        return res.status(401).json({ msg: "No token, authorization denied" })
    jsw.verify(token, process.env.SECRET, (err, req, user) => {
        if (err)
            return res.status(401).json({ msg: "Invalid credentials" })
        req.user = user
        next()
    });
}