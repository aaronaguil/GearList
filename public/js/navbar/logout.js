var logout = function () {
    console.log("****IN navbar.js LOGOUT****");



    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "/auth/logout", false); // false for synchronous request [DEPRECATED]
    xmlHttp.send();
    console.log(xmlHttp.status)
    console.log(xmlHttp.responseText)
    if (xmlHttp.status == '200'){
        console.log("logged out")
        
        var selector_loggedInNavbarButtons = '[id^=navbar-button-loggedIn]';
        var selector_loggedOutNavbarButtons = '[id^=navbar-button-loggedOut]';
        hideMatchingElements(selector_loggedInNavbarButtons);
        displayMatchingElements(selector_loggedOutNavbarButtons);
        var login = document.getElementById('loginModal-button-submit');
        login.addEventListener('click', login);
        getAllPosts(1);
    }    



    
}
