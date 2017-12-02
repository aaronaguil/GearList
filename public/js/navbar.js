var user = {};

window.onload = function () {
    // set logout and My Account to hidden


    var logoutButton = document.getElementById('logout-button');
    var myAccountDropdown = document.getElementById('my-account-dropdown');
    console.log(logoutButton)
    logoutButton.setAttribute('style', 'display: none');
    myAccountDropdown.setAttribute('style', 'display: none');

    console.log(logoutButton)
    var loginButton = document.getElementById('login-button');
    loginButton.addEventListener("click", loginForm);
    console.log(logoutButton);
    var registerButton = document.getElementById('register-button');
    console.log("register button: " + registerButton)
    registerButton.addEventListener("click", registerForm);

    logoutButton.addEventListener("click", logout)

    var createPostButton = document.getElementById('createPostButton');
    console.log(createPostButton);
    createPostButton.addEventListener("click", createPostForm);
    
}

var login = function () {

    console.log("in login")
    var username = document.getElementById('username-input').value;
    console.log(username)
    var password = document.getElementById('password-input').value;

    var user = {
        'username': username,
        'password': password,
    }

    console.log("new test: " + JSON.stringify(user))
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "/auth/login/", false); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify(user));
    console.log(xmlHttp.status)
    console.log(xmlHttp.responseText)

    if (xmlHttp.status == '200' && xmlHttp.responseText != 'invalid') {
        var logoutButton = document.getElementById('logout-button');
        var myAccountDropdown = document.getElementById('my-account-dropdown');
        logoutButton.setAttribute('style', '');
        myAccountDropdown.setAttribute('style', '');

        var loginButton = document.getElementById('login-button');
        var registerButton = document.getElementById('register-button');
        loginButton.setAttribute('style', 'display: none');
        registerButton.setAttribute('style', 'display: none');
    }
    else if(xmlHttp.responseText == 'invalid'){
        var userNameDiv = document.getElementById('usernameDiv');
        
        var error = document.createElement('div');
        error.setAttribute('style', 'color: red; text-align: left');
        error.innerText = "Invalid Username or Password";

        userNameDiv.prepend(error);
    }

}

