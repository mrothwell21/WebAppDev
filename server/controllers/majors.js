const jwt = require("jwt-simple");
const router = require("express").Router();
const mysql = require('mysql2');
const db = require("../models/mysql-services");
const { secret } = db;


router.get("/getAll", async function (req, res) {
    if (!req.headers["x-auth"]) {
        return res.status(401).json({ error: "Missing X-Auth header" });
    }

    const token = req.headers["x-auth"];

    try {
        // const decoded = jwt.decode(token, secret);
        const conn = mysql.createConnection(db.mydb);
        const [results] = await db.selectAllMajors(conn, "Major");

        if (!results || results.length === 0) {
            return res.status(404).json({ error: "No majors found" });
        }

        res.status(200).json(results);
    } catch (ex) {
        console.error("Error getting all majors:", ex);
        res.status(401).json({ error: "Invalid JWT or database error" });
    }
});

router.post("/update", async function (req, res) {
    if (!req.headers["x-auth"]) {
        return res.status(401).json({ error: "Missing X-Auth headers" });
    }

    const token = req.headers["x-auth"];

    const conn = mysql.createConnection(db.mydb);
    const user = await db.getMajorAndUpdate(conn, "Major", req.body);
    res.status(200).json(user);
});

router.post("/create", async function (req, res) {
    if (!req.headers["x-auth"]) {
        return res.status(401).json({ error: "Missing X-Auth headers" });
    }

    const token = req.headers["x-auth"];

    const conn = mysql.createConnection(db.mydb);
    const major = await db.addMajor(conn, "Major", req.body);
    res.status(200).json(major);
});

router.get("/checkid/:majorId", async function (req, res){
    if (!req.headers["x-auth"]) {
        return res.status(401).json({ error: "Missing X-Auth headers" });
    }

    try{
        const conn = mysql.createConnection(db.mydb);
        const major = await db.checkMajorId(conn, "Major", req.params.majorId);
        
        res.status(200).json({ exists: major[0].count > 0 });
    }
    catch(ex){
        res.status(401).json({ error: "Invalid JWT" });
    }


});

router.get("/:username", async function (req, res) {
    if (!req.headers["x-auth"]) {
        return res.status(401).json({ error: "Missing X-Auth header" });
    }

    const token = req.headers["x-auth"];

    try {
        // const decoded = jwt.decode(token, secret);
        const conn = mysql.createConnection(db.mydb);
        const [results] = await db.getMajorByUsername(conn, req.params.username);

        if (!results || results.length === 0) {
            return res.status(404).json({ error: "No majors found for this user" });
        }

        res.status(200).json(results);
    }
    catch (ex) {
        console.error("Error getting majors:", ex);
        res.status(401).json({ error: "Invalid JWT or database error" });
    }
});



module.exports = router;