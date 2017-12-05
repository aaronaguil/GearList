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

    var selector_loggedInNavbarButtons = '[id^=navbar-button-loggedIn]';
    var selector_loggedOutNavbarButtons = '[id^=navbar-button-loggedOut]';
    var selector_allLoginModalMessages = '[id^=loginModal-message]';   
    if (xmlHttp.status == '200' && xmlHttp.responseText != 'invalid') {
      console.log("USER LOGGED IN SUCCESSFULLY: " + username);
      hideMatchingElements(selector_allLoginModalMessages);
      hideMatchingElements(selector_loggedOutNavbarButtons);
      displayMatchingElements(selector_loggedInNavbarButtons);
      var welcomeMessage = document.getElementById('loginModal-message-success');
      welcomeMessage.style.display = 'inline';
    } else if (xmlHttp.responseText == 'invalid') {
      console.log("USER ATTEMPTED TO LOG IN UNSUCCESSFULLY: " + username);
      hideMatchingElements(selector_allLoginModalMessages);
      var forgotMessage = document.getElementById('loginModal-message-forgotUsernameOrPassword');
      var errorMessage = document.getElementById('loginModal-message-error');
      forgotMessage.style.display = 'inline';
      errorMessage.style.display = 'inline';
    }       
}







