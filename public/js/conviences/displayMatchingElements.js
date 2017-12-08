var displayMatchingElements = function (selector) {
    console.log("****IN conveinces/displayMatchingElements.js****");
    
    var listOfElements = document.querySelectorAll(selector);
    for (var element of listOfElements) {
        element.style.display = 'block';
    }
}