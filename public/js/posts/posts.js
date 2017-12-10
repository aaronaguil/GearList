var getUserFollowedPosts = function (id) {
    var rowContainer = document.getElementById('row-container');
    if(rowContainer){
        var columnContainer1 = document.getElementById('columnContainer1');
        console.log(columnContainer1)
        document.getElementById('columnContainer1').innerText = '';        
        document.getElementById('columnContainer2').innerText = '';        
        document.getElementById('columnContainer3').innerText = '';        
        document.getElementById('columnContainer4').innerText = '';        
        document.getElementById('columnContainer5').innerText = '';  
              
        console.log('in getUserFollowedPost IFFFFFFFFFFFFFFFFF')
        var pageNum = rowContainer.getAttribute('page-num');
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", "/posts/user/" + id + "/" + pageNum + "/", false); // false for synchronous request [DEPRECATED]
        xmlHttp.send();
        console.log(xmlHttp.status)
        // console.log(xmlHttp.responseText)
        displayPosts(xmlHttp.responseText);
    }
    else{
        console.log('in getUserFollowedPost ELLLLLLLLLLLLLLSE')
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", "/posts/user/" + id + "/1/", false); // false for synchronous request [DEPRECATED]
        xmlHttp.send();
        console.log(xmlHttp.status)
        // console.log(xmlHttp.responseText)
        createPostColumns();
        displayPosts(xmlHttp.responseText);
    }
    
}

var createPostColumns = function(){
    var bodyContainer = document.getElementById('body-container');
    bodyContainer.innerText = '';
    
    var rowContainer = document.createElement('div');
    rowContainer.setAttribute('class', 'row');
    rowContainer.setAttribute('id', 'row-container');
    rowContainer.setAttribute('page-num', '1');
    rowContainer.style.padding = '5%';
    
    var columnContainer1 = document.createElement('div');
    columnContainer1.setAttribute('id', 'columnContainer1');
    columnContainer1.style.width = '20%';
    columnContainer1.style.cssFloat = 'left';
    
    var columnContainer2 = document.createElement('div');
    columnContainer2.setAttribute('id', 'columnContainer2');
    columnContainer2.style.width = '20%';
    columnContainer2.style.cssFloat = 'left';
    
    var columnContainer3 = document.createElement('div');
    columnContainer3.setAttribute('id', 'columnContainer3');
    columnContainer3.style.width = '20%';
    columnContainer3.style.cssFloat = 'left';
    
    var columnContainer4 = document.createElement('div');
    columnContainer4.setAttribute('id', 'columnContainer4');
    columnContainer4.style.width = '20%';
    columnContainer4.style.cssFloat = 'left';
    
    var columnContainer5 = document.createElement('div');
    columnContainer5.setAttribute('id', 'columnContainer5');
    columnContainer5.style.width = '20%';
    columnContainer5.style.cssFloat = 'left';
    
    rowContainer.append(columnContainer1);
    rowContainer.append(columnContainer2);
    rowContainer.append(columnContainer3);
    rowContainer.append(columnContainer4);
    rowContainer.append(columnContainer5);
   
    bodyContainer.append(rowContainer);
}


