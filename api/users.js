const jwt = require("jwt-simple");
const { error } = require("console");
const router = require("express").Router();

const mysql = require('mysql2');
const db = require("../mysql-services");
const { decode } = require("punycode");
const { secret } = db;

router.post("/auth", async function (req, res) {
    if (!req.body.name || !req.body.password) {
        res.status(401).json({ error: "Missing username, password and/or role" });
        return;
    }

    const conn = mysql.createConnection(db.mydb);
    const user = await db.getOne(conn, "User", req.body.name, req.body.password);

    if (!user || !user.length) {
        res.status(401).json({ error: "Bad username and/or password" });
        console.log("bad username and/or password");
    } else {
        const token = jwt.encode({ Username: user[0].username, Password: user[0].password }, secret);
        res.status(200).json({ token: token});
    }
    return;
});

router.get("/getAll", async function (req, res){
    
    const conn = mysql.createConnection(db.mydb);
    const user = await db.selectAll(conn, "User");
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
        const user = await db.getOne(conn, "User", decoded.Username, decoded.Password);
        res.json(user[0]);
    }
    catch (ex) {
        res.status(401).json({ error: "Invalid JWT" });
    }
});
module.exports = router;