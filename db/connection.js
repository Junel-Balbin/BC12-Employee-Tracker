// Imports MySQL Database.
const mysql = require('mysql2');

// Create MySQL Database connection.
const db = mysql.createConnection({
    host: 'localhost',
    password: 'Wecandoit01!',
    user: 'root',
    database: 'employeeTracker_db',
});

// Exports db.
module.exports = db;
