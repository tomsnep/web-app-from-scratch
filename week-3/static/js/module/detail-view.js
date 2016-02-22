var detailView = (function(photoId) {
	
	var getData = function(photoId) {
        
        // show loader
        loaderModule.getLoader().classList.add('loader-active');

		// Fire ajax call to get data from a specific photo
		aja()
		   .url('https://api.instagram.com/v1/media/' + photoId + '?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b')
		   .type('jsonp')
		   .cache('false')
		   .on('success', function(data) {	
                // check if photo is a video, if true > fire checkVideo() 
                // to see if there is already a html video tag or else 
                // fire renderPhoto() to render the image
                if(data.data.type == 'video'){	
                	detailView.toggleVideo(data.data);
                } else {
                	detailView.renderPhoto(data.data)
                }
            })
            .go();

        animations.blur();
	};

	var toggleVideo = function(detailData) {

		// add active class to show video element
		variables.detailView.videoEl.classList.add('active'); 
		
		// remove active class to hide img element
		if (variables.detailView.img.classList.contains('active')) {
			variables.detailView.img.classList.remove('active');
		};

		detailView.renderVideo(detailData);

	};

	var renderVideo = function(detailData) {

		// create directives
		var directives = {

            photoLink: {
                href: function(params) {
                    return this.link;
                }
            },    
            photoLikes: {
            	text: function(params) {
            		return this.likes.count;
            	}
            },
            photoTitle: {
            	text: function(params) {
            		// if statement to prevent crashing when there is no caption is added
            		if(this.caption){
            			return this.caption.text;
            		} else {
            			return null
            		}
            	}
            },
            photoUser: {
            	text: function(params) {
            		return this.user.username;
            	}
            },
            photoId: {
            	id: function(params){
            		return this.id;
            	}
            },
            photoVideo: {
				src: function(params) {
					return this.videos.standard_resolution.url;
				}
			},
		}
		// render data
		Transparency.render(variables.detailView.photoDetail, detailData,  directives);
        // hide loader when data is rendered
        loaderModule.getLoader().classList.remove('loader-active');
	};

	var renderPhoto = function(detailData) {

			// add active class to display image
			variables.detailView.img.classList.add('active');

			// remove active class from video element
			if (variables.detailView.videoEl.classList.contains('active')) {
				variables.detailView.videoEl.classList.remove('active');
			};
			
			// declare directives
			var directives = {

                photoLink: {
                    href: function(params) {
                        return this.link
                    }
                },    
                photoImage: {
                    src: function(params) {
                        return this.images.low_resolution.url;
                    }
                },
                photoLikes: {
                	text: function(params) {
                		return this.likes.count;
                	}
                },
                photoTitle: {
                	text: function(params) {
                		// if statement to prevent crashing when there is no caption is added
                		if(this.caption){
                			return this.caption.text
                		} else {
                			return null
                		}
                	}
                },
                photoUser: {
                	text: function(params){
                		return  this.user.username;
                	}
                },
                photoId: {
                	id: function(params){
                		return this.id;
                	}
                }
	        };

	        // render data
	        Transparency.render(variables.detailView.photoDetail, detailData,  directives);

            // hide loader when data is rendered
            loaderModule.getLoader().classList.remove('loader-active');
		};

	return {
		getData,
		toggleVideo,
		renderVideo,
		renderPhoto
	}
})();