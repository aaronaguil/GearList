console.log("***RUNNING NAVBAR.JS****");
var user = {};

window.onload = function () {

    
    console.log("****IN navbar.js ONLOAD****");

    var myAccountDropdown = document.getElementById('my-account-dropdown');
    myAccountDropdown.setAttribute('style', 'display: none');
    console.log("account dropdown: " + myAccountDropdown);
    
    var loginButton = document.getElementById('loginModal-submitButton');
    loginButton.addEventListener("click", loginForm);
    console.log("login button: " + loginButton);
    
    // var registerButton = document.getElementById('registerModal-submitButton');
    // registerButton.addEventListener("click", register);
    // console.log("register button: " + registerButton)
    // registerButton.addEventListener("click", registerForm);
 
 
    // var logoutButton = document.getElementById('logout-button');
    // logoutButton.addEventListener("click", logout)
    // logoutButton.setAttribute('style', 'display: none');
    // console.log(logoutButton)

    // var createPostButton = document.getElementById('createPostButton');
    // console.log("create post button: " + createPostButton)
    // createPostButton.addEventListener("click", createPostForm);

    // var homeButton = document.getElementById('homeButton');
    // console.log(homeButton);
    // homeButton.addEventListener("click", goHome);
}