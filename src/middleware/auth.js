const jsw = require('jsonwebtoken');
const db = require('../../config/db');
var bcrypt = require('bcryptjs'); 
require('dotenv').config();
const {
    register,
    loginPasswword,
    loginDatas
} = require('./../../config/db.prepare');

const color_green = '\x1b[32m%s\x1b[0m';
const color_red = '\x1b[31m%s\x1b[0m';

module.exports = function(app) {
    app.post("/registration", (req, res) => {
        const { email, firstname, password, lastname } = req.body;

        db.serialize(() => {
            register.run(lastname, firstname, email, bcrypt.hashSync(password, 10), function(err) {
                if (err) {
                    if (err.message.includes('UNIQUE constraint failed')) {
                        console.error(color_red, "POST Error register: Email already exist");
                        res.status(500).json({ status: 'ko', result: 'Email already exist' });
                    } else {
                        console.error("Error register:", err.message);
                        res.status(403);
                    }
                } else {
                    db.get(`SELECT id FROM Users WHERE lastname = ? AND firstname = ? AND email = ?`, [lastname, firstname, email], (err, result) => {
                        if (err) {
                            console.error(color_red, "POST Error register: Email already exist");
                            res.status(500).json({ status: 'ko', result: 'Email already exist' });
                        } else {
                            db.run(`INSERT INTO carts (user_id, product_ids) VALUES (?, ?)`, [result.id, ""], (err) => {
                                if (err) {
                                    console.error(color_red, "POST Error register: Email already exist");
                                    res.status(500).json({ status: 'ko', result: 'create carts' });
                                } else {
                                    console.log(color_green, "POST request Success: register");
                                    const token = jsw.sign({ id: result.id, email: req.body.email, password: req.body.password }, process.env.SECRET);

                                    // Optional: Set authToken cookie on registration as well
                                    res.cookie('authToken', token, {
                                        httpOnly: true,
                                        secure: false, // Set to true in production with HTTPS
                                        maxAge: 3600000
                                    });

                                    res.status(200).json({ status: 'ok', token: token });
                                }
                            });
                        }
                    });
                }
            });
        });
    });

    app.post("/login", (req, res) => {
        db.serialize(() => {
            loginPasswword.get(req.body.email, (err, dbres) => {
                if (dbres === undefined) {
                    console.log(color_red, "POST Error login: Wrong email.");
                    res.status(401).json({ msg: "Invalid Credentials" });
                } else {
                    if (bcrypt.compareSync(req.body.password, dbres.password)) {
                        loginDatas.get(req.body.email, dbres.password, (err, dbres2) => {
                            if (err) {
                                console.log(color_red, "POST Error login: Wrong email.");
                                res.status(401).json({ status: 'ko', result: "Invalid Credentials" });
                            } else {
                                const token = jsw.sign({ dbres2 }, process.env.SECRET);

                                // ✅ Added: Set the JWT as a cookie
                                res.cookie('authToken', token, {
                                    httpOnly: true,
                                    secure: false, // Set to true in production with HTTPS
                                    maxAge: 3600000 // 1 hour
                                });

                                console.log(color_green, "POST request Success: login.");
                                res.status(200).json({ status: 'ok', token: token });
                            }
                        });
                    } else {
                        console.log(color_red, "POST Error login: Wrong password.");
                        res.status(401).json({ status: 'ko', result: "Invalid Credentials" });
                    }
                }
            });
        });
    });
}
