var logout = function () {
    console.log("****IN navbar.js LOGOUT****");

    user = {};
    console.log("logged out")
    
    var selector_loggedInNavbarButtons = '[id^=navbar-button-loggedIn]';
    var selector_loggedOutNavbarButtons = '[id^=navbar-button-loggedOut]';
    hideMatchingElements(selector_loggedInNavbarButtons);
    displayMatchingElements(selector_loggedOutNavbarButtons);
}
