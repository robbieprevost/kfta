var myApp = angular.module('myApp', ['ngRoute', 'angular-carousel']).factory('socket', function ($rootScope) {
    var socket = io.connect('http://198.199.118.31');
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
}).config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'https://www.youtube.com/**']);
});

var myController = myApp.controller('myController', function($scope, $rootScope, socket){

    $scope.data = {
        about: false,
        home: true,
        homeImg: '../images/kindafunnylogobluepixel.png',
        homeImgWhite: '../images/kindafunnylogopixel.png',
        homeImgBlue: '../images/kindafunnylogobluepixel.png',
        video: false,
        videoImg: '../images/playbuttonpixel.png',
        videoImgWhite: '../images/playbuttonpixel.png',
        videoImgBlue: '../images/playbuttonbluepixel.png',
        calender: false,
        calenderImg: '../images/calenderpixel.png',
        calenderImgWhite: '../images/calenderpixel.png',
        calenderImgBlue: '../images/calenderbluepixel.png',
        blog: false,
        blogImg: '../images/blogiconpixel.png',
        blogImgWhite: '../images/blogiconpixel.png',
        blogImgBlue: '../images/blogiconbluepixel.png',
        tweets: []
    };
    $scope.workers = {
        homeClick: function(){
            $scope.data.about = false;
            $scope.data.home = true;
            $scope.data.video = false;
            $scope.data.calender = false;
            $scope.data.blog = false;
            $scope.data.homeImg = $scope.data.homeImgBlue;
            $scope.data.videoImg = $scope.data.videoImgWhite;
            $scope.data.calenderImg = $scope.data.calenderImgWhite;
            $scope.data.blogImg = $scope.data.blogImgWhite;
        },
        videoClick: function(){
            $scope.data.about = false;
            $scope.data.home = false;
            $scope.data.video = true;
            $scope.data.calender = false;
            $scope.data.blog = false;
            $scope.data.homeImg = $scope.data.homeImgWhite;
            $scope.data.videoImg = $scope.data.videoImgBlue;
            $scope.data.calenderImg = $scope.data.calenderImgWhite;
            $scope.data.blogImg = $scope.data.blogImgWhite;
        },
        calenderClick: function(){
            $scope.data.about = false;
            $scope.data.home = false;
            $scope.data.video = false;
            $scope.data.calender = true;
            $scope.data.blog = false;
            $scope.data.homeImg = $scope.data.homeImgWhite;
            $scope.data.videoImg = $scope.data.videoImgWhite;
            $scope.data.calenderImg = $scope.data.calenderImgBlue;
            $scope.data.blogImg = $scope.data.blogImgWhite;
        },
        blogClick: function(){
            $scope.data.about = false;
            $scope.data.home = false;
            $scope.data.video = false;
            $scope.data.calender = false;
            $scope.data.blog = true;
            $scope.data.homeImg = $scope.data.homeImgWhite;
            $scope.data.videoImg = $scope.data.videoImgWhite;
            $scope.data.calenderImg = $scope.data.calenderImgWhite;
            $scope.data.blogImg = $scope.data.blogImgBlue;
        },
        aboutClick: function(){
            $scope.data.about = true;
            $scope.data.home = false;
            $scope.data.video = false;
            $scope.data.calender = false;
            $scope.data.blog = false;
            $scope.data.homeImg = $scope.data.homeImgBlue;
            $scope.data.videoImg = $scope.data.videoImgWhite;
            $scope.data.calenderImg = $scope.data.calenderImgWhite;
            $scope.data.blogImg = $scope.data.blogImgWhite;
        }
    };
    socket.on('tweets', function(data){
       console.log(data);
       for(var i=0;i<data.length;i++){
           $scope.data.tweets[i] = {
               account : data[i].account,
               text    : data[i].text,
               href    : data[i].url,
               time    : data[i].time
           };
           if(data[i].account == 'Greg Miller'){
               $scope.data.tweets[i].img = '../images/gregmillerprofilepic.jpeg';
           }else if(data[i].account == 'Colin Moriarty'){
               $scope.data.tweets[i].img = '../images/colinmoriartyprofilepic.jpg';
           }else if(data[i].account == 'Tim Gettys'){
               $scope.data.tweets[i].img = '../images/timgettysprofilepic.jpeg';
           }else if(data[i].account == 'Nick Scarpino'){
               $scope.data.tweets[i].img = '../images/nickscarpinoprofilepic.jpeg';
           }else if(data[i].account == 'Kinda Funny'){
               $scope.data.tweets[i].img = '../images/kindafunnyprofilepic.jpeg';
           }
       }
    });
});