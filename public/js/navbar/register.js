var register = function () {
    console.log("****IN navbar.js REGISTER****");

    var username = document.getElementById('registerModal-inputUsername').value;
    console.log(username.value)
    var password = document.getElementById('registerModal-input-password').value;
    var email = document.getElementById('registerModal-input-email').value;
    var firstname = document.getElementById('registerModal-input-firstName').value;
    var lastname = document.getElementById('registerModal-input-lastName').value;

    var newUser = {
        'username': username,
        'password': password,
        'email': email,
        'firstname': firstname,
        'lastname': lastname
    }
    console.log("User to be created: " + JSON.stringify(newUser))
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "/auth/register/", false); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify(newUser));
    var errorMessageSelector = '[id^="registerModal-errorMessage-"]';
    var successMessageSelector = '[id^="registerModal-successMessage-"]';
    if (xmlHttp.status == '200' && xmlHttp.responseText != 'Prexisting email address' && xmlHttp.responseText != 'Prexisting username') {
        console.log('In navbar.js - valid registration form, user created.')
        hideMatchingElements(errorMessageSelector);
        var successMessage = document.getElementById('registerModal-message-newUserCreated');
        successMessage.style.display = 'none';
    } else if (xmlHttp.responseText == 'Prexisting email address') {
        console.log('In navbar.js - invalid registration form, prexisting email address, message displayed')
        hideMatchingElements(errorMessageSelector);
        hideMatchingElements(successMessageSelector);
        var prexistingEmailMessage = document.getElementById('registerModal-errorMessage-prexistingEmail');
        prexistingEmailMessage.style.display = 'none';
    } else if (xmlHttp.responseText == 'Prexisting username') {
        console.log('In navbar.js - invalid registration form, prexisting username, message displayed')
        hideMatchingElements(errorMessageSelector);
        hideMatchingElements(successMessageSelector);
        var prexistingUsernameMessage = document.getElementById('registerModal-errorMessage-prexistingUsername');
        prexistingUsernameMessage.style.display = 'none';
    }
    
}
