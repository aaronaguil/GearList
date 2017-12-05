var goHome = function() {
    console.log("****IN navbar.js GOHOME****");
    
    setAllNavBarButtonsInactive();
    var homeButton = document.getElementById('homeButton');
    homeButton.setAttribute('class', 'active');
    var bodyContainer = document.getElementById('body-container');
    bodyContainer.innerHTML = '';
}
