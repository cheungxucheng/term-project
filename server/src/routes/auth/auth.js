const jsw = require('jsonwebtoken');
const db = require('../../config/db');
const {register, login} = require('./auth.query')
require('dotenv').config();
var bcrypt = require('bcryptjs');

module.exports = function(app) {
    app.post("/register", (req, res) => {
        var email = req.body.email
        var password = req.body.password
        var name = req.body.name
        var firstname = req.body.firstname
        if (email === undefined || password === undefined ||
            name === undefined || firstname === undefined)
            return res.status(500).json({ msg: "Internal server error" })
        let query = `SELECT * FROM user WHERE email = "${email}"`
        password = bcrypt.hashSync(password, 10)
        let query2 = `INSERT INTO user (email, password, name, firstname) VALUES ("${email}", "${password}", "${name}", "${firstname}")`
        register(res, query, query2, jsw, email, password)
    });
    app.post("/login", (req, res) => {
        let email = req.body.email
        let password = req.body.password
        if (email === undefined || password === undefined)
            return res.status(500).json({ msg: "internal server error" })
        let query = `SELECT password, id FROM user WHERE email = "${email}"`
        let query2 = `SELECT * FROM user WHERE email = "${email}", password = "${password}""`
        login(res, query, jsw, password, email, bcrypt, query2)
    });
}