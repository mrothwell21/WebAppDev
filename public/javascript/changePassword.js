window.addEventListener("DOMContentLoaded", (event) => {

    let username = document.getElementById("username");
    let currPassword = document.getElementById("current-password");
    let nPassword = document.getElementById("new-password");
    let conPassword = document.getElementById("confirm-password");



    let submitButton = document.getElementById("submit");
    let backButton = document.getElementById("back");

    const role = localStorage.getItem("role");

    // const token = localStorage.getItem("token");
    // const secret = "webappdev";
    // let tokenUn = jwt.decode(token, secret);


    submitButton.addEventListener("click", async function (e) {

        e.preventDefault();

        if (nPassword.value == conPassword.value) {


            const response = await fetch("/api/change", {
                method: "POST",
                body: new URLSearchParams({ name: username, currentPassword: currPassword, newPassword: nPassword })
            });

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
                else if (tokenResponse.role == "3"){
                    window.location.assign("./userHome.html");
                }
                else {
                    window.location.assign("./index.html");
                }
            }
            else {
                loginStatus.innerHTML = `Change Password Failed. Try again`;
            }
            clearForm();
        }

            // let role = tokenUn.role;

        //     if (response == "1") {
        //         window.location.assign("./adminRole.html");
        //     }
        //     else if (role == "2") {
        //         window.location.assign("./TeacherLanding.html");
        //     }
        //     else if (role == "3") {
        //         window.location.assign("./userHome.html");
        //     }
        //     else {
        //         window.location.assign("./index.html");
        //     }

        // }
        // else {
        //     alert("Passwords do not match!");

        // }

    });

    backButton.addEventListener("click", function (e) {

        // let role = tokenUn.role;

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