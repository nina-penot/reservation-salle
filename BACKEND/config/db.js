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

// Fonction utilitaire pour les requêtes
export async function query(sql, params = []) {
    const [results] = await pool.execute(sql, params);
    return results;
}

// Test de connexion
export async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('MySQL connecté');
        connection.release();
        return true;
    } catch (error) {
        console.error('Erreur MySQL:', error.message);
        return false;
    }
}

export default pool;