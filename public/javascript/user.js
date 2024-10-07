window.addEventListener("DOMContentLoaded", (event) => {

    let logoutButton = document.getElementById("logout");


    logoutButton.addEventListener("click", function (e) {
        window.location.assign("../HTML/index.html");

    });
});