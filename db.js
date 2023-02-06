const mysql = require('mysql');
const conn = mysql.createConnection({
 host: process.env.DB_HOST,
 user: process.env.DB_USER,
 database: process.env.DB_NAME,
});

conn.connect();

module.exports = conn;