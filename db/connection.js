const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    password: 'Wecandoit01!',
    user: 'root',
    database: 'employeeTracker_db',
});

module.exports = db;
