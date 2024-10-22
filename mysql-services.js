const mariadb = require('mariadb');

module.exports = db = {
    mydb: {
        host: "csdb.brockport.edu",
        user: "mroth5",
        password: "1234",
        database: "fal24_csc423_mroth5",
        connectionLimit: 5 // Optional: connection pool limit
    },

    // Create a pool for connection management
    pool: mariadb.createPool({
        host: "csdb.brockport.edu",
        user: "mroth5",
        password: "1234",
        database: "fal24_csc423_mroth5",
        connectionLimit: 5
    }),

    selectAll: async function(conn, tableName) {
        try {
            const results = await conn.query(`SELECT * FROM ${tableName}`);
            return results;
        } catch (err) {
            console.error('Error in selectAll:', err);
            throw err;
        }
    },

    getOne: async function(conn, tableName, name, password) {
        try {
            // Using parameterized queries for security
            const sql = `SELECT * FROM ${tableName} WHERE username = ? AND password = ?`;
            const results = await conn.query(sql, [name, password]);
            return results;
        } catch (err) {
            console.error('Error in getOne:', err);
            throw err;
        }
    },

    addOne: async function(conn, tableName, user) {
        try {
            // Using parameterized queries for security
            const sql = `INSERT INTO ${tableName} (name, address, password) VALUES (?, ?, ?)`;
            const results = await conn.query(sql, [user.name, user.address, user.password]);
            return results;
        } catch (err) {
            console.error('Error in addOne:', err);
            throw err;
        }
    }
};