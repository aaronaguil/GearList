var createPostForm = function(event) {
    console.log("****IN navbar.js CREATEPOSTFORM****");
    
    var createPostButton = document.getElementById('navbar-button-loggedIn-createPost');     
    var selector_AllNavbarButtons = "[id^=navbar-button]";
    setMatchingElementsInactive(selector_AllNavbarButtons);
    createPostButton.setAttribute('class', 'active');

//    var homeButton = document.getElementById('homeButton');
//    homeButton.setAttribute('class', '');
    
    var bodyContainer = document.getElementById('body-container');
    bodyContainer.innerHTML = '';

    var titleInputBox = document.createElement('input');
    titleInputBox.setAttribute('placeholder', 'Title')
    titleInputBox.setAttribute('type', 'text')
    titleInputBox.setAttribute('id', 'titleInputBox');

    var descriptionInputBox = document.createElement('input');
    descriptionInputBox.setAttribute('placeholder', 'Description')
    descriptionInputBox.setAttribute('type', 'text')
    descriptionInputBox.setAttribute('id', 'descriptionInputBox');

    var submitPostButton = document.createElement('button');
    submitPostButton.innerText = 'Post!';
    submitPostButton.addEventListener('click', submitPost);
    
    bodyContainer.append(titleInputBox);
    bodyContainer.append(descriptionInputBox);
    bodyContainer.append(submitPostButton);
    
    //var form = document.createElement('form');
}
