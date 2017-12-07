console.log("***RUNNING NAVBAR.JS****");
var user = {};

window.onload = function () {
    console.log("****IN navbar.js ONLOAD****");

    var myAccountDropdown = document.getElementById('navbar-button-loggedIn-accountDropDown');
    myAccountDropdown.addEventListener("click", showDropDownAccountMenu);
    myAccountDropdown.style.display = 'none';
    console.log("account dropdown: " + myAccountDropdown);
    
    var loginButton = document.getElementById('loginModal-button-submit');
    loginButton.addEventListener("click", login);
    console.log("login button: " + loginButton);
    
    var registerButton = document.getElementById('registerModal-button-submit');
    registerButton.addEventListener("click", register);
    console.log("register button: " + registerButton)
 
    var logoutButton = document.getElementById('navbar-button-loggedIn-logout');
    logoutButton.addEventListener("click", logout);
    logoutButton.style.display = 'none';
    console.log(logoutButton);

    var createPostButton = document.getElementById('navbar-button-loggedIn-createPost');
    createPostButton.addEventListener("click", createPostForm);
    console.log("create post button: " + createPostButton)

    var homeButton = document.getElementById('navbar-button-all-home');
    console.log(homeButton);
    homeButton.addEventListener("click", goHome);
}