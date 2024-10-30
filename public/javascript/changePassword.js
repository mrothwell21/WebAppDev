window.addEventListener("DOMContentLoaded", (event) => {

    let username = document.getElementById("username");
    let currPassword = document.getElementById("current-password");
    let nPassword = document.getElementById("new-password");
    let conPassword = document.getElementById("confirm-password");

    let submitButton = document.getElementById("submit");
    let backButton = document.getElementById("back");

    const token = localStorage.getItem("token");

    let user;
    let role;
    let password;

    getUser();
    


    submitButton.addEventListener("click", async function (e) {
        e.preventDefault();

        if (nPassword.value == conPassword.value && currPassword.value == password) {
            const response = await fetch("/api/password/change", {
                method: "POST",
                body: new URLSearchParams({ name: username.value, currentPassword: currPassword.value, newPassword: nPassword.value })
            });

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
        else {
            alert("Passwords do not match!");
        }

    });

    backButton.addEventListener("click", function (e) {

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

    })

    async function getUser(){
        const responseUser = await fetch("/api/users/status", {headers:{"X-Auth": token} });
        if (responseUser.ok) {
            user = await responseUser.json();
            role = user.role;
            password = user.password;
            username.value = user.username;

        }
    }


});