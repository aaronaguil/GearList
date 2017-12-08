var addEventListenersByName = function (selector) {
    console.log("****IN conveinces/addEventListenrsByName.js****");

    var listOfElements = document.querySelectorAll(selector);
    for (var element of listOfElements) {
        var eventListenerName = element.id.slice(element.id.lastIndexOf("-")+1);
        element.addEventListener("click", window[eventListenerName]);
    }
}