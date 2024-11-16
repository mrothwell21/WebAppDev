module.exports = db = {
    mydb : {
        host: "webappdev-webappdev.b.aivencloud.com",
        user: "avnadmin",
        password: "AVNS_yvUKc4DsBnUuplfviLU",
        database: "webappdev",
        port: "19255"
    },

    secret: require('crypto').randomBytes(64).toString('hex'),

    selectAll: async function (conn, tableName) {
        const results = await conn.promise().query(`SELECT * FROM ${tableName}`);

        return results[0];
    },

    //can add role later if needed
    getOne : async function(conn, tableName, name, password) {
        const sql = `SELECT * FROM ${tableName} WHERE username = '${name}' AND
        password = '${password}'`;
        const results = await conn.promise().query(sql);
        //console.log(results);

        return results[0];
    },

    addOne : async function(conn, tableName, user) {

        const newValues = `"${user.name}", "${user.address}",
        "${user.password}"`;

        const sql = `INSERT INTO ${tableName} (name,address,password)
        Values (${newValues})`;

        const results = await conn.promise().query(sql);

        return results;
    },

    getMajorByUsername: async function(conn, username) {
        const sql = `
            SELECT Major.name 
            FROM Major
            JOIN UserInMajor ON Major.majorid = UserInMajor.majorid
            JOIN User ON User.userid = UserInMajor.userid
            WHERE User.username = ?`;
    
        const results = await conn.promise().query(sql, [username]);
        return results;
    },

    getCoursesByUsername: async function(conn, username) {
        const sql = `
            SELECT Major.prefix, Course.courseId
            FROM User
            JOIN CoursesToUser ON User.userId = CoursesToUser.userId
            JOIN Course ON CoursesToUser.courseId = Course.courseId
            JOIN CourseInMajor ON Course.courseId = CourseInMajor.courseId
            JOIN Major ON CourseInMajor.majorId = Major.majorId
            WHERE User.username = ?`;
    
        const results = await conn.promise().query(sql, [username]);
        return results;
    },

    updatePass : async function(conn, tableName, currentPass, newPass, name){

        const sql = `UPDATE ${tableName} SET password = '${newPass}'WHERE password = '${currentPass}' AND username = '${name}'`;

        const results = await conn.promise().query(sql);

        return results;
    },

    updateLastLogin : async function(conn, username){

        const now = new Date();
        const formattedTimestamp = now.toISOString().slice(0, 19).replace('T', ' ');

        const sql = `UPDATE User SET lastLogin = '${formattedTimestamp}' WHERE username = '${username}'`;

        const results = await conn.promise().query(sql);

        return results;

    }
};