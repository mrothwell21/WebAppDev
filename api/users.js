const jwt = require("jwt-simple");
const { error } = require("console");
const router = require("express").Router();

const secret = "webappdev";

const mysql = require('mysql2');
const db = require("../mysql-services");

router.post("/auth", async function (req, res) {
    if (!req.body.name || !req.body.password) {
        res.status(401).json({ error: "Missing username, password and/or role" });
        return;
    }

    const conn = mysql.createConnection(db.mydb);
    // console.log("connected");
    const user = await db.getOne(conn, "User", req.body.name, req.body.password);
    // console.log("query");


    if (!user || !user.length) {
        res.status(401).json({ error: "Bad username and/or password" });
        console.log("bad username and/or password");
        console.log(user);
    } else {
        const user_role = user[0].role;
        const token = jwt.encode({ Username: user.username }, secret);
        res.status(200).json({ token: token, role: user_role });
    }
    console.log("response");
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