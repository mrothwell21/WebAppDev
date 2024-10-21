const jwt = require("jwt-simple");
const { error } = require("console");
const router = require("express").Router();

const secret = "webappdev";

const mysql = require('mysql2');
const db = require("./mysql-services");

router.post("/auth", async function(req,res){

    if(!req.body.name || !req.body.password ){
        res.status(401).json({error: "Missing username, password and/or role"});
        return;
    }

    const conn = mysql.createConnection(db.mydb);
    const user = await db.getOne(conn, "users", req.body.name, req.body.password, req.body.role);
    const user_role = user.role;

    if(!user || !user.length){
        res.status(401).json({error: "Bad username and/or password"});
    }
    else{
        const token = jwt.encode({Username: user.username}, secret);
        res.json({token: token}, {role: user_role});
    }
    return;
});

router.get("/status", async function(req,res){
    //check if X-Auth header is set:
    if (!req.headers["x-auth"]) {
        return res.status(401).json({error:"Missing X-Auth headers"});
    }

    const token = req.headers["x-auth"]; // X-Auth should contain the token
    try {
        const decoded = jwt.decode(token, secret);
        const conn = mysql.createConnection(db.mydb);
        const users = await db.selectAll(conn, "users");
        res.json(users);
    }
    catch (ex) {
        res.status(401).json({error: "Invalid JWT"});
    }
    });
    module.exports = router;