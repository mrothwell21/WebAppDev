const jwt = require("jwt-simple");
const router = require("express").Router();
const mysql = require('mysql2');
const db = require("../models/mysql-services");
const { secret } = db;

router.get("/:username", async function (req, res) {
    if (!req.headers["x-auth"]) {
        return res.status(401).json({ error: "Missing X-Auth header" });
    }

    const token = req.headers["x-auth"];

    try {
        // const decoded = jwt.decode(token, secret);
        const conn = mysql.createConnection(db.mydb);
        const [results] = await db.getCoursesByUsername(conn, req.params.username);
        if (!results || results.length === 0) {
            return res.status(404).json({ error: "No Courses found for this user" });
        }

        res.status(200).json(results);
    }
    catch (ex) {
        console.error("Error getting courses:", ex);
        res.status(401).json({ error: "Invalid JWT or database error" });
    }
});

router.get("/students/:courseId", async function (req, res){
    if (!req.headers["x-auth"]) {
        return res.status(401).json({ error: "Missing X-Auth header" });
    }

    const token = req.headers["x-auth"];

    try {
        const conn = mysql.createConnection(db.mydb);
        const [results] = await db.getStudentsInCourse(conn, req.params.courseId);
        if (!results || results.length === 0) {
            return res.status(404).json({ error: "No students in course" });
        }

        res.status(200).json(results);
    }
    catch (ex) {
        console.error("Error getting courses:", ex);
        res.status(401).json({ error: "Invalid JWT or database error" });
    }
});

router.post("/activate", async function (req, res){
    try {
        const conn = mysql.createConnection(db.mydb);
        const [results] = await db.setActiveInactiveCourse(conn, req.body.course);
        if (!results || results.length === 0) {
            return res.status(404).json({ error: "Course doesn't exist" });
        }

        res.status(200).json(results);
    }
    catch (ex) {
        console.error("Error getting courses:", ex);
        res.status(401).json({ error: "Invalid JWT or database error" });
    }
});

router.post("/update", async function (req, res){
    try {
        const conn = mysql.createConnection(db.mydb);
        const [results] = await db.updateCourse(conn, req.body.courseId, req.body.name, req.body.maxCapacity, req.body.description);
        if (!results || results.length === 0) {
            return res.status(404).json({ error: "Course doesn't exist" });
        }

        res.status(200).json(results);
    }
    catch (ex) {
        console.error("Error updating course:", ex);
        res.status(401).json({ error: "Invalid JWT or database error" });
    }
});

router.post("/add", async function (req, res){
    try {
        const conn = mysql.createConnection(db.mydb);
        const [results] = await db.addCourse(conn, req.body.courseId, req.body.name, req.body.maxCapacity, req.body.majorId, req.body.description);
        if (!results || results.length === 0) {
            return res.status(404).json({ error: "Course doesn't exist" });
        }

        res.status(200).json(results);
    }
    catch (ex) {
        console.error("Error adding course:", ex);
        res.status(401).json({ error: "Invalid JWT or database error" });
    }
});


router.get("/courses/:courseId", async function (req, res){
    if (!req.headers["x-auth"]) {
        return res.status(401).json({ error: "Missing X-Auth header" });
    }

    const token = req.headers["x-auth"];

    try {
        const conn = mysql.createConnection(db.mydb);
        const [results] = await db.getCourseById(conn, req.params.courseId);
        if (!results || results.length === 0) {
            return res.status(404).json({ error: "Course not found!" });
        }

        res.status(200).json(results);
    }
    catch (ex) {
        console.error("Error getting courses:", ex);
        res.status(401).json({ error: "Invalid JWT or database error" });
    }
});


module.exports = router;