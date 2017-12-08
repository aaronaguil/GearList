//function loginFile() {
//    console.log("inside of login js")
//    return "Login";
//  }

var login = function () {
    console.log("****IN navbar.js LOGIN****")
    
    var username = document.getElementById('loginModal-input-username').value;
    var password = document.getElementById('loginModal-input-password').value;
    console.log(username);
    console.log(password);
    
    var user = {
        'username': username,
        'password': password,
    }
    
    console.log("new test: " + JSON.stringify(user));
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "/auth/login", false); // false for synchronous request [DEPRECATED]
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify(user));
    console.log(xmlHttp.status)
    console.log(xmlHttp.responseText)
    
    if (xmlHttp.status == '200' && xmlHttp.responseText != 'invalid'){
        console.log("USER LOGGED IN SUCCESSFULLY: " + username);
        var logoutButton = document.getElementById('navbar-button-loggedIn-logout');
        var myAccountDropdown = document.getElementById('navbar-button-loggedIn-accountDropDown');
        var loginButton = document.getElementById('navbar-button-loggedOut-login');
        var registerButton = document.getElementById('navbar-button-loggedOut-register');
        var welcomeMessage = document.getElementById('loginModal-message-success');
        logoutButton.setAttribute('style', '');
        logoutButton.addEventListener('click', logout);
        myAccountDropdown.setAttribute('style', '');
        loginButton.setAttribute('style', 'display: none');
        registerButton.setAttribute('style', 'display: none');
        welcomeMessage.setAttribute('style', 'color: blue');

        getPosts(xmlHttp.responseText);
       
    } else if(xmlHttp.responseText == 'invalid'){
        console.log("USER ATTEMPTED TO LOG IN UNSUCCESSFULLY: " + username);
        hideMatchingElements('message')
        var errorMessage = document.getElementById('loginModal-message-error');
        errorMessage.setAttribute('style', 'color: red');
    }       
}







