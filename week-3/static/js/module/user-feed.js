var userFeed = (function(userId, loader) {
    
    return {
        getData: function(userId, loader) {

            // show loader
            // loader.classList.add('loader-active');

            //fire ajax call to get photofeed of the user
            aja()
               .url('https://api.instagram.com/v1/users/' + userId + '/media/recent/?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b')
               .type('jsonp')
               .cache('false')
               .on('success', function(data) {
                    
                   var data = data.data;

                   //fire renderData to render the photofeed
                   userFeed.renderData(data);

               })
               .go();
        },
        renderData: function(data) {

            // declare parent target for transparency.js
            var userFeedUl = document.querySelector('#user-photo-feed ul');
            
            //declare directives
            var directives = {

                photoId: {
                    id: function(params) {
                        return this.id;
                    }
                },
                photoLink: {
                    href: function(params) {
                        return this.link;
                    }
                },
                imgSrc: {
                    src: function(params) {
                        return this.images.standard_resolution.url;
                    }
                },
                likes: {
                    text: function(params) {
                        return 'Likes:' + this.likes.count;
                    }
                }
            };

            //render data
            Transparency.render(userFeedUl, data,  directives);

            // hide loader when data is rendered
            // userSearch.loader.classList.remove('loader-active');
        }
    }
})();