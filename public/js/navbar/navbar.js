console.log("***RUNNING NAVBAR.JS****");
var user = {};

window.onload = function () {

    auth();
    
    console.log("****IN navbar.js ONLOAD****");

    var myAccountDropdown = document.getElementById('my-account-dropdown');
    myAccountDropdown.setAttribute('style', 'display: none');
    console.log("account dropdown: " + myAccountDropdown);
    
    var loginButton = document.getElementById('loginModal-submitButton');
    loginButton.addEventListener("click", login);
    console.log("login button: " + loginButton);
    
    var registerButton = document.getElementById('registerModal-submitButton');
    registerButton.addEventListener("click", register);
    console.log("register button: " + registerButton)
 
 
    var logoutButton = document.getElementById('navbar-button-loggedIn-logout');
    logoutButton.addEventListener("click", logout)
    logoutButton.setAttribute('style', 'display: none');
    console.log(logoutButton)

    var createPostButton = document.getElementById('createPostButton');
    console.log("create post button: " + createPostButton)
    createPostButton.addEventListener("click", createPostForm);

    var homeButton = document.getElementById('homeButton');
    console.log(homeButton);
    homeButton.addEventListener("click", goHome);
}

var auth = function(){
    console.log('in auth function navbar.js')
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "/auth/user", false); // false for synchronous request [DEPRECATED]
    xmlHttp.send();
    console.log("status: " + xmlHttp.status)
    console.log("response text: " + xmlHttp.responseText)
    // if (xmlHttp.status == '200' && xmlHttp.responseText != 'invalid'){
    //   hideMatchingElements('message')
    //     console.log("USER LOGGED IN SUCCESSFULLY: " + username);
    //     var logoutButton = document.getElementById('logout-button');
    //     var myAccountDropdown = document.getElementById('my-account-dropdown');
    //     var loginButton = document.getElementById('login-button');
    //     var registerButton = document.getElementById('register-button');
    //     var welcomeMessage = document.getElementById('loginModal-successMessage');
    //     logoutButton.setAttribute('style', '');
    //     myAccountDropdown.setAttribute('style', '');
    //     loginButton.setAttribute('style', 'display: none');
    //     registerButton.setAttribute('style', 'display: none');
    //     welcomeMessage.setAttribute('style', 'color: blue');
    // } else if(xmlHttp.responseText == 'invalid'){
    //     console.log("USER ATTEMPTED TO LOG IN UNSUCCESSFULLY: " + username);
    //     hideMatchingElements('message')
    //     var errorMessage = document.getElementById('loginModal-errorMessage');
    //     errorMessage.setAttribute('style', 'color: red');
    // }       
}