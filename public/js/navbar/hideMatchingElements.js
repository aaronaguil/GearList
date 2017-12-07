var hideMatchingElements = function (idRegex) {
    console.log("****IN navbar.js HIDEMATCHINGELEMENTS****");
    
    var listOfElements = document.querySelectorAll(idRegex);
    for (var element of listOfElements) {
        element.setAttribute('style', 'display: none');
        
    }
}
