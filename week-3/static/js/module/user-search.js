var userSearch = (function() {

	var searchTag = function() {
	
		variables.userSearch.submit.onclick = function() {			
			// get input value
			var user = variables.userSearch.input.value;

			// fire getData() and renderUser() functions to get data and show search value 
			getData(user);
			renderUser(user);
			//hide loader
			loaderModule.getLoader().classList.add('loader-active');
		}
	};

	var getData = function(user) {
		//fire ajax call to get list of users data
		aja()
		   .url('https://api.instagram.com/v1/users/search?q=' + user + '&access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b')
		   .type('jsonp')
		   .cache('false')
		   .on('success', function(data) {
		   		
         		// filter data with underscore.js
                var filteredData = _.map(data.data, function(photo) {
                	return _.pick(photo, 'username','id', 'profile_picture');
                });

                // check if username search tag exists
                if(filteredData.length < 1){
                	// if not, render error
                	renderError(user);
                } else {
                	//fire renderData() to render the list of users
	                renderData(filteredData);
                }
		   })
		   .go();
	};
	
	var renderData = function(filteredData) {		
		// declare directives
		var directives = {

            userThumbnail: {
                src: function(params) {
                    return this.profile_picture;
                }
            },
            userName: {
            	text: function(params) {
            		return this.username;
            	}
            },
            userLink: {
                href: function(params) {
                    return '#user-feed/' + this.id;
                }
            }
        };
        // render data
        Transparency.render(variables.userSearch.userGalleryUl, filteredData,  directives);
        // hide loader 
        loaderModule.getLoader().classList.remove('loader-active');
	};

	var renderError = function(user) {
		
		var directive = {
			userNameTag: {
				text: function(params) {
					return 'Whoopsie, there is no account with the name: ' + user;
				}
			}
		};
		//render error
		Transparency.render(variables.userSearch.photoGallery, user, directive);
		// hide loader
		loaderModule.getLoader().classList.remove('loader-active');
	};

	var renderUser = function(user) {
		
		var directive = {
			userNameTag: {
				text: function(params) {
					return 'You are looking for: ' + user;
				}
			}
		};
		// render user search tag 
		Transparency.render(variables.userSearch.photoGallery, user, directive);
	};

	return {
		searchTag,
		getData,
		renderData,
		renderError,
		renderUser
	}
})();