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
            WHERE User.username = '${username}'`;
    
        const results = await conn.promise().query(sql);
        return results;
    },

    getCoursesByUsername: async function(conn, username) {
        const sql = `
            SELECT Major.prefix, Course.courseId, Course.status
            FROM User
            JOIN CoursesToUser ON User.userId = CoursesToUser.userId
            JOIN Course ON CoursesToUser.courseId = Course.courseId
            JOIN CourseInMajor ON Course.courseId = CourseInMajor.courseId
            JOIN Major ON CourseInMajor.majorId = Major.majorId
            WHERE User.username = '${username}'`;
    
        const results = await conn.promise().query(sql);
        return results;
    },

    getCoursesByMajor: async function(conn, major) {
        const sql = `
            SELECT Major.prefix, Course.courseId
            FROM Major 
            JOIN CourseInMajor on Major.majorId = CourseInMajor.majorId 
            JOIN Course on CourseInMajor.courseId = Course.courseId
            WHERE Major.name = '${major}'`;
    
        const results = await conn.promise().query(sql);
        return results;
    },

    getCoursesByMajorWithCapacity: async function(conn, major) {
        const sql = `
            SELECT Major.prefix, Course.courseId, Course.currentEnrollment, Course.maxCapacity
            FROM Major 
            JOIN CourseInMajor on Major.majorId = CourseInMajor.majorId 
            JOIN Course on CourseInMajor.courseId = Course.courseId
            WHERE Major.name = '${major}'`;
    
        const results = await conn.promise().query(sql);
        return results;
    },

    registerCourse: async function(conn, username, courseId, prefix) {
        const sql = `
        INSERT INTO CoursesToUser (courseId, userId) 
        SELECT c.courseId, u.userId
        FROM User u, Course c JOIN CourseInMajor ON c.courseId = CourseInMajor.courseId
        JOIN Major m ON m.majorId = CourseInMajor.majorId
        WHERE m.prefix = '${prefix}' AND c.courseId = '${courseId}' AND u.username = '${username}';
        UPDATE Course c
        SET c.currentEnrollment = c.currentEnrollment + 1
        WHERE c.courseId = '${courseId}' 
        AND c.currentEnrollment < c.maxCapacity;`;


        const results = await conn.promise().query(sql);
        return results;
    },

    dropCourse: async function(conn, username, courseId, prefix) {
        const sql = `
        UPDATE CoursesToUser cu
        SET cu.status = 'Inactive'
        WHERE cu.userId = (SELECT u.userId
        FROM User u, Course c JOIN CourseInMajor ON c.courseId = CourseInMajor.courseId
        JOIN Major m ON m.majorId = CourseInMajor.majorId
        WHERE m.prefix = '${prefix}' AND c.courseId = '${cNum}' AND u.username = '${username}');
        UPDATE Course c
        SET c.currentEnrollment = c.currentEnrollment - 1
        WHERE c.courseId = '${courseId}' 
        AND c.currentEnrollment > 0;`;



        const results = await conn.promise().query(sql);
        return results;
    },

    getStudentsInCourse: async function(conn, courseId) {
        const sql =  `
            SELECT U.firstName, U.lastName, Cu.status
            FROM User U
            JOIN CoursesToUser Cu ON U.userId = Cu.userId
            WHERE Cu.courseId = '${courseId}' AND U.role = 3`;

        const results = await conn.promise().query(sql);
        return results;
    },

    setActiveInactiveCourse: async function(conn, courseId) {
        const sql = `
        UPDATE Course C
        SET C.status = IF(C.status = 'Active', 'Inactive', 'Active')
        WHERE C.courseId = '${courseId}'`;

        const results = await conn.promise().query(sql);
        return results;
    },

    addCourse: async function(conn, courseId, name, max, majorId, description) {
        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19).replace('T', ' ');
        
        const sql = `
        INSERT INTO Course
        (courseId, name, description, maxCapacity, currentEnrollment, lastUpdated) 
        VALUES
        ('${courseId}', '${name}', '${description}', '${maxCapacity}', '0', ${localISOTime});

        INSERT INTO CourseInMajor
        (courseId, majorId)
        VALUES
        ('${courseId}', '${majorId}');

        INSERT INTO CoursesToUser
        (userId, courseId)
        VALUES
        ('${userId}', '${courseId}');`;

        const results = await conn.promise().query(sql);
        return results;
    },

    updateCourse: async function(conn, courseId, name, max, description) {
        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19).replace('T', ' ');

        const sql = `
        UPDATE Course
        SET 
        name = '${name}', 
        description = '${description}', 
        maxCapacity = '${max}', 
        lastUpdated = '${localISOTime}'
        WHERE courseId = '${courseId}';`;

        const results = await conn.promise().query(sql);
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