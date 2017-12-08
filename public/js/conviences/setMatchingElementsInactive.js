var setMatchingElementsInactive = function (selector) {
    console.log("****IN conveinces/setMatchingElementsInactive.js****");
    
    var listOfElements = document.querySelectorAll(selector);
    for (var element of listOfElements) {
        element.classList.remove('active')
    }
}