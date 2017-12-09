console.log("***RUNNING NAVBAR.JS****");

window.onload = function () {
    console.log("****IN navbar.js ONLOAD****");
    
    user = auth();
    
    var selector_loggedInNavbarButtons = "[id^=navbar-button-loggedIn]";
    var selector_loggedOutNavbarButtons = "[id^=navbar-button-loggedOut]";
    if(user){        
        displayMatchingElements(selector_loggedInNavbarButtons);
        hideMatchingElements(selector_loggedOutNavbarButtons);
        getPosts(JSON.parse(user).id);
    }
    else{
        displayMatchingElements(selector_loggedOutNavbarButtons);
        hideMatchingElements(selector_loggedInNavbarButtons);
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

    if(xmlHttp.responseText){
        return xmlHttp.responseText;
    }
    else{
        return null;
    }

}