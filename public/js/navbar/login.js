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
      var selector_loggedInNavbarButtons = "[id^=navbar-button-loggedIn]";
      var selector_loggedOutNavbarButtons = "[id^=navbar-button-loggedOut]";
      var selector_loginModalMessages = "[id^=loginModal-message]";
      var welcomeMessage = document.getElementById("loginModal-message-success");
      displayMatchingElements(selector_loggedInNavbarButtons);
      hideMatchingElements(selector_loggedOutNavbarButtons);
      hideMatchingElements(selector_loginModalMessages);
      welcomeMessage.style.display = "block";
      getPosts(xmlHttp.responseText);
  } else if(xmlHttp.responseText == "invalid"){
      console.log("USER ATTEMPTED TO LOG IN UNSUCCESSFULLY: " + username);
      var errorMessage = document.getElementById('loginModal-message-error');
      errorMessage.style.display = "block";
  }            
}







