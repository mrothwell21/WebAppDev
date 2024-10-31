const jwt = require("jwt-simple");
const { error } = require("console");
const router = require("express").Router();

const mysql = require('mysql2');
const db = require("../mysql-services");
const { secret } = db;

router.post("/change", async function (req, res) {
    if (!req.body.name || !req.body.currentPassword || !req.body.newPassword) {
        res.status(401).json({ error: "Missing username and/or password" });
        return;
    }

    const conn = mysql.createConnection(db.mydb);
    //console.log("connected");
    const user = await db.updatePass(conn, "User", req.body.currentPassword, req.body.newPassword, req.body.name);
    //console.log("query");
    const user_role = user[0].role;
    //console.log(user_role);


    if (!user || !user.length) {
        res.status(401).json({ error: "Bad username and/or password" });
    } else {
        const token = jwt.encode({ Username: user.username, Password: user.password}, secret);
        res.status(200).json({ token: token});
    }
    // console.log("response");
    return;
});

router.get("/getAll", async function (req, res){
    console.log("getAll");
    
    const conn = mysql.createConnection(db.mydb);
    console.log("connected");
    const user = await db.selectAll(conn, "User");
    console.log("query");
})

router.get("/status", async function (req, res) {
    //check if X-Auth header is set:
    if (!req.headers["x-auth"]) {
        return res.status(401).json({ error: "Missing X-Auth headers" });
    }

    const token = req.headers["x-auth"]; // X-Auth should contain the token
    try {
        const decoded = jwt.decode(token, secret);
        const conn = mysql.createConnection(db.mydb);
        const users = await db.selectAll(conn, "User");
        res.json(users);
    }
    catch (ex) {
        res.status(401).json({ error: "Invalid JWT" });
    }
});
module.exports = router;