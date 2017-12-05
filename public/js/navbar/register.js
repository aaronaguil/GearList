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
