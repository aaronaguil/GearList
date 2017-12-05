var setAllNavBarButtonsInactive = function() {
    console.log("****IN navbar.js SETALLNAVBARBUTTONSINACTIVE****");
    
    var homeButton = document.getElementById('homeButton');
    homeButton.setAttribute('class', '');
    var createPostButton = document.getElementById('createPostButton');
    createPostButton.setAttribute('class', '');
    var loginButton = document.getElementById('login-button');
    loginButton.setAttribute('class', '');
    var registerButton = document.getElementById('register-button');
    registerButton.setAttribute('class', '');
}