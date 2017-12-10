var getPosts = function (id) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "/posts/user/" + id + "/1/", false); // false for synchronous request [DEPRECATED]
    xmlHttp.send();
    console.log(xmlHttp.status)
    // console.log(xmlHttp.responseText)
    displayPosts(xmlHttp.responseText);
}


var displayPosts = function (data) {


   
    var user = auth();
  
    // console.log(xmlHttp.responseText)

    var previousPostId = 0;
    var rowNumber = 1;
    var postIndex = 1;
    var imageIndex = 1;

    var bodyContainer = document.getElementById('body-container');
    bodyContainer.innerText = '';
    var dataJSON = JSON.parse(data);
    if(dataJSON){
        console.log('********************************')
        console.log(dataJSON[0])
        console.log('********************************')
    }
    var rowContainer = document.createElement('div');
    rowContainer.setAttribute('class', 'row');
    rowContainer.setAttribute('id', 'rowContainer-' + rowNumber);

    var rowOfThree = document.createElement('div');
    rowOfThree.setAttribute('class', 'col-sm-10 col-sm-push-1');
    rowOfThree.setAttribute('id', 'rowOfThree-' + rowNumber);

    var row = document.createElement('div');
    row.setAttribute('class', 'row');
    row.style.marginTop = "50px";
    row.setAttribute('id', 'row-' + rowNumber);

    rowOfThree.append(row);
    rowContainer.append(rowOfThree);
    bodyContainer.append(rowContainer);
    var testNum = 0;
    multipleImageContainer = document.createElement('div');
    multipleImageContainer.style.textAlign = 'center';
    multipleImageContainer.style.marginBottom = '20px';
    multipleImageContainer.style.marginTop = '10px';

    for (var index = 0; index < dataJSON.length; index++) {
        if (previousPostId != dataJSON[index].id) {
            console.log(dataJSON[index])
            //gets the number of likes of post based on post id
            var numLikes = dataJSON[index].likes;

            if (previousPostId != 0) {
                var columnContainer = document.getElementById('container-' + previousPostId);
                var titleContainer = document.getElementById('likes-container-' + previousPostId);
                columnContainer.insertBefore(multipleImageContainer, titleContainer);
                multipleImageContainer = document.createElement('div');
                multipleImageContainer.style.textAlign = 'center';
                multipleImageContainer.style.marginBottom = '20px';
                multipleImageContainer.style.marginTop = '10px';
            }

            previousPostId = dataJSON[index].id;
            console.log(postIndex % 3);



            var column = document.createElement('div');
            column.setAttribute('class', 'col-sm-4');
            column.style.padding = '20px';

            var card = document.createElement('div');
            card.setAttribute('id', 'container-' + dataJSON[index].id)
            card.style.borderRadius = '5px';
            card.style.padding = '10px';
            card.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';



            var imageContainer = document.createElement('div');
            imageContainer.setAttribute('id', 'image-container-' + dataJSON[index].id);
            var image = document.createElement('img');
            image.setAttribute('src', '/images/' + dataJSON[index].image + '.png');
            image.setAttribute('id', 'image-' + dataJSON[index].id);
            image.style.width = "100%";
            image.style.height = "100%";
            image.style.marginTop = "10px";
            image.style.marginBottom = "10px";

            imageContainer.append(image);

            var likesContainer = document.createElement('div');
            likesContainer.setAttribute('id', 'likes-container-' + dataJSON[index].id);
            likesContainer.style.paddingLeft = '10px';
            likesContainer.style.paddingRight = "10px";
            likesContainer.style.paddingTop = "10px";
            likesContainer.style.borderTop = "1px solid #969E99";


            console.log("numLikes")
            console.log(numLikes)
            if (numLikes == 0) {
                var likesDiv = document.createElement('div');
                likesDiv.style.cssFloat = 'left';
                likesDiv.style.marginRight = '10px';                                
                var likeWordDiv = document.createElement('div');
                likeWordDiv.style.marginTop = '-1px';
                var likesIcon = document.createElement('span');
                likesIcon.style.fontSize = "1.5em";    
                likesIcon.setAttribute('postId', dataJSON[index].id)                
                likesIcon.setAttribute('class', 'glyphicon glyphicon-heart-empty');
                console.log(user)

                if(dataJSON[index].user_liked == '1' || dataJSON[index].user_liked == '0'){
                    likesIcon.addEventListener('click', function(event){
                        var user = auth();
                        var pid = event.target.getAttribute('postId');  
                        console.log(pid)                      
                        var xmlHttp = new XMLHttpRequest();
                        xmlHttp.open("GET", "/posts/likes/user/" + JSON.parse(user).id + "/" + JSON.parse(pid), false); // false for synchronous request [DEPRECATED]
                        xmlHttp.send();
                        var userCurrentlyLikePost = xmlHttp.responseText;
                    
                        if(userCurrentlyLikePost == 'TRUE'){
                            var likeIcon = event.target;
                            likeIcon.setAttribute('class', 'glyphicon glyphicon-heart-empty');
                            likeIcon.style.color = "black";
                            console.log(pid)
                            var numInfo = document.getElementById('like-word-or-num-' + pid);
                            console.log(numInfo)
                        
                            numInfo.innerText = JSON.parse(numInfo.innerText) - 1;

                            var xmlHttp = new XMLHttpRequest();
                            xmlHttp.open("POST", "/post/like/user/delete/" + JSON.parse(user).id + "/" + JSON.parse(pid), false); // false for synchronous request [DEPRECATED]
                            xmlHttp.send();
                            var userCurrentlyLikePost = xmlHttp.responseText;
                        }
                        else{
                            var likeIcon = event.target;
                            likeIcon.setAttribute('class', 'glyphicon glyphicon-heart');
                            likeIcon.style.color = "red";
                            console.log(pid)
                            var numInfo = document.getElementById('like-word-or-num-' + pid);
                            console.log(numInfo)

                            if(numInfo.innerText == 'Like'){
                                numInfo.innerText = "1";
                            }
                            else{
                                numInfo.innerText = JSON.parse(numInfo.innerText) + 1;
                            }

                            var xmlHttp = new XMLHttpRequest();
                            xmlHttp.open("POST", "/post/like/user/add/" + JSON.parse(user).id + "/" + JSON.parse(pid), false); // false for synchronous request [DEPRECATED]
                            xmlHttp.send();
                            var userCurrentlyLikePost = xmlHttp.responseText;
                        }

                    })
                }
                else{
                    likesIcon.addEventListener('click', function(event){
                        console.log('logged out')
                    })
                }
                var likeWord = document.createElement('span');
                likeWord.setAttribute('id', 'like-word-or-num-' + dataJSON[index].id);
                likeWord.innerText = 'Like';

                likeWordDiv.append(likeWord);
                likesDiv.append(likesIcon);
                likesContainer.append(likesDiv);
                likesContainer.append(likeWordDiv);
            }
            else {
                var likesDiv = document.createElement('div');                
                likesDiv.style.cssFloat = 'left';
                likesDiv.style.marginRight = '10px';                
                var numLikesDiv = document.createElement('div');                
                numLikesDiv.style.marginTop = '1px';
                var likesIcon = document.createElement('span');
                likesIcon.setAttribute('postId', dataJSON[index].id)
                likesIcon.style.fontSize = "1.5em";
                console.log('data user liked')
                console.log(dataJSON[index].user_liked)
                if(dataJSON[index].user_liked == '1' || dataJSON[index].user_liked == '0'){
                    
                    // var xmlHttp = new XMLHttpRequest();
                    // xmlHttp.open("GET", "/posts/likes/user/" + JSON.parse(user).id + "/" + dataJSON[index].id, false); // false for synchronous request [DEPRECATED]
                    // xmlHttp.send();
                    // var userLikePost = xmlHttp.responseText;
                    console.log(dataJSON[index].id)
                    console.log(dataJSON[index].user_liked)
                    if(dataJSON[index].user_liked == '1'){
                        likesIcon.style.color = 'red';
                        likesIcon.setAttribute('class', 'glyphicon glyphicon-heart');

                        likesIcon.addEventListener('click', function(event){
                            var user = auth();
                            console.log(JSON.parse(user).id)
                            var pid = event.target.getAttribute('postId');
                            console.log(pid)  
                            var xmlHttp = new XMLHttpRequest();
                            xmlHttp.open("GET", "/posts/likes/user/" + JSON.parse(user).id + "/" + JSON.parse(pid), false); // false for synchronous request [DEPRECATED]
                            xmlHttp.send();
                            var userCurrentlyLikePost = xmlHttp.responseText;
                        
                            if(userCurrentlyLikePost == 'TRUE'){
                                var likeIcon = event.target;
                                likeIcon.setAttribute('class', 'glyphicon glyphicon-heart-empty');
                                likeIcon.style.color = "black";
                                console.log(pid)
                                var numInfo = document.getElementById('like-word-or-num-' + pid);
                                console.log(numInfo)
                            
                                numInfo.innerText = JSON.parse(numInfo.innerText) - 1;

                                var xmlHttp = new XMLHttpRequest();
                                xmlHttp.open("POST", "/post/like/user/delete/" + JSON.parse(user).id + "/" + JSON.parse(pid), false); // false for synchronous request [DEPRECATED]
                                xmlHttp.send();
                                var userCurrentlyLikePost = xmlHttp.responseText;
                            }
                            else{
                                var likeIcon = event.target;
                                likeIcon.setAttribute('class', 'glyphicon glyphicon-heart');
                                likeIcon.style.color = "red";
                                console.log(pid)
                                var numInfo = document.getElementById('like-word-or-num-' + pid);
                                console.log(numInfo)

                                if(numInfo.innerText == 'Like'){
                                    numInfo.innerText = "1";
                                }
                                else{
                                    numInfo.innerText = JSON.parse(numInfo.innerText) + 1;
                                }

                                var xmlHttp = new XMLHttpRequest();
                                xmlHttp.open("POST", "/post/like/user/add/" + JSON.parse(user).id + "/" + JSON.parse(pid), false); // false for synchronous request [DEPRECATED]
                                xmlHttp.send();
                                var userCurrentlyLikePost = xmlHttp.responseText;
                            }
                       
                        
                        })
                    }
                    else{
                        likesIcon.setAttribute('class', 'glyphicon glyphicon-heart-empty');

                        likesIcon.addEventListener('click', function(event){
                            var user = auth();
                            console.log(JSON.parse(user).id)
                            var pid = event.target.getAttribute('postId');
                            console.log(pid)  
                            var xmlHttp = new XMLHttpRequest();
                            xmlHttp.open("GET", "/posts/likes/user/" + JSON.parse(user).id + "/" + JSON.parse(pid), false); // false for synchronous request [DEPRECATED]
                            xmlHttp.send();
                            var userCurrentlyLikePost = xmlHttp.responseText;
                        
                            if(userCurrentlyLikePost == 'TRUE'){
                                console.log('it equals true')
                                var likeIcon = event.target;
                                likeIcon.setAttribute('class', 'glyphicon glyphicon-heart-empty');
                                likeIcon.style.color = "black";
                                console.log(pid)
                                var numInfo = document.getElementById('like-word-or-num-' + pid);
                                console.log(numInfo)
                            
                                numInfo.innerText = JSON.parse(numInfo.innerText) - 1;

                                var xmlHttp = new XMLHttpRequest();
                                xmlHttp.open("POST", "/post/like/user/delete/" + JSON.parse(user).id + "/" + JSON.parse(pid), false); // false for synchronous request [DEPRECATED]
                                xmlHttp.send();
                                var userCurrentlyLikePost = xmlHttp.responseText;
                            }
                            else{
                                var likeIcon = event.target;
                                likeIcon.setAttribute('class', 'glyphicon glyphicon-heart');
                                likeIcon.style.color = "red";
                                console.log(pid)
                                var numInfo = document.getElementById('like-word-or-num-' + pid);
                                console.log(numInfo)

                                if(numInfo.innerText == 'Like'){
                                    numInfo.innerText = "1";
                                }
                                else{
                                    numInfo.innerText = JSON.parse(numInfo.innerText) + 1;
                                }

                                var xmlHttp = new XMLHttpRequest();
                                xmlHttp.open("POST", "/post/like/user/add/" + JSON.parse(user).id + "/" + JSON.parse(pid), false); // false for synchronous request [DEPRECATED]
                                xmlHttp.send();
                                var userCurrentlyLikePost = xmlHttp.responseText;
                            }
                       
                        
                        })
                    }
                    
                }
                else{
                    likesIcon.setAttribute('class', 'glyphicon glyphicon-heart-empty');
                    likesIcon.addEventListener('click', function(event){
                        console.log('logged out')
                    })
                }

                var numberOfLikes = document.createElement('span');
                numberOfLikes.setAttribute('id', 'like-word-or-num-' + dataJSON[index].id);
                numberOfLikes.innerText = numLikes;
                likesDiv.append(likesIcon)
                numLikesDiv.append(numberOfLikes)
                likesContainer.append(likesDiv);
                likesContainer.append(numLikesDiv);

            }


            var titleContainer = document.createElement('div');
            titleContainer.setAttribute('id', 'title-container-' + dataJSON[index].id);
            titleContainer.style.paddingLeft = '10px';
            titleContainer.style.paddingRight = "10px";
            var title = document.createElement('p');
            title.innerText = dataJSON[index].title;
            title.style.fontWeight = "bold";
            title.style.marginTop = "10px";

            titleContainer.append(title);

            var descriptionContainer = document.createElement('div');
            descriptionContainer.setAttribute('id', 'description-container-' + dataJSON[index].id);
            descriptionContainer.style.paddingLeft = "10px";
            descriptionContainer.style.paddingRight = "10px";
            var description = document.createElement('p');
            description.innerText = dataJSON[index].description;
            description.style.marginTop = "10px";

            descriptionContainer.append(description);

            card.append(imageContainer);
            card.append(likesContainer);
            card.append(titleContainer);
            card.append(descriptionContainer);
            column.append(card);

            var postRow = document.getElementById('row-' + rowNumber);
            postRow.appendChild(column);


            var extraImage = document.createElement('img');
            extraImage.setAttribute('src', '/images/' + dataJSON[index].image + '.png');
            extraImage.setAttribute('image-id', dataJSON[index].id);
            extraImage.style.width = "25px";
            extraImage.style.height = "25px";

            extraImage.addEventListener('click', function (event) {
                console.log(event.target.getAttribute('src'));
                var imageSrc = event.target.getAttribute('src');
                var imageId = event.target.getAttribute('image-id');

                var highlightedImage = document.getElementById('image-' + imageId);
                highlightedImage.setAttribute('src', imageSrc);

            });

            multipleImageContainer.append(extraImage);

            if ((postIndex % 3) == 0) {
                rowNumber++;

                var rowContainer = document.createElement('div');
                rowContainer.setAttribute('class', 'row');
                rowContainer.setAttribute('id', 'rowContainer-' + rowNumber);

                var rowOfThree = document.createElement('div');
                rowOfThree.setAttribute('class', 'col-sm-10 col-sm-push-1');
                rowOfThree.setAttribute('id', 'rowOfThree-' + rowNumber);

                var row = document.createElement('div');
                row.setAttribute('class', 'row');
                row.setAttribute('id', 'row-' + rowNumber);

                rowOfThree.append(row);
                rowContainer.append(rowOfThree);
                bodyContainer.append(rowContainer);

            }

            postIndex++;
            console.log("index: " + dataJSON[0].title);
        }
        else {
            testNum++;
            // var imageContainer = document.createElement('div');
            // imageContainer.style.width = "25px";
            // imageContainer.style.height = "25px";
            // imageContainer.style.cssFloat = "left";
            var extraImage = document.createElement('img');
            extraImage.setAttribute('src', '/images/' + dataJSON[index].image + '.png');
            extraImage.setAttribute('image-id', dataJSON[index].id);
            extraImage.style.width = "25px";
            extraImage.style.height = "25px";
            extraImage.style.marginLeft = "5px";


            extraImage.addEventListener('click', function (event) {
                console.log(event.target.getAttribute('src'));
                var imageSrc = event.target.getAttribute('src');
                var imageId = event.target.getAttribute('image-id');

                var highlightedImage = document.getElementById('image-' + imageId);
                highlightedImage.setAttribute('src', imageSrc);

            });
            // imageContainer.append(image);
            multipleImageContainer.append(extraImage);

        }
    }

    console.log('testNum: ' + testNum);
    console.log("**************************************")
}



