console.log("***RUNNING NAVBAR.JS****");
var user = {};

window.onload = function () {
    console.log("****IN navbar.js ONLOAD****");
    
    var user = auth();
    
    var selector_loggedInNavbarButtons = "[id^=navbar-button-loggedIn]";
    var selector_loggedOutNavbarButtons = "[id^=navbar-button-loggedOut]";
    if(user){        
        displayMatchingElements(selector_loggedInNavbarButtons);
        hideMatchingElements(selector_loggedOutNavbarButtons);
    }
    else{
        displayMatchingElements(selector_loggedOutNavbarButtons);
        hideMatchingElements(selector_loggedInNavbarButtons);
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