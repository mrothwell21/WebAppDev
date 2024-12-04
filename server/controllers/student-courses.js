const jwt = require("jwt-simple");
const router = require("express").Router();
const mysql = require('mysql2');
const db = require("../models/mysql-services");
const { secret } = db;

router.get("/courseInfo/:courseId", async function (req, res) {
    if (!req.headers["x-auth"]) {
        return res.status(401).json({ error: "Missing X-Auth header" });
    }

    const token = req.headers["x-auth"];

    try {
        const conn = mysql.createConnection(db.mydb);
        const [results] = await db.getCourseDetails(conn, req.params.courseId);
        if (!results || results.length === 0) {
            return res.status(404).json({ error: "No Courses found" });
        }
        res.status(200).json(results);
    }
    catch (ex) {
        console.error("Error getting courses:", ex);
        res.status(401).json({ error: "Invalid JWT or database error" });
    }

});

router.get("/:selectedMajor/:username", async function (req, res) {
    // console.log("in fetch")
    if (!req.headers["x-auth"]) {
        return res.status(401).json({ error: "Missing X-Auth header" });
    }

    const token = req.headers["x-auth"];
    // console.log("x-auth");

    try {
        // const decoded = jwt.decode(token, secret);
        const conn = mysql.createConnection(db.mydb);
        // console.log("connection")
        const [results] = await db.getCoursesByUsernameStudent(conn, req.params.username, req.params.selectedMajor);
        // console.log(results);
        if (!results || results.length === 0) {
            return res.status(404).json({ error: "No Courses found for this Major" });
        }
        res.status(200).json(results);
    }
    catch (ex) {
        console.error("Error getting courses:", ex);
        res.status(401).json({ error: "Invalid JWT or database error" });
    }
});

router.post("/courseInfo/:username/:courseId/:prefix", async function (req, res) {
    // console.log("in fetch")
    if (!req.headers["x-auth"]) {
        return res.status(401).json({ error: "Missing X-Auth header" });
    }

    const token = req.headers["x-auth"];
    // console.log("x-auth");

    try {
        // const decoded = jwt.decode(token, secret);
        const conn = mysql.createConnection(db.mydb);
        // console.log("connection")
        const response = await db.registerCourse(conn, req.params.username, req.params.courseId, req.params.prefix);
        // console.log(results);
        if (!results || results.length === 0) {
            return res.status(404).json({ error: "No Courses found for this Major" });
        }
        res.status(200).json(results);
    }
    catch (ex) {
        console.error("Error getting courses:", ex);
        res.status(401).json({ error: "Invalid JWT or database error" });
    }
});

module.exports = router;