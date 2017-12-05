var logout = function () {
    console.log("****IN navbar.js LOGOUT****");

    user = {};
    console.log("logged out")
    var logoutButton = document.getElementById('logout-button');
    var myAccountDropdown = document.getElementById('my-account-dropdown');
    var loginButton = document.getElementById('login-button');
    var registerButton = document.getElementById('register-button');
    var welcomeMessage = document.getElementById('loginModal-successMessage');
    logoutButton.setAttribute('style', 'display : none');
    myAccountDropdown.setAttribute('style', 'display : none');
    loginButton.setAttribute('style', '');
    registerButton.setAttribute('style', '');
    welcomeMessage.setAttribute('style', 'display: none');
}
