var getPosts = function (id) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "/posts/user/" + id, false); // false for synchronous request [DEPRECATED]
    xmlHttp.send();
    console.log(xmlHttp.status)
    console.log(xmlHttp.responseText)
    displayPosts(xmlHttp.responseText);
}


var displayPosts = function (data) {



    var previousPostId = 0;
    var rowNumber = 1;
    var postIndex = 1;
    var imageIndex = 1;

    var bodyContainer = document.getElementById('body-container');
    bodyContainer.innerText = '';
    var dataJSON = JSON.parse(data);

    var rowContainer = document.createElement('div');
    rowContainer.setAttribute('class', 'row');
    rowContainer.setAttribute('id', 'rowContainer-' + rowNumber);

    var rowOfThree = document.createElement('div');
    rowOfThree.setAttribute('class', 'col-sm-10 col-sm-push-1');
    rowOfThree.setAttribute('id', 'rowOfThree-' + rowNumber);

    var row = document.createElement('div');
    row.setAttribute('class', 'row');
    row.style.marginTop = "10px";
    row.setAttribute('id', 'row-' + rowNumber);

    rowOfThree.append(row);
    rowContainer.append(rowOfThree);
    bodyContainer.append(rowContainer);
    var testNum = 0;
    var multipleImageContainer = document.createElement('div');

    for (var index = 0; index < dataJSON.length; index++) {
        console.log('**************** ' + dataJSON[index].id)
        if (previousPostId != dataJSON[index].id) {
            if (previousPostId != 0) {
                var columnContainer = document.getElementById('container-' + previousPostId);
                var titleContainer = document.getElementById('title-container-' + previousPostId);
                // console.log(columnContainer)
                // console.log(titleContainer)
                // console.log(multipleImageContainer)
                columnContainer.insertBefore(multipleImageContainer, titleContainer);
                multipleImageContainer = document.createElement('div');
            }

            previousPostId = dataJSON[index].id;
            console.log(postIndex % 3);



            var column = document.createElement('div');
            if (imageIndex == 1) {
                column.setAttribute('class', 'col-sm-3 col-sm-push-1');
                imageIndex++;
            }
            else if (imageIndex == 2) {
                column.setAttribute('class', 'col-sm-3 col-sm-push-2');
                imageIndex++;
            }
            else if (imageIndex == 3) {
                column.setAttribute('class', 'col-sm-3 col-sm-push-3');
                imageIndex = 1;
            }
            column.setAttribute('id', 'container-' + dataJSON[index].id)
            column.style.border = "1px solid black"

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

            var titleContainer = document.createElement('div');
            titleContainer.setAttribute('id', 'title-container-' + dataJSON[index].id);
            var title = document.createElement('p');
            title.innerText = dataJSON[index].title;
            title.style.marginTop = "10px";

            titleContainer.append(title);

            var descriptionContainer = document.createElement('div');
            descriptionContainer.setAttribute('id', 'description-container-' + dataJSON[index].id);
            var description = document.createElement('p');
            description.innerText = dataJSON[index].description;
            description.style.marginTop = "10px";

            descriptionContainer.append(description);

            column.append(imageContainer);
            column.append(titleContainer);
            column.append(descriptionContainer);

            var postRow = document.getElementById('row-' + rowNumber);
            postRow.appendChild(column);


            var images = document.createElement('img');
            images.setAttribute('src', '/images/' + dataJSON[index].image + '.png');
            images.setAttribute('image-id', dataJSON[index].id);
            images.style.width = "25px";
            images.style.height = "25px";

            images.addEventListener('click', function (event) {
                console.log(event.target.getAttribute('src'));
                var imageSrc = event.target.getAttribute('src');
                var imageId = event.target.getAttribute('image-id');

                var highlightedImage = document.getElementById('image-' + imageId);
                highlightedImage.setAttribute('src', imageSrc);

            });

            multipleImageContainer.append(images);

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
                row.style.marginTop = "10px";
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
            var image = document.createElement('img');
            image.setAttribute('src', '/images/' + dataJSON[index].image + '.png');
            image.setAttribute('image-id', dataJSON[index].id);
            image.style.width = "25px";
            image.style.height = "25px";


            image.addEventListener('click', function (event) {
                console.log(event.target.getAttribute('src'));
                var imageSrc = event.target.getAttribute('src');
                var imageId = event.target.getAttribute('image-id');

                var highlightedImage = document.getElementById('image-' + imageId);
                highlightedImage.setAttribute('src', imageSrc);

            });
            // imageContainer.append(image);
            multipleImageContainer.append(image);

        }
    }

    console.log('testNum: ' + testNum);
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
            pageNums.addEventListener('click', function(event){
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
    else{
        for (var i = 1; i <= 10; i++) {
            var pageNums = document.createElement('a');
            pageNums.innerText = i;
            pageNums.setAttribute('id', i)
            pageNums.style.textDecoration = 'underlined';
            pageNums.style.marginLeft = '35px';
            pageNums.style.fontSize = '2em';
            pageNums.addEventListener('click', function(event){
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
            if(i==1){
                pageNums.style.marginLeft = '20px';
            }
            else{
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