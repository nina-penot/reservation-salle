import mysql from 'mysql2/promise';

//Creating pool to access db informaiton
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'starter_kit',
    waitForConnections: true,
    connectionLimit: 10
});