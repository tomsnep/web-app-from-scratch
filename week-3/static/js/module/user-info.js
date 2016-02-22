var userInfo = (function(userId) {

    var getData = function(userId) {
        //fire ajax call to get info about the userId
        aja()
           .url('https://api.instagram.com/v1/users/' + userId + '/?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b')
           .type('jsonp')
           .cache('false')
           .on('success', function(data) {
                
                //check if there is data
                if (data.data == undefined){
                        renderError(data.data);
                    } else {
                        renderData(data.data);
                   }
           })   
           .go();
    };

    var renderData = function(data) {
        // declare directives
        var directives = {

            profilePicture: {
                src: function(params) {
                    return this.profile_picture;
                }
            },
            username: {
                text: function(params) {
                    return this.username;
                }
            },
            media: {
                text: function(params) {
                    return 'Media: ' + this.counts.media;
                }
            },
            followers: {
                text: function(params) {
                    return 'Followers: ' + this.counts.followed_by;
                }
            },
            follows: {
                text: function(params) {
                    return 'Follows: ' + this.counts.follows;
                }
            },
            bio: {
                text: function(params){
                    return this.bio;
                }
            },
            website: {
                href: function(params) {
                    return this.website;
                 }
            },
        };
        // render data
        Transparency.render(variables.userFeed.userInfo, data, directives);
    };

    var renderError = function(){

        var data = 'Damn, this user care\'s about his privacy. Therefore you can not see any pictures of this user.';

        var directive = {
            errorMessage: {
                text: function(params) {
                    return data;
                }
            },
        };
        // render error
        Transparency.render(variables.userFeed.userInfo, data, directive);
        // hide loader
        loaderModule.getLoader().classList.remove('loader-active');
    }

    return {
       getData,
       renderData
    }
})();