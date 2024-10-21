module.exports = db = {
    mydb : {
        host: "localhost",
        user: "root",
        password: "",
        database: "webappdev"
    },

    selectAll: async function (conn, tableName) {
        const results = await conn.promise().query(`SELECT * FROM ${tableName}`);

        return results[0];
    },

    //can add role later if needed
    getOne : async function(conn, tableName, name, password) {
        const sql = `SELECT * FROM ${tableName} WHERE username = '${name}' AND
        password = '${password}'`;
        const results = await conn.promise().query(sql);
        console.log(results);

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