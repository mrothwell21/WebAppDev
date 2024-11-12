const jwt = require("jwt-simple");
const { error } = require("console");
const router = require("express").Router();

const mysql = require('mysql2');
const db = require("../models/mysql-services");
const { secret } = db;

router.post("/change", async function (req, res) {

    if (!req.headers["x-auth"]) {
        return res.status(401).json({ error: "Missing X-Auth headers" });
    }
    else if (!req.body.username || !req.body.currentPassword || !req.body.newPassword) {
        res.status(401).json({ error: "Missing username and/or password" });
        return;
    }
    else {

        const conn = mysql.createConnection(db.mydb);

        const user = await db.getOne(conn, "User", req.body.name, req.body.currentPassword);
        if (!user || !user.length) {
            res.status(401).json({ error: "Current password does not match!" });
        }
        else {

            if (req.body.currentPassword != user.password && req.body.newPassword == req.body.confirmPassword) {
                const update = await db.updatePass(conn, "User", req.body.currentPassword, req.body.newPassword, req.body.name);

                const token = jwt.encode({ Username: user.username, Password: user.password }, secret);
                res.status(200).json({ token: token });
            }
        }
    }


    return;
});

router.get("/getAll", async function (req, res) {
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