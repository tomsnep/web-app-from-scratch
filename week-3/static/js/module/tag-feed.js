var tagFeed = (function() {
	var searchTag = function() {

		// select submit and input fields
		var submit = document.querySelector('.search-submit');
		var input = document.querySelector('.search-input');

		submit.onclick = function() {
			// get input value
			var tagName = input.value;

			// fire getData() & renderTagName() to get data and show search value
			getData(tagName);
			renderTagName(tagName);

			 // show loader
        	loaderModule.getLoader().classList.add('loader-active');
		};
	};
	
	var getRandomData = function() {

		// fire ajax call to get photo's containing tagName
		aja()
		   .url('https://api.instagram.com/v1/media/popular?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b')
		   .type('jsonp')
		   .cache('false')
		   .on('success', function(data) {
		   		
                var data = data.data;

               	// filter data with underscore.js
                var filteredData = _.map(data, function(photo) {
                	return _.pick(photo, 'images','id');
                });

                //fire renderData() to render thumbnails
                renderData(filteredData);

		   })
		   .go();
	};

	var getData = function(tagName) {
		// fire ajax call to get photo's containing tagName
		aja()
		   .url('https://api.instagram.com/v1/tags/' + tagName + '/media/recent?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b')
		   .type('jsonp')
		   .cache('false')
		   .on('success', function(data) {
		   		
                var data = data.data;

               	// filter data with underscore.js
                var filteredData = _.map(data, function(photo) {
                	return _.pick(photo, 'images','id');
                });

                // check if username search tag exists
                if(filteredData.length < 1){
                	//if not, renderError()
                	renderError(tagName);
                } else {
                	//fire renderData() to render thumbnails
                	renderData(filteredData);
                }

		   })
		   .go();
	};

	var renderData = function(filteredData) {
		
		// declare target parent for transparency.js
		var photoGalleryUl = document.querySelector('#photo-gallery-ul');
			
		//declare directives
		var directives = {

            photoThumbnail: {
                src: function(params) {
                    return this.images.thumbnail.url;
                }
            },
            photoLink: {
                href: function(params) {
                    return '#photo-detail/' + this.id;
                }
            }
        };
        // render data
        Transparency.render(photoGalleryUl, filteredData,  directives);
        // hide loader
        loaderModule.getLoader().classList.remove('loader-active');
	};

	var photoGallery = document.querySelector('#photo-gallery');

	var renderError = function(tagName){
					
		// declare directive
		var directive = {

			tagTitle: {
				text: function(params) {
					return 'Whoopsie, there are no pictures with the hashtag #' + tagName;
				}
			}
		};

		// render data
		Transparency.render(photoGallery, tagName, directive);
		 // hide loader
        loaderModule.getLoader().classList.remove('loader-active');
	};

	var renderTagName = function(tagName){
		
		// declare directive
		var directive = {

			tagTitle: {
				text: function(params) {
					return 'You are looking for #' + tagName;
				}
			}
		};

		// render data
		Transparency.render(photoGallery, tagName, directive);
	};

	return {
		searchTag,
		getRandomData,
		getData,
		renderData,
		renderError,
		photoGallery,
		renderTagName
	}
})();