var getAllPosts = function (pageNum) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "/posts/" + pageNum, false); // false for synchronous request [DEPRECATED]
    xmlHttp.send();
    console.log(xmlHttp.status)
    console.log(xmlHttp.responseText)
    console.log("response length: " + JSON.parse(xmlHttp.responseText).length)

    displayPosts(xmlHttp.responseText);

    var totalPosts = getTotalPostsNum();
    displayPagination(totalPosts);


}


var getTotalPostsNum = function () {
    console.log('testing')
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "/posts/total/", false); // false for synchronous request [DEPRECATED]
    xmlHttp.send();
    console.log(xmlHttp.status)
    console.log(xmlHttp.responseText)
    return xmlHttp.responseText;
}

var displayPagination = function (totalPosts) {
    var bodyContainer = document.getElementById('body-container');
    totalNumPosts = JSON.parse(totalPosts);
    var numPages = 0;
    if ((totalNumPosts % 100) == 0) {
        numPages = totalNumPosts / 100;
    }
    else {
        numPages = ((totalNumPosts / 100) + 1);
    }
    console.log("numPages: " + numPages)
    var paginationContainer = document.createElement('div');
    paginationContainer.style.textAlign = 'center';
    paginationContainer.style.marginTop = '25px';
    paginationContainer.style.marginBottom = '50px';

    if (numPages <= 10) {
        for (var i = 1; i <= numPages; i++) {
            var pageNums = document.createElement('a');
            pageNums.innerText = i;
            pageNums.setAttribute('id', i)
            pageNums.style.textDecoration = 'underlined';
            pageNums.style.marginLeft = '35px';
            pageNums.style.fontSize = '2em';
            pageNums.addEventListener('click', function (event) {
                var page = event.target.getAttribute('id');
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open("GET", "/posts/" + page, false); // false for synchronous request [DEPRECATED]
                xmlHttp.send();
                console.log(xmlHttp.status)
                console.log(xmlHttp.responseText)
                displayPosts(xmlHttp.responseText);

                var totalPosts = getTotalPostsNum();
                displayPagination(totalPosts);
            })

            paginationContainer.append(pageNums);
            bodyContainer.append(paginationContainer);
        }
    }
    else {
        for (var i = 1; i <= 10; i++) {
            var pageNums = document.createElement('a');
            pageNums.innerText = i;
            pageNums.setAttribute('id', i)
            pageNums.style.textDecoration = 'underlined';
            pageNums.style.marginLeft = '35px';
            pageNums.style.fontSize = '2em';
            pageNums.addEventListener('click', function (event) {
                var page = event.target.getAttribute('id');
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open("GET", "/posts/" + page, false); // false for synchronous request [DEPRECATED]
                xmlHttp.send();
                console.log(xmlHttp.status)
                console.log(xmlHttp.responseText)
                displayPosts(xmlHttp.responseText);

                var totalPosts = getTotalPostsNum();
                displayPagination(totalPosts);
            })

            paginationContainer.append(pageNums);
        }
        for (var i = 1; i <= 3; i++) {
            var pageNums = document.createElement('a');
            pageNums.innerText = '.';
            pageNums.style.textDecoration = 'none';
            if (i == 1) {
                pageNums.style.marginLeft = '20px';
            }
            else {
                pageNums.style.marginLeft = '5px';
            }
            pageNums.style.fontSize = '2em';
            paginationContainer.append(pageNums);
        }

        var pageNums = document.createElement('a');
        pageNums.innerText = numPages;
        pageNums.style.textDecoration = 'none';
        pageNums.style.marginLeft = '20px';
        pageNums.style.fontSize = '2em';
        paginationContainer.append(pageNums);

        bodyContainer.append(paginationContainer);
    }
}