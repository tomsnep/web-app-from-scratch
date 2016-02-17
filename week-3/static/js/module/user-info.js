var userInfo = (function(userId) {

    return {
        getData: function(userId) {


            //fire ajax call to get info about the userId
            aja()
               .url('https://api.instagram.com/v1/users/' + userId + '/?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b')
               .type('jsonp')
               .cache('false')
               .on('success', function(data) {
                    
                    var data = data.data;

                    //fire renderData() to render the info about the user
                    userInfo.renderData(data);
               })   
               .go();
        },

        renderData: function(filteredData) {
             // declare target parent for transparency.js
            var userInfo = document.querySelector('#user-info');

            // declare directives
            var directives = {

                profilePicture: {
                    src: function(params) {
                        return this.profile_picture;
                    }
                },
                username: {
                    text: function(params) {
                        return 'username:' + this.username;
                    }
                },
                media: {
                    text: function(params) {
                        return 'media:' + this.counts.media;
                    }
                },
                followers: {
                    text: function(params) {
                        return 'followers:' + this.counts.followed_by;
                    }
                },
                follows: {
                    text: function(params) {
                        return 'follows:' + this.counts.follows;
                    }
                },
                website: {
                    href: function(params) {
                        return this.website;
                     }
                },
            };
            
            // render data
            Transparency.render(userInfo, filteredData,  directives);
        }
    }
})();