var createPostForm = function(event) {
    var createPostButton = document.getElementById('createPostButton');
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

var loginForm = function () {
    console.log('in loginForm')
    var bodyContainer = document.getElementById('body-container');
    bodyContainer.innerHTML = '';
    bodyContainer.setAttribute('class', 'container-fluid');
    bodyContainer.setAttribute('style', 'margin-top: 15%');
    var rowOne = document.createElement('div');
    rowOne.setAttribute('class', 'row');
    var formContainer = document.createElement('div');
    formContainer.setAttribute('class', '');
    formContainer.setAttribute('style', 'width: 50%; margin-left: 25%;');


    var form = document.createElement('form');
    form.setAttribute('style', 'text-align : center');
    console.log(form)
    var userNameDiv = document.createElement('div')
    userNameDiv.setAttribute('class', 'input-group');
    userNameDiv.setAttribute('id', 'usernameDiv');
    userNameDiv.setAttribute('style', 'width: 100%');
    var userNameInput = document.createElement('input')
    userNameInput.setAttribute('placeholder', 'Username')
    userNameInput.setAttribute('type', 'text')
    userNameInput.setAttribute('name', 'username')
    userNameInput.setAttribute('aria-describedby', 'basic-addon1')
    userNameInput.setAttribute('class', 'form-control input-lg')
    userNameInput.setAttribute('id', 'username-input');
    userNameInput.setAttribute('style', 'margin-bottom: 5%');

    var passwordDiv = document.createElement('div')
    passwordDiv.setAttribute('class', 'input-group');
    passwordDiv.setAttribute('id', 'passwordDiv');
    passwordDiv.setAttribute('style', 'width: 100%');

    var passwordInput = document.createElement('input')
    passwordInput.setAttribute('placeholder', 'Password')
    passwordInput.setAttribute('type', 'text')
    passwordInput.setAttribute('name', 'username')
    passwordInput.setAttribute('aria-describedby', 'basic-addon1')
    passwordInput.setAttribute('class', 'form-control input-lg')
    passwordInput.setAttribute('id', 'password-input');
    passwordInput.setAttribute('style', 'margin-bottom: 5%');



    var submitButton = document.createElement('button')
    submitButton.setAttribute('type', 'submit')
    submitButton.setAttribute('class', 'btn btn-primary')

    submitButton.innerText = 'Login'
    submitButton.addEventListener('click', function (e) {
        e.preventDefault();
        login();
    })

    userNameDiv.append(userNameInput);
    passwordDiv.append(passwordInput);

    form.append(userNameDiv);
    form.append(passwordDiv);
    form.append(submitButton);

    formContainer.append(form);
    rowOne.append(formContainer);
    bodyContainer.append(rowOne);

}

var registerForm = function () {
    console.log('in registerform')
    var bodyContainer = document.getElementById('body-container');
    bodyContainer.innerHTML = '';
    bodyContainer.setAttribute('class', 'container-fluid');
    bodyContainer.setAttribute('style', 'margin-top: 15%')
    var rowOne = document.createElement('div');
    rowOne.setAttribute('class', 'row');
    var formContainer = document.createElement('div');
    formContainer.setAttribute('class', '');
    formContainer.setAttribute('style', 'width: 50%; margin-left: 25%;');


    var form = document.createElement('form');
    form.setAttribute('style', 'text-align : center');
    console.log(form)
    var userNameDiv = document.createElement('div')
    userNameDiv.setAttribute('class', 'input-group');
    userNameDiv.setAttribute('id', 'usernameDiv');
    userNameDiv.setAttribute('style', 'width: 100%');
    var userNameInput = document.createElement('input')
    userNameInput.setAttribute('placeholder', 'Username')
    userNameInput.setAttribute('type', 'text')
    userNameInput.setAttribute('name', 'username')
    userNameInput.setAttribute('aria-describedby', 'basic-addon1')
    userNameInput.setAttribute('class', 'form-control input-lg')
    userNameInput.setAttribute('id', 'username-input');
    userNameInput.setAttribute('style', 'margin-bottom: 5%');

    var passwordDiv = document.createElement('div')
    passwordDiv.setAttribute('class', 'input-group');
    passwordDiv.setAttribute('id', 'passwordDiv');
    passwordDiv.setAttribute('style', 'width: 100%');

    var passwordInput = document.createElement('input')
    passwordInput.setAttribute('placeholder', 'Password')
    passwordInput.setAttribute('type', 'text')
    passwordInput.setAttribute('name', 'username')
    passwordInput.setAttribute('aria-describedby', 'basic-addon1')
    passwordInput.setAttribute('class', 'form-control input-lg')
    passwordInput.setAttribute('id', 'password-input');
    passwordInput.setAttribute('style', 'margin-bottom: 5%');

    var emailDiv = document.createElement('div')
    emailDiv.setAttribute('class', 'input-group');
    emailDiv.setAttribute('id', 'emailDiv');
    emailDiv.setAttribute('style', 'width: 100%');

    var emailInput = document.createElement('input')
    emailInput.setAttribute('placeholder', 'Email')
    emailInput.setAttribute('type', 'text')
    emailInput.setAttribute('name', 'username')
    emailInput.setAttribute('aria-describedby', 'basic-addon1')
    emailInput.setAttribute('class', 'form-control input-lg')
    emailInput.setAttribute('id', 'email-input');
    emailInput.setAttribute('style', 'margin-bottom: 5%');

    var firstNameDiv = document.createElement('div')
    firstNameDiv.setAttribute('class', 'input-group');
    firstNameDiv.setAttribute('id', 'firstnameDiv');
    firstNameDiv.setAttribute('style', 'width: 100%');

    var firstNameInput = document.createElement('input')
    firstNameInput.setAttribute('placeholder', 'First Name')
    firstNameInput.setAttribute('type', 'text')
    firstNameInput.setAttribute('name', 'username')
    firstNameInput.setAttribute('aria-describedby', 'basic-addon1')
    firstNameInput.setAttribute('class', 'form-control input-lg')
    firstNameInput.setAttribute('id', 'firstname-input');
    firstNameInput.setAttribute('style', 'margin-bottom: 5%');

    var lastNameDiv = document.createElement('div')
    lastNameDiv.setAttribute('class', 'input-group');
    lastNameDiv.setAttribute('id', 'lastnameDiv');
    lastNameDiv.setAttribute('style', 'width: 100%');

    var lastNameInput = document.createElement('input')
    lastNameInput.setAttribute('placeholder', 'Last Name')
    lastNameInput.setAttribute('type', 'text')
    lastNameInput.setAttribute('name', 'username')
    lastNameInput.setAttribute('aria-describedby', 'basic-addon1')
    lastNameInput.setAttribute('class', 'form-control input-lg')
    lastNameInput.setAttribute('id', 'lastname-input');
    lastNameInput.setAttribute('style', 'margin-bottom: 5%');


    var submitButton = document.createElement('button')
    submitButton.setAttribute('type', 'submit')
    submitButton.setAttribute('class', 'btn btn-primary')

    submitButton.innerText = 'Register'
    submitButton.addEventListener('click', function (e) {
        e.preventDefault();
        register();
    })

    userNameDiv.append(userNameInput);
    passwordDiv.append(passwordInput);
    emailDiv.append(emailInput);
    firstNameDiv.append(firstNameInput);
    lastNameDiv.append(lastNameInput);

    form.append(userNameDiv);
    form.append(passwordDiv);
    form.append(emailDiv);
    form.append(firstNameDiv);
    form.append(lastNameDiv);
    form.append(submitButton);



    formContainer.append(form);
    rowOne.append(formContainer);
    bodyContainer.append(rowOne);

}

var register = function () {

    console.log("in register")


    var username = document.getElementById('username-input').value;
    console.log(username)
    var password = document.getElementById('password-input').value;
    var email = document.getElementById('email-input').value;
    var firstname = document.getElementById('firstname-input').value;
    var lastname = document.getElementById('lastname-input').value;

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
    if (xmlHttp.status == '200' && xmlHttp.responseText != 'not unique') {
        console.log('valid')
    }
    else if (xmlHttp.responseText == 'not unique') {
        var usernameDiv = document.getElementById('usernameDiv');

        var error = document.createElement('div');
        error.setAttribute('style', 'color: red; text-align: left;');
        error.innerText = 'username is already taken'

        usernameDiv.prepend(error);
    }




}

var logout = function () {
    user = {};
    console.log("logged out")
    var logoutButton = document.getElementById('logout-button');
    var myAccountDropdown = document.getElementById('my-account-dropdown');
    logoutButton.setAttribute('style', 'display : none');
    myAccountDropdown.setAttribute('style', 'display : none');
    var loginButton = document.getElementById('login-button');
    var registerButton = document.getElementById('register-button');
    loginButton.setAttribute('style', '');
    registerButton.setAttribute('style', '');

}

