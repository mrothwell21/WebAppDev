const jwt = require("jwt-simple");
const { error } = require("console");
const router = require("express").Router();
const secret = "webappdev";

const mariadb = require('mariadb');
const db = require("../mysql-services");  // Assuming you've updated this file for MariaDB

// Create a pool instead of individual connections
const pool = mariadb.createPool(db.mydb);

router.post("/auth", async function (req, res) {
    let conn;
    try {
        console.log("auth");
        if (!req.body.name || !req.body.password) {
            res.status(401).json({ error: "Missing username, password and/or role" });
            return;
        }

        conn = await pool.getConnection();
        console.log("connected");
        
        const user = await db.getOne(conn, "User", req.body.name, req.body.password);
        console.log("query");

        if (!user || !user.length) {
            res.status(401).json({ error: "Bad username and/or password" });
            return;
        }

        const userObj = user[0];  // Get first user object from results
        const user_role = userObj.role;
        
        const token = jwt.encode({ Username: userObj.username }, secret);
        res.status(200).json({ token: token, role: user_role });
        
        console.log("response");
    } catch (err) {
        console.error('Error in auth:', err);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        if (conn) await conn.release();
    }
});

router.get("/getAll", async function (req, res) {
    let conn;
    try {
        console.log("getAll");
        conn = await pool.getConnection();
        console.log("connected");
        
        const users = await db.selectAll(conn, "User");
        console.log("query");
        res.status(200).json(users);
    } catch (err) {
        console.error('Error in getAll:', err);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        if (conn) await conn.release();
    }
});

router.get("/status", async function (req, res) {
    let conn;
    try {
        if (!req.headers["x-auth"]) {
            return res.status(401).json({ error: "Missing X-Auth headers" });
        }

        const token = req.headers["x-auth"];
        const decoded = jwt.decode(token, secret);
        
        conn = await pool.getConnection();
        const users = await db.selectAll(conn, "User");
        res.json(users);
    } catch (err) {
        console.error('Error in status:', err);
        if (err.message === "Invalid JWT") {
            res.status(401).json({ error: "Invalid JWT" });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    } finally {
        if (conn) await conn.release();
    }
});

module.exports = router;