const express  = require("express");
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));

app.use(express.static("public"));

router.use("/api", require("./api-users"));

app.use(router);

app.listen(5050, function() {
    console.log("Listening on port 5050...");
});