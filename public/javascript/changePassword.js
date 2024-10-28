window.addEventListener("DOMContentLoaded", (event) => {

    let username = document.getElementById("username");
    let currPassword = document.getElementById("current-password");
    let nPassword = document.getElementById("new-password");
    let conPassword = document.getElementById("confirm-password");



    let submitButton = document.getElementById("submit");
    let backButton = document.getElementById("back");



    const token = localStorage.getItem("token");
    
    let role;


    submitButton.addEventListener("click", async function (e) {

        e.preventDefault();

        const responseUser = await fetch("/api/users/status", {headers:{"X-Auth": token.token} });
        if (responseUser.ok) {
            
            const users = await responseUser.json();
            role = users[0].role;
            
        }

        if (nPassword.value == conPassword.value) {


            const response = await fetch("/api/password/change", {
                method: "POST",
                body: new URLSearchParams({ name: username, currentPassword: currPassword, newPassword: nPassword })
            });

            if (role == "1") {
                window.location.assign("./adminRole.html");
            }
            else if (role == "2") {
                window.location.assign("./TeacherLanding.html");
            }
            else if (role == "3") {
                window.location.assign("./userHome.html");
            }
            else {
                window.location.assign("./index.html");
            }

        }
        else {
            alert("Passwords do not match!");

        }

    });

    backButton.addEventListener("click", function (e) {

        if (role == "1") {
            window.location.assign("./adminRole.html");
        }
        else if (role == "2") {
            window.location.assign("./TeacherLanding.html");
        }
        else if (role == "3") {
            window.location.assign("./userHome.html");
        }
        else {
            window.location.assign("./index.html");
        }

    })


});