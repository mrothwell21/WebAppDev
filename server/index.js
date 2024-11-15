const express  = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
const router = express.Router();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static("public"));

app.use(require('./routes/authRoutes'));

app.use(router);

app.listen(5050, function() {
    console.log("Listening on port 5050...");
});