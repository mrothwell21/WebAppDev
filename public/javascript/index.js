// Event listener
window.addEventListener("DOMContentLoaded", (event) => {

    // We access to the inputs by their id's
    let username = document.getElementById("username");
    let password = document.getElementById("password");

    // Error messages
    let errorElementUsername = document.getElementById("usernameError");
    let errorElementPassword = document.getElementById("passwordError");

    // Form
    let contactForm = document.getElementById("loginForm");


    contactForm.addEventListener("submit", function (e) {
        let messageName = [];
        let messagePassword = [];
    
        if (username.value === "" || username.value === null) {
            messageName.push("* This field is required");
        }

        if (password.value === "" || password.value === null) {
            messagePassword.push("* This field is required");
        }

        // Statement to shows the errors
        if (messageName.length || messagePassword.length > 0) {
            e.preventDefault();
            errorElementUsername.innerText = messageName;
            errorElementPassword.innerText = messagePassword;
        }
    
        // if the values length is filled and it's greater than 4 then redirect to this page
        else if ((username.value.length > 4 && password.value.length > 4)) {

            e.preventDefault();

            //REPLACE WITH SQL QUERYING

            // const mysql = require("mysql2");
            // const db = require("../mysql-services.js");

            // const conn = mysql.createConnection({
            //     host:     "csdb.brockport.edu",
            //     user:     "mroth5",
            //     password: "1234",
            //     database: "fal24_csc423_mroth5"
            // });

            // conn.connect(function(err) {
            //     if (err) {
            //         console.log("Error connecting to MySQL:", err);
            //     }
            //     else {
            //         console.log("Connection established");
            //     }
            // });

            // const user = db.getOne(conn,"User",username.value, password.value);

            // console.log(user);

            // if (user){
            //     window.location.assign("./adminRole.html");
            // }


            if (username.value == "Admin"){
                document.getElementById("status").innerHTML = "Loading...";
                setTimeout(function(){
                    window.location.assign("./adminRole.html");
                }, 2000);
            }
            else if (username.value == "Teacher"){
                window.location.assign("./teacherLanding.html");
            }
            else if (username.value == "Student"){
                window.location.assign("./userHome.html");
            }
            else {
                errorElementUsername.innerText = "Enter valid username";
            }
        }
        else {
            e.preventDefault();
            alert("Some field is invalid. Please check inputs!")
        }

    });
});











//LOCAL STORAGE OPTIONS
// let playerNameWidget = document.getElementById("playerName");
// let difficultyLevelWidget = document.getElementById("diffLevel");
        
// if (localStorage.getItem("playerName")) {                
//    playerNameWidget.value = localStorage.getItem("playerName");
//    difficultyLevelWidget.value = localStorage.getItem("difficultyLevel");
// }
        
// document.getElementById("saveBtn").addEventListener("click", function() {
//    localStorage.setItem("playerName", playerNameWidget.value);
//    localStorage.setItem("difficultyLevel", difficultyLevelWidget.value);
// });
