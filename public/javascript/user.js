window.addEventListener("DOMContentLoaded", (event) => {

    let logoutButton = document.getElementById("logout");
    let passwordButton = document.getElementById("password");


    logoutButton.addEventListener("click", function (e) {
        localStorage.clear();
        window.location.assign("./index.html");

    });

    passwordButton.addEventListener("click", function (e){
        window.location.assign("./ChangePassword.html");
    })
});