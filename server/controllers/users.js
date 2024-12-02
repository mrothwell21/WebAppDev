const jwt = require("jwt-simple");
const { error } = require("console");
const router = require("express").Router();

const mysql = require('mysql2');
const db = require("../models/mysql-services");
const { decode } = require("punycode");
const { secret } = db;

router.post("/auth", async function (req, res) {
    if (!req.body.user || !req.body.password) {
        res.status(401).json({ error: "Missing username, password and/or role" });
        return;
    }

    const conn = mysql.createConnection(db.mydb);
    const user = await db.getOne(conn, "User", req.body.user, req.body.password);

    if (!user || !user.length) {
        res.status(401).json({ error: "Bad username and/or password" });
        console.log("bad username and/or password");
    } else {
        const token = jwt.encode({ Username: user[0].username, Password: user[0].password }, secret);
        res.status(200).json({ token: token });
        // , user: { username: user[0].username, role: user[0].role }
    }
    return;
});

router.get("/getAll", async function (req, res) {

    const conn = mysql.createConnection(db.mydb);
    const user = await db.selectAll(conn, "User");
    res.status(200).json(user);
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
        res.status(200).json({ role: user[0].role, username: user[0].username });
    }
    catch (ex) {
        res.status(401).json({ error: "Invalid JWT" });
    }
});

router.post("/time", async function (req, res) {

    if (!req.body.token) {
        res.status(401).json({ error: "Missing token" });
        return;
    }

    const decoded = jwt.decode(req.body.token, secret);

    const conn = mysql.createConnection(db.mydb);

    const user = await db.updateLastLogin(conn, decoded.Username);

    if (!user || !user.length) {
        res.status(401).json({ error: "Bad username" });
    } else {
        res.status(200).json({compelete: true});
    }
    return;
});

router.post("/update", async function (req, res) {
    if (!req.headers["x-auth"]) {
        return res.status(401).json({ error: "Missing X-Auth headers" });
    }

    const token = req.headers["x-auth"];

    const conn = mysql.createConnection(db.mydb);
    const user = await db.getUserAndUpdate(conn, req.body);
    res.status(200).json(user);
});

router.post("/create", async function (req, res) {
    if (!req.headers["x-auth"]) {
        return res.status(401).json({ error: "Missing X-Auth headers" });
    }

    const token = req.headers["x-auth"];

    const conn = mysql.createConnection(db.mydb);
    const user = await db.addOne(conn, "User", req.body);
    res.status(200).json(user);
});


module.exports = router;