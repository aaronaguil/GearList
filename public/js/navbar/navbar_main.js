console.log("***RUNNING NAVBAR.JS****");
var user = {};

window.onload = function () {
    console.log("****IN navbar.js ONLOAD****");
    
    var user = auth();

    if(user){
       
        console.log("USER LOGGED IN : " + user);
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

        getPosts(JSON.parse(user).id);
    }
    else{
        var myAccountDropdown = document.getElementById('navbar-button-loggedIn-accountDropDown');
        myAccountDropdown.addEventListener("click", showDropDownAccountMenu);
        myAccountDropdown.style.display = 'none';
        console.log("account dropdown: " + myAccountDropdown);
        
        var loginButton = document.getElementById('loginModal-button-login');
        loginButton.addEventListener("click", login);
        console.log("login button: " + loginButton);
        
        var registerButton = document.getElementById('registerModal-button-register');
        registerButton.addEventListener("click", register);
        console.log("register button: " + registerButton)
     
        var logoutButton = document.getElementById('navbar-button-loggedIn-logout');
        logoutButton.addEventListener("click", logout);
        logoutButton.style.display = 'none';
        console.log(logoutButton);

        getAllPosts(1);
    }

    var selector_allNavbarButtons = "[id^=navbar-button]";
    var selector_allLoginModalButtons = "[id^=loginModal-button]";
    var selector_allRegisterModalButtons = "[id^=registerModal-button]";
    addEventListenersByName(selector_allNavbarButtons);
    addEventListenersByName(selector_allLoginModalButtons);
    addEventListenersByName(selector_allRegisterModalButtons);

}

var auth = function(){
    console.log('in auth function navbar.js')
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "/auth/user", false); // false for synchronous request [DEPRECATED]
    xmlHttp.send();
    console.log("status: " + xmlHttp.status)
    console.log("response text: " + xmlHttp.responseText)

    if(xmlHttp.responseText){
        return xmlHttp.responseText;
    }
    else{
        return null;
    }

}