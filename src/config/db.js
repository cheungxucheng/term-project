const sqlite3 = require('sqlite3').verbose();
const dbPath = './database.sqlite';
const products = require('./productsConfig');

require('dotenv').config();

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error('Error opening database: ', err.message);
    } else {
        console.log(`Connected to the SQLite database: ${dbPath}`);
        initializeDatabase();
    }
});

function initializeDatabase() {
    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS Users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                lastname TEXT NOT NULL,
                firstname TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS Products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE,
                price REAL NOT NULL,
                description TEXT,
                imageUrl TEXT
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS Carts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INT UNIQUE NOT NULL,
                product_ids TEXT,
                FOREIGN KEY (user_id) REFERENCES Users(id)
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS Orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                order_total REAL,
                status TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES Users(id)
            )
        `, () => {
            // insertDefaultProducts();
        });

    });
}

function insertDefaultProducts() {
    // db.run(` 
    //     DELETE FROM Products    
    // `);
    const insertStmt = db.prepare(`
        INSERT OR IGNORE INTO Products (name, price, description, imageUrl)
        VALUES (?, ?, ?, ?)
    `);

    products.forEach(product => {
        insertStmt.run(product.name, product.price, product.description, product.imageUrl);
    });

    insertStmt.finalize(() => {
        console.log('Default products checked/inserted.');
    });
}

module.exports = db
