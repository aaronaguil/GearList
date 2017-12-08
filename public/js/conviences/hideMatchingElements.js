var hideMatchingElements = function (selector) {
    console.log("****IN conveinces/hideMatchingElements.js****");
    
    var listOfElements = document.querySelectorAll(selector);
    for (var element of listOfElements) {
        element.style.display = 'none';
    }
}