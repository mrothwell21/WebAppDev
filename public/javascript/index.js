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

            if (username.value == "Admin"){
                window.location.assign("./adminRole.html");
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
