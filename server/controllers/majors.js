const jwt = require("jwt-simple");
const { error } = require("console");
const router = require("express").Router();

const mysql = require('mysql2');
const db = require("../models/mysql-services");

const { secret } = db;

router.get("/majors", async function (req, res) {
    const conn = mysql.createConnection(db.mydb);
    const user = await db.getOne(conn, "User", req.body.user, req.body.password);
});
