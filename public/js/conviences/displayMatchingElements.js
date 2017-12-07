var displayMatchingElements = function (idRegex) {
    console.log("****IN navbar.js DISPLAYMATCHINGELEMENTS****");
    
    var listOfElements = document.querySelectorAll(idRegex);
    for (var element of listOfElements) {
        element.style.display = 'block';
    }
}