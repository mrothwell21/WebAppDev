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
            // console.log("login");
            login(username.value, password.value);
        }
    });

    async function login(username, password) {
        // console.log("fetch");
        const response = await fetch("/api/users/auth", {
            method: "POST",
            body: new URLSearchParams({name: username, password: password})
        });

        const loginStatus = document.querySelector("#status");
        if (response.ok) {
            const tokenResponse = await response.json();
            localStorage.setItem("token", tokenResponse.token);
            loginStatus.innerHTML = `Successfully authenticated as ${username}`;

            let role;
            
            const responseUser = await fetch("/api/users/status", {headers:{"X-Auth": tokenResponse.token} });
            if (responseUser.ok) {
                
                const user = await responseUser.json();
                role = user.role;
    

                switch(role){
                    case 1: 
                        window.location.assign("./adminRole.html"); 
                        break;
                    case 2: 
                        window.location.assign("./TeacherLanding.html"); 
                        break;
                    case 3: 
                        window.location.assign("./userHome.html"); 
                        break;
                    default: 
                        window.location.assign("./index.html");
                        localStorage.clear(); 
                        break;
                }
                
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
    }
});



//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.e30.aY1Z8Ox_XfKusiSFFVQqgBexXnqtRs1a1pn6fxpLPtA
//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.e30.aY1Z8Ox_XfKusiSFFVQqgBexXnqtRs1a1pn6fxpLPtA