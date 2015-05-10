exports.get = function(io){

    var Twitter = require('node-twitter');
    var tweets = [];
    var tweetsTemp = [];
    io.on('connection', function(socket){
        var socketId = socket.id;
        //console.log('connected to: ' + socketId);
        io.emit('tweets', tweets);
    });

    var twitterRestClient = new Twitter.RestClient(

    );

    var getTweetsInterval = setInterval(function() {
            tweetsTemp = [];
            getTweets();
        }, 300000);

    var accounts = ['gameovergreggy', 'notaxation', 'timgettys', 'nick_scarpino', 'kindafunnyvids'];
    var accountIndex;
    var accountInterval;
    var getTweets = function() {
        accountIndex = 0;
        accountInterval = setInterval(function(){
            getTweetsByName(accountIndex);
            accountIndex++;
        },30000);
    };
    var getTweetsByName = function(index){
        twitterRestClient.statusesUserTimeline({
            screen_name: accounts[index],
            count: 5,
            include_rts: false,
            exclude_replies: true
        }, function (error, result) {
            if (error) {
                console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
            }

            if (result) {
                //console.log(result);
                for (var i = 0; i < result.length; i++) {
                    var resultIndex = result.length - 1;
                    //console.log(tweetsTemp.length);
                    var tweetsIndex = tweetsTemp.length;
                    tweetsTemp[tweetsIndex] = {
                        account: '',
                        text: '',
                        time: '',
                        url: ''
                    };
                    tweetsTemp[tweetsIndex].account = result[i].user.name;
                    console.log(result[i].user.name);
                    tweetsTemp[tweetsIndex].text = result[i].text;
                    tweetsTemp[tweetsIndex].time = result[i].created_at;
                    //console.log(result[i].created_at);
                    if(index == 0){
                        tweetsTemp[tweetsIndex].url = 'https://twitter.com/GameOverGreggy/status/' + result[i].id_str;
                    }else if(index == 1){
                        tweetsTemp[tweetsIndex].url = 'https://twitter.com/notaxation/status/' + result[i].id_str;
                    }else if(index == 2){
                        tweetsTemp[tweetsIndex].url = 'https://twitter.com/TimGettys/status/' + result[i].id_str;
                    }else if(index == 3){
                        tweetsTemp[tweetsIndex].url = 'https://twitter.com/Nick_Scarpino/status/' + result[i].id_str;
                    }else if(index == 4){
                        tweetsTemp[tweetsIndex].url = 'https://twitter.com/KindaFunnyVids/status/' + result[i].id_str;
                        if(i == resultIndex) {
                            tweets = tweetsTemp;
                            io.emit('tweets', tweets);
                            console.log('sent tweets');
                            clearInterval(accountInterval);
                        }
                    }
                }
            }
        });
    };
    getTweets();
};