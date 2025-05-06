const sqlite3 = require('sqlite3').verbose();
const dbPath = './database.sqlite';

require('dotenv').config();

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database: ', err.message);
    } else {
        console.log(`Connected to the SQLite database: ${dbPath}`);
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            lastname TEXT NOT NULL,
            firstname TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )`
    );
});

module.exports = db