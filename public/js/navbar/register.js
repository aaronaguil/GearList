var register = function () {
    console.log("****IN navbar/register.js****");

    var username = document.getElementById('registerModal-input-username').value;
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
    var selector_allRegiserModalErrorMessages = '[id^="registerModal-message-error"]';
    var selector_allRegisterModalSuccessMessages = '[id^="registerModal-message-success"]';
    if (xmlHttp.status == '200' && xmlHttp.responseText != 'Prexisting email address' && xmlHttp.responseText != 'Prexisting username') {
        console.log('In register.js - valid registration form, user created.')
        hideMatchingElements(selector_allRegiserModalErrorMessages);
        var successMessage = document.getElementById('registerModal-message-success-newUserCreated');
        successMessage.style.display = 'block';
    } else if (xmlHttp.responseText == 'Prexisting email address') {
        console.log('In register.js - invalid registration form, prexisting email address, message displayed')
        hideMatchingElements(selector_allRegiserModalErrorMessages);
        hideMatchingElements(selector_allRegisterModalSuccessMessages);
        var prexistingEmailMessage = document.getElementById('registerModal-message-error-prexistingEmail');
        prexistingEmailMessage.style.display = 'block';
    } else if (xmlHttp.responseText == 'Prexisting username') {
        console.log('In register.js - invalid registration form, prexisting username, message displayed')
        hideMatchingElements(selector_allRegiserModalErrorMessages);
        hideMatchingElements(selector_allRegisterModalSuccessMessages);
        var prexistingUsernameMessage = document.getElementById('registerModal-message-error-prexistingUsername');
        prexistingUsernameMessage.style.display = 'block';
    }   
}
