var submitPost = function(event) {
    console.log("****IN navbar/submitPost****");
    
    var titleInput = document.getElementById('titleInputBox').value;
    var descriptionInput = document.getElementById('descriptionInputBox').value;
    console.log(titleInput);
    console.log(descriptionInput);
    var postData = {'title': titleInput,
                    'description': descriptionInput};
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "/post/submit", false); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify(postData));
    console.log(xmlHttp.status)
    if (xmlHttp.status == 200) {
        console.log("");
        var bodyContainer = document.getElementById('body-container');
        bodyContainer.innerHTML = '';
    }
}
