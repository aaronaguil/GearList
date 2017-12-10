console.log("***RUNNING NAVBAR.JS****");

window.onload = function () {
    user = auth();
    console.log("****IN navbar.js ONLOAD****");
    console.log($("#body-container"))
    $(window).scroll(function() {
        console.log($(window).scrollTop());
        console.log($(document).height())
        if(($(document).height()-$(window).scrollTop()) < 2000){
            console.log('almost done')
            if(user){
                console.log(user);
                getMorePosts(JSON.parse(user).id);
            }
            else{
                getMorePosts();
            }
        }
        // var screenheight = parseInt($(document).height());
        // var scrolledpx = parseInt($("#body-container").scrollTop());     
        // var sum = screenheight+scrolledpx;
        // console.log($("div#container").scrollTop());
        // console.log("screen: " + screenheight);
        // console.log("sum=" + sum);
        // $("div.content").height(sum);
    })
    
    var selector_loggedInNavbarButtons = "[id^=navbar-button-loggedIn]";
    var selector_loggedOutNavbarButtons = "[id^=navbar-button-loggedOut]";
    if(user){        
        displayMatchingElements(selector_loggedInNavbarButtons);
        hideMatchingElements(selector_loggedOutNavbarButtons);
        getUserFollowedPosts(JSON.parse(user).id);
    }
    else{
        displayMatchingElements(selector_loggedOutNavbarButtons);
        hideMatchingElements(selector_loggedInNavbarButtons);
        getAllPosts(1);
    }

    var selector_allNavbarButtons = "[id^=navbar-button]";
    var selector_allLoginModalButtons = "[id^=loginModal-button]";
    var selector_allRegisterModalButtons = "[id^=registerModal-button]";
    addEventListenersByName(selector_allNavbarButtons);
    addEventListenersByName(selector_allLoginModalButtons);
    addEventListenersByName(selector_allRegisterModalButtons);

}

var auth = function(){
    console.log('in auth function navbar.js')
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "/auth/user", false); // false for synchronous request [DEPRECATED]
    xmlHttp.send();

    if(xmlHttp.responseText){
        return xmlHttp.responseText;
    }
    else{
        return null;
    }

}