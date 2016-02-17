var detailView = (function(photoId) {
	
	var photoDetail = document.querySelector('#photo-detail-view');
	
	return {

		getData: function(photoId) {
			
			// Fire ajax call to get data from a specific photo
			aja()
			   .url('https://api.instagram.com/v1/media/' + photoId + '?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b')
			   .type('jsonp')
			   .cache('false')
			   .on('success', function(data) {	
                    var detailData = data.data;
                  
                    // check if photo is a video, if true > fire checkVideo() 
                    // to see if there is already a html video tag or else 
                    // fire renderPhoto() to render the image
                    if(detailData.type == 'video'){	
                    	detailView.toggleVideo(detailData);
                    } else {
                    	detailView.renderPhoto(detailData)
                    }
                })
                .go();
		},

		toggleVideo: function(detailData) {
			var videoEl = document.querySelector('.photo-detail-view-video');
			var img = document.querySelector('.photo-detail-view-img');

			// add active class to show video element
			videoEl.classList.add('active'); 
			
			// remove active class to hide img element
			if (img.classList.contains('active')) {
				img.classList.remove('active');
			};

			detailView.renderVideo(detailData);

		},

		checkVideo: function(detailData) {

			// make var video to check if there is a video element in the dom
			var video = document.querySelector('#photo-video');
			
			// check if video exists
			if (typeof(video) != 'undefined' && video != null){
					console.log('video el is true, therefore renderVideo()');
				  	// the video element does exist, therefore the renderVideo() is fired to render the videod data
				  	detailView.renderVideo(detailData);
				  	
				} else {
					console.log('video el is false, therefore createVideo()');
					// no video element detected, therefore createVideo() is fired to create a video element
					detailView.createVideo(detailData);	
				}
		},

		// sadly this doesnt work with transparency.js :(
		// createVideo: function(detailData) {
			
		// 	// the video elements parent is selected: videoContainer
		// 	// the image element is selected, this element is needed to declare the position of where the video element needs to be created
		// 	var videoContainer = document.querySelector('#photo-detail-view > a');
		// 	var photoImg = document.querySelector('#photo-detail-view img');

		// 	// create video element
		// 	var el = document.createElement('video');
			
		// 	// set attributes of video element
		// 	el.setAttribute('id', 'photo-video');
		// 	el.setAttribute('data-bind', 'photoVideo');
		// 	el.setAttribute('controls', 'controls');

		// 	// insert the video element before the image element, 
		// 	// otherwise the video element will be placed as last child, 
		// 	// it must be first or second child, it will be 
		// 	// the next sibling of the image element: video = second child
		// 	videoContainer.insertBefore(el, photoImg.nextSibling)

		// 	console.log('video el was created');

		// 	// fire renderVideo() to render the video data inside the created video element
		// 	detailView.renderVideo(detailData);			
		// },

		renderVideo: function(detailData) {

			// create directives
			var directives = {

                photoLink: {
                    href: function(params) {
                        return this.link;
                    }
                },    
                photoLikes: {
                	text: function(params) {
                		return 'Likes:' + this.likes.count;
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
                		return 'Posted by:' + this.user.username;
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
			Transparency.render(detailView.photoDetail, detailData,  directives);
		},

		renderPhoto: function(detailData) {

			// make var video to check if there is a video element in the dom
			var video = document.querySelector('.photo-detail-view-video');
			var img = document.querySelector('.photo-detail-view-img');

			// add active class to display image
			img.classList.add('active');

			// remove active class from video element
			if (video.classList.contains('active')) {
				video.classList.remove('active');
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
                		return 'Likes:' + this.likes.count;
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
                		return 'Posted by:' + this.user.username;
                	}
                },
                photoId: {
                	id: function(params){
                		return this.id;
                	}
                }
	        };

	        // render data
	        Transparency.render(detailView.photoDetail, detailData,  directives);
		}

	}
})();