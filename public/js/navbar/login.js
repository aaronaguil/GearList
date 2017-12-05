function loginFile() {
    console.log("inside of login js")
    return "Login";
  }


 function loginForm() {
    console.log('in loginForm')
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
        bodyContainer.appendChild(welcomeMessage);
    } else if(xmlHttp.responseText == 'invalid'){
        console.log("USER ATTEMPTED TO LOG IN UNSUCCESSFULLY: " + username);
        var errorMessage = document.getElementById('loginModal-errorMessage');
        errorMessage.setAttribute('style', '');
    }       
}