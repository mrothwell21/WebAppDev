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
        e.preventDefault();
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
            errorElementUsername.innerText = messageName;
            errorElementPassword.innerText = messagePassword;
        }
        // if the values length is filled and it's greater than 4 then redirect to this page
        else {
            console.log("login");
            login(username.value, password.value);
        }
    });

    async function login(username, password) {
        console.log("fetch");
        const response = await fetch("/api/auth", {
            method: "POST",
            body: new URLSearchParams({name: username, password: password})
        });


        console.log(response);

        


        const loginStatus = document.querySelector("#status");
        if (response.ok) {
            const tokenResponse = await response.json();
            console.log(tokenResponse);
            localStorage.setItem("token", tokenResponse.token);
            localStorage.setItem("role", tokenResponse.role);
            loginStatus.innerHTML = `Successfully authenticated as ${username}`;
            console.log(tokenResponse.role);
            if(tokenResponse.role == "1" ){
                window.location.assign("./adminRole.html");
            }
            else if(tokenResponse.role == "2"){
                window.location.assign("./TeacherLanding.html");
            }
            else{
                window.location.assign("./userHome.html");
            }
        }
        else {
            loginStatus.innerHTML = `Login failed. Try again`;
        }
        clearForm();
    }

    async function displayStatus() {
        const token = localStorage.getItem("token");
        const status = document.querySelector("ul");
        let html = "<p>You are not authorized to see the roles. Please, login</p>";
        const response = await fetch("/api/status", {headers:{"X-Auth": token} });
        if (response.ok) {
            html = "<p>Roles displayed here:</p>";
            const users = await response.json();
            for (const user of users) {
                html += "<li>" + user.name + " = " + user.role + "</li>";
            }
        }
        status.innerHTML = html;
    }

    function logout() {
        localStorage.removeItem("token");
        clearForm();
        document.querySelector("#loginStatus").innerHTML = "Logged Out";
    }

    function clearForm() {
        document.querySelector("#username").value = "";
        document.querySelector("#password").value = "";
        document.querySelector("#role").value = "";
    }
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
