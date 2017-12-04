console.log("***RUNNING NAVBAR.JS****");

var user = {};

window.onload = function () {
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
 
    var logoutButton = document.getElementById('logout-button');
    logoutButton.addEventListener("click", logout)
    logoutButton.setAttribute('style', 'display: none');
    console.log(logoutButton)

    var createPostButton = document.getElementById('createPostButton');
    console.log(createPostButton);
    createPostButton.addEventListener("click", createPostForm);

    var homeButton = document.getElementById('homeButton');
    console.log(homeButton);
    homeButton.addEventListener("click", goHome);
}

var login = function () {
    console.log("****IN navbar.js LOGIN****")
    
    var username = document.getElementById('loginModal-usernameInput').value;
    var password = document.getElementById('loginModal-passwordInput').value;
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
        var logoutButton = document.getElementById('logout-button');
        var myAccountDropdown = document.getElementById('my-account-dropdown');
        var loginButton = document.getElementById('login-button');
        var registerButton = document.getElementById('register-button');
        var welcomeMessage = document.getElementById('loginModal-successMessage');
        logoutButton.setAttribute('style', '');
        myAccountDropdown.setAttribute('style', '');
        loginButton.setAttribute('style', 'display: none');
        registerButton.setAttribute('style', 'display: none');
        welcomeMessage.setAttribute('style', '');
    } else if(xmlHttp.responseText == 'invalid'){
        console.log("USER ATTEMPTED TO LOG IN UNSUCCESSFULLY: " + username);
        var errorMessage = document.getElementById('loginModal-errorMessage');
        errorMessage.setAttribute('style', '');
    }       
}

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

var goHome = function() {
    console.log("****IN navbar.js GOHOME****");
    
    setAllNavBarButtonsInactive();
    var homeButton = document.getElementById('homeButton');
    homeButton.setAttribute('class', 'active');
    var bodyContainer = document.getElementById('body-container');
    bodyContainer.innerHTML = '';
}

var createPostForm = function(event) {
    console.log("****IN navbar.js CREATEPOSTFORM****");
    
    var createPostButton = document.getElementById('createPostButton');
    setAllNavBarButtonsInactive();
    createPostButton.setAttribute('class', 'active');
    var homeButton = document.getElementById('homeButton');
    homeButton.setAttribute('class', '');
    console.log('in createPostForm');
    var bodyContainer = document.getElementById('body-container');
    bodyContainer.innerHTML = '';

    var titleInputBox = document.createElement('input');
    titleInputBox.setAttribute('placeholder', 'Title')
    titleInputBox.setAttribute('type', 'text')
    titleInputBox.setAttribute('id', 'titleInputBox');

    var descriptionInputBox = document.createElement('input');
    descriptionInputBox.setAttribute('placeholder', 'Description')
    descriptionInputBox.setAttribute('type', 'text')
    descriptionInputBox.setAttribute('id', 'descriptionInputBox');

    var submitPostButton = document.createElement('button');
    submitPostButton.innerText = 'Post!';
    submitPostButton.addEventListener('click', submitPost);
    
    bodyContainer.append(titleInputBox);
    bodyContainer.append(descriptionInputBox);
    bodyContainer.append(submitPostButton);
    
    //var form = document.createElement('form');
}

var submitPost = function(event) {
    console.log("****IN navbar.js SUBMITPOST****");
    
    var titleInput = document.getElementById('titleInputBox').value;
    var descriptionInput = document.getElementById('descriptionInputBox').value;
    console.log(titleInput);
    console.log(descriptionInput);
    var postData = {'title': titleInput,
                    'description': descriptionInput};
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "/post/submit", false); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify(postData));
    console.log(xmlHttp.status)
    if (xmlHttp.status == 200) {
        console.log("");
        var bodyContainer = document.getElementById('body-container');
        bodyContainer.innerHTML = '';
    }
}

var register = function () {
    console.log("****IN navbar.js REGISTER****");

    var username = document.getElementById('registerModal-usernameInput').value;
    console.log(username)
    var password = document.getElementById('registerModal-passwordInput').value;
    var email = document.getElementById('registerModal-emailInput').value;
    var firstname = document.getElementById('registerModal-firstNameInput').value;
    var lastname = document.getElementById('registerModal-lastNameInput').value;

    var newUser = {
        'username': username,
        'password': password,
        'email': email,
        'firstname': firstname,
        'lastname': lastname
    }

    console.log("new test: " + JSON.stringify(newUser))
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "/auth/register/", false); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify(newUser));
    var errorMessageSelector = '[id^="registerModal-errorMessage-"]';
    var successMessageSelector = '[id^="registerModal-successMessage-"]';
    if (xmlHttp.status == '200' && xmlHttp.responseText != 'Prexisting email address' && xmlHttp.responseText != 'Prexisting username') {
        console.log('In navbar.js - valid registration form, user created.')
        hideMatchingElements(errorMessageSelector);
        var successMessage = document.getElementById('registerModal-successMessage-newUserCreated');
        successMessage.setAttribute('style', '');
    } else if (xmlHttp.responseText == 'Prexisting email address') {
        console.log('In navbar.js - invalid registration form, prexisting email address, message displayed')
        hideMatchingElements(errorMessageSelector);
        hideMatchingElements(successMessageSelector);
        var prexistingEmailMessage = document.getElementById('registerModal-errorMessage-prexistingEmail');
        prexistingEmailMessage.setAttribute('style', '');
    } else if (xmlHttp.responseText == 'Prexisting username') {
        console.log('In navbar.js - invalid registration form, prexisting username, message displayed')
        hideMatchingElements(errorMessageSelector);
        hideMatchingElements(successMessageSelector);
        var prexistingUsernameMessage = document.getElementById('registerModal-errorMessage-prexistingUsername');
        prexistingUsernameMessage.setAttribute('style', '');
    }
}

var logout = function () {
    console.log("****IN navbar.js LOGOUT****");

    user = {};
    console.log("logged out")
    var logoutButton = document.getElementById('logout-button');
    var myAccountDropdown = document.getElementById('my-account-dropdown');
    var loginButton = document.getElementById('login-button');
    var registerButton = document.getElementById('register-button');
    var welcomeMessage = document.getElementById('loginModal-successMessage');
    logoutButton.setAttribute('style', 'display : none');
    myAccountDropdown.setAttribute('style', 'display : none');
    loginButton.setAttribute('style', '');
    registerButton.setAttribute('style', '');
    welcomeMessage.setAttribute('style', 'display: none');
}

var hideMatchingElements = function (idRegex) {
    console.log("****IN navbar.js HIDEMATCHINGELEMENTS****");
    
    var listOfElements = document.querySelectorAll(idRegex);
    for (var element of listOfElements) {
        element.setAttribute('style', 'display: none');
    }
}




