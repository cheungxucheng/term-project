const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ouvre la base de données
const db = new sqlite3.Database(path.resolve(__dirname, './../../database.sqlite'));

// Auth
exports.register = db.prepare(`
    INSERT INTO Users (lastname, firstname, email, password) values (?, ?, ?, ?)
`);
exports.loginPasswword = db.prepare(`
    SELECT password FROM Users WHERE email = ?
`);
exports.loginDatas = db.prepare(`
    SELECT * FROM Users WHERE email = ? AND password = ?
`);
