module.exports = db = {
    mydb : {
        host: "csdb.brockport.edu",
        user: "mroth5",
        password: "1234",
        database: "fal24_csc423_mroth5"
    },

    selectAll: async function (conn, tableName) {
        const results = await conn.promise().query(`SELECT * FROM ${tableName}`);

        return results[0];
    },

    //can add role later if needed
    getOne : async function(conn, tableName, name, password) {
        const sql = `SELECT * FROM ${tableName} WHERE name = '${name}' AND
        password = '${password}'`;
        const results = await conn.promise().query(sql);

        return results[0];
    },

    addOne : async function(conn, tableName, user) {

        const newValues = `"${user.name}", "${user.address}",
        "${user.password}"`;

        const sql = `INSERT INTO ${tableName} (name,address,password)
        Values (${newValues})`;

        const results = await conn.promise().query(sql);

        return results;
    }
};