var displayPosts = function (data) {

   
    var user = auth();
  
    var previousPostId = 0;
    var rowNumber = 1;
    var colNum = 1;
    var postIndex = 1;
    var imageIndex = 1;

    var bodyContainer = document.getElementById('body-container');
    // bodyContainer.innerText = '';
    var dataJSON = JSON.parse(data);
    var testNum = 0;
    multipleImageContainer = document.createElement('div');
    multipleImageContainer.style.textAlign = 'center';
    multipleImageContainer.style.marginBottom = '20px';
    multipleImageContainer.style.marginTop = '10px';

    for (var index = 0; index < dataJSON.length; index++) {
            //gets the number of likes of post based on post id
            var numLikes = dataJSON[index].likes;
            previousPostId = dataJSON[index].id;



            var column = document.createElement('div');
            column.setAttribute('class', '');
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
            var height = parseInt((Math.random() * 125) + 85);
            var shortestColumnNum = 1;
            for(var columnNum = 1; columnNum <= 5; columnNum ++){
                if ($("#columnContainer" + columnNum).height() < $("#columnContainer" + shortestColumnNum).height()){
                    shortestColumnNum = columnNum;
                    break;
                }
            }
            image.style.height = height + 'px';
            image.style.marginTop = "10px";
            image.style.marginBottom = "10px";

            imageContainer.append(image);

            var likesContainer = document.createElement('div');
            likesContainer.setAttribute('id', 'likes-container-' + dataJSON[index].id);
            likesContainer.style.paddingLeft = '10px';
            likesContainer.style.paddingRight = "10px";
            likesContainer.style.paddingTop = "10px";
            likesContainer.style.borderTop = "1px solid #969E99";


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

                if(dataJSON[index].user_liked == '1' || dataJSON[index].user_liked == '0'){
                    likesIcon.addEventListener('click', function(event){
                        var user = auth();
                        var pid = event.target.getAttribute('postId');  
                        var xmlHttp = new XMLHttpRequest();
                        xmlHttp.open("GET", "/posts/likes/user/" + JSON.parse(user).id + "/" + JSON.parse(pid), false); // false for synchronous request [DEPRECATED]
                        xmlHttp.send();
                        var userCurrentlyLikePost = xmlHttp.responseText;
                    
                        if(userCurrentlyLikePost == 'TRUE'){
                            var likeIcon = event.target;
                            likeIcon.setAttribute('class', 'glyphicon glyphicon-heart-empty');
                            likeIcon.style.color = "black";
                            var numInfo = document.getElementById('like-word-or-num-' + pid);
                        
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
                            var numInfo = document.getElementById('like-word-or-num-' + pid);

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
                if(dataJSON[index].user_liked == '1' || dataJSON[index].user_liked == '0'){
                    if(dataJSON[index].user_liked == '1'){
                        likesIcon.style.color = 'red';
                        likesIcon.setAttribute('class', 'glyphicon glyphicon-heart');

                        likesIcon.addEventListener('click', function(event){
                            var user = auth();
                            var pid = event.target.getAttribute('postId');
                            var xmlHttp = new XMLHttpRequest();
                            xmlHttp.open("GET", "/posts/likes/user/" + JSON.parse(user).id + "/" + JSON.parse(pid), false); // false for synchronous request [DEPRECATED]
                            xmlHttp.send();
                            var userCurrentlyLikePost = xmlHttp.responseText;
                        
                            if(userCurrentlyLikePost == 'TRUE'){
                                var likeIcon = event.target;
                                likeIcon.setAttribute('class', 'glyphicon glyphicon-heart-empty');
                                likeIcon.style.color = "black";
                                var numInfo = document.getElementById('like-word-or-num-' + pid);
                            
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
                                var numInfo = document.getElementById('like-word-or-num-' + pid);

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
                            var pid = event.target.getAttribute('postId');
                            var xmlHttp = new XMLHttpRequest();
                            xmlHttp.open("GET", "/posts/likes/user/" + JSON.parse(user).id + "/" + JSON.parse(pid), false); // false for synchronous request [DEPRECATED]
                            xmlHttp.send();
                            var userCurrentlyLikePost = xmlHttp.responseText;
                        
                            if(userCurrentlyLikePost == 'TRUE'){
                                var likeIcon = event.target;
                                likeIcon.setAttribute('class', 'glyphicon glyphicon-heart-empty');
                                likeIcon.style.color = "black";
                                var numInfo = document.getElementById('like-word-or-num-' + pid);
                            
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
                                var numInfo = document.getElementById('like-word-or-num-' + pid);

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

            document.getElementById('columnContainer' + shortestColumnNum).append(column);
            postIndex++;

        if(colNum<5){
            colNum++;
        }
        else{
            colNum = 1;
        }
       
    }
}



var getAllPosts = function (pageNum) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "/posts/" + pageNum, false); // false for synchronous request [DEPRECATED]
    xmlHttp.send();
    createPostColumns();
    displayPosts(xmlHttp.responseText);
    // var totalPosts = getTotalPostsNum();
    // displayPagination(totalPosts);


}

var getMorePosts = function(uid){
    if(uid){
        var pageNum = document.getElementById('row-container').getAttribute('page-num')
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", "/posts/user/" + uid + "/" + pageNum + "/", false); // false for synchronous request [DEPRECATED]
        xmlHttp.send();
        createPostColumns();
        displayPosts(xmlHttp.responseText);
    }
    else{
        var pageNum = document.getElementById('row-container').getAttribute('page-num')
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", "/posts/" + pageNum, false); // false for synchronous request [DEPRECATED]
        xmlHttp.send();
        displayPosts(xmlHttp.responseText);        
    }
   
}


var getTotalPostsNum = function () {
    console.log('testing')
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "/posts/total/", false); // false for synchronous request [DEPRECATED]
    xmlHttp.send();
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