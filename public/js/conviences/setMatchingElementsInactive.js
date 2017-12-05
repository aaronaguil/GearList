var setMatchingElementsInactive = function (idRegex) {
    console.log("****IN navbar.js SETMATCHINGELEMENTSINACTIVE****");
    
    var listOfElements = document.querySelectorAll(idRegex);
    for (var element of listOfElements) {
        element.classList.remove('active')
    }
}