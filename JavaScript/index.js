// // We access to the inputs by their id's
// let fullname = document.getElementById("fullname");
// let address = document.getElementById("address");

// // Error messages
// let errorElement = document.getElementById("name_error");
// let errorElementAddress = document.getElementById("address_error");

// // Form
// let contactForm = document.getElementById("form");

// // Event listener
// contactForm.addEventListener("submit", function (e) {
//   let messageName = [];
//   let messageAddress = [];
  
//     if (fullname.value === "" || fullname.value === null) {
//     messageName.push("* This field is required");
//   }

//   if (address.value === "" || address.value === null) {
//     messageAddress.push("* This field is required");
//   }

//   // Statement to shows the errors
//   if (messageName.length || messageAddress.length > 0) {
//     e.preventDefault();
//     errorElement.innerText = messageName;
//     errorElementAddress.innerText = messageAddress;
//   }
  
//    // if the values length is filled and it's greater than 2 then redirect to this page
//     if (
//     (fullname.value.length > 2,
//     address.value.length > 2)
//   ) {
//     e.preventDefault();
//     window.location.assign("https://www.google.com");
//   }

// });

//VERY LOOSE IDEA OF WHAT WE NEED TO DO FOR BASIC REDIRECT

document.addEventListener('DOMContentLoaded', function() {
    let userName = document.getElementById("userName");
    let password = document.getElementById("secret"); // Changed to match the HTML id

    // Error messages
    let errorElement = document.getElementById("name_error");
    let errorElementAddress = document.getElementById("address_error");

    // Form
    let loginForm = document.getElementById("loginForm");

    // Event listener
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Always prevent default to handle form submission in JavaScript

        let messageName = [];
        let messageAddress = [];
        
        if (userName.value === "" || userName.value === null) {
            messageName.push("* Username is required");
        }

        if (password.value === "" || password.value === null) {
            messageAddress.push("* Password is required");
        }

        // Show the errors if any
        if (messageName.length > 0 || messageAddress.length > 0) {
            if (errorElement) errorElement.innerText = messageName.join(", ");
            if (errorElementAddress) errorElementAddress.innerText = messageAddress.join(", ");
        } else {
            // If both fields are filled, check credentials
            if (userName.value === "user" && password.value === "123") {
                window.location.href = '../HTML/userHome.html';
            } else {
                alert("Invalid username or password. Please try again.");
            }
        }
    });
});