// add iife
(function() {
	'use strict'

	/* STRUCTERES */
	var app = {
		init: function(){

			// call routes
			routes.init();
		}
	};

	var routes = {
		
		init: function() {

			// set #user-search as default

			window.location.hash = '#user-search';
			var usersearch = document.querySelector('#user-search');
			usersearch.classList.add('active');

			routie({
			    'user-search': function() {
			    	
			    	// get path name and fire sections.toggle() to show section
			    	var hashName = this.path;
			    	sections.toggle(hashName);

			    	// fire searchTag() to enable searching on tags
			    	userSearch.searchTag();
			    },
			    'user-feed/:id': function(userId) {   	
			    	
			    	// fire userInfo() & userFeed() to get data about the specific user
			    	userInfo.getData(userId);
			    	userFeed.getData(userId);

			    	// show user-feed section
			    	sections.toggle('user-feed');

			    },
			    'tag-search': function() {
			    	
			    	// get path name and fire sections.toggle() to show section
			    	var hashName = this.path;
			    	sections.toggle(hashName);

			    	// fire searchTag()  to get data about the chosen tag
			    	tagFeed.searchTag();
			    },
			    'photo-detail/:id': function(photoId) { 

			    	// fire getData() to start render proces of detailView  	
			    	detailView.getData(photoId);
			    }
			});	
		}
	};

	var sections = {

		toggle: function(hashName) { 

				// get all sections and the active section by var hashName
				var allSections = document.querySelectorAll('section');
				var activeSection = document.getElementById(hashName);
				
				// remove class active for all sections
				for (var i=0; i<allSections.length; i++) {
					  allSections[i].classList.remove('active');
					}

				// toggle class active for the active section
				activeSection.classList.toggle('active');
		}
	};

	/* USER SEARCH */

	var userSearch = {

		loader: document.querySelector('.loader'),

		searchTag: function() {

			// select submit and input fields 
			var submit = document.querySelector('.search-user-submit');
			var input = document.querySelector('.search-user-input');

			submit.onclick = function() {
				
				console.log('submit works');
				
				// get input value
				var user = input.value;

				// fire getData() and renderUser() functions to get data and show search value 
				userSearch.getData(user);
				userSearch.renderUser(user);

				userSearch.loader.classList.add('loader-active');

			}
		},

		getData: function(user) {

			//fire ajax call to get list of users data
			aja()
			   .url('https://api.instagram.com/v1/users/search?q=' + user + '&access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b')
			   .type('jsonp')
			   .cache('false')
			   .on('success', function(data) {
			   		
                    var data = data.data;
             
             		// filter data with underscore.js
                    var filteredData = _.map(data, function(photo) {
                    	return _.pick(photo, 'username','id', 'profile_picture');
                    });

                    //fire renderData() to render the list of users
                    userSearch.renderData(filteredData);

			   })
			   .go();
		},

		renderData: function(filteredData) {
			
			// declare target parent for transparency.js
			var userGalleryUl = document.querySelector('#user-gallery-ul');
			
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
            userSearch.loader.classList.remove('loader-active');
            Transparency.render(userGalleryUl, filteredData,  directives);
			
		},

		// render chosen Username as Title;
		renderUser: function(user){
			
			var photoGallery = document.querySelector('#user-gallery');
			
			var directive = {

				tagTitle: {
					text: function(params) {
						return "Searching for users with the name " + user;
					}
				}
			}
			Transparency.render(photoGallery, user, directive);
		}
	};

	var userInfo = {

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
		},
	};

	var userFeed = {

		getData: function(userId) {

			// show loader
			userSearch.loader.classList.add('loader-active');

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
            userSearch.loader.classList.remove('loader-active');
		}
	};

	/* TAG SEARCH */

	var tagFeed = {

		searchTag: function() {

			// select submit and input fields
			var submit = document.querySelector('.search-submit');
			var input = document.querySelector('.search-input');

			submit.onclick = function() {
				
				// get input value
				var tagName = input.value;

				// fire getData() & renderTagName() to get data and show search value
				tagFeed.getData(tagName);
				tagFeed.renderTagName(tagName);
			}
		},

		getData: function(tagName) {
			
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

                    //fire renderData() to render thumbnails
                    tagFeed.renderData(filteredData);

			   })
			   .go();
		},

		renderData: function(filteredData) {
			
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
		
		},

		renderTagName: function(tagName){
			
			// declare target parent for transparence.js
			var photoGallery = document.querySelector('#photo-gallery');
			
			// declare directive
			var directive = {

				tagTitle: {
					text: function(params) {
						return tagName;
					}
				}
			}

			// render data
			Transparency.render(photoGallery, tagName, directive);
		}
	};

	var detailView = {

		// declare global var
		photoDetail: document.querySelector('#photo-detail-view'),

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
	};

	var animations = {

		// clickListener: function(){
		// 	var menuItems = document.querySelectorAll('#nav a');

		// 	menuItems.forEach()

		// 	menuItem.addEventListener('click', function(){
		// 		console.log('addEventListener works')
		// 		animations.menuStyle();
		// 	});
		// }(),
		// menuStyle: function(){
		// 	var hash = window.location.hash;
		// 	var navEl = document.querySelectorAll('#nav a[href]');
		// 	var navElLength = navEl.length;

		// 	console.log('works')
		// 	for(var i = 0; i < navElLength; i++){
		// 		var navElHash = navEl[i].getAttribute('href');
				
		// 		if (hash == navElHash) {
		// 			console.log(navElHash);
		// 		}
		// 	}

			// console.log(navEl);

			// // var parent = navEl.parentElement;
			// for()
			// if (hash = navEl) {
				
		// 	// 	// parent.classList.add('menu-active');
		// 	// 	console.log(navEl);
		// 	// } else {

		// 	// }
		// 	// console.log(navEl);
		// }()
	}

	var hammer = {
		enableSwipe: function(){
			
			var el = document.querySelector('body');
			var menuSwipe = new Hammer(el);

			menuSwipe.on('swipeleft', function(){
				var menuItem = document.querySelector('a[href="#user-search"]');
				menuItem.click();
			});
			menuSwipe.on('swiperight', function(){
				var menuItem = document.querySelector('a[href="#tag-search"]');
				menuItem.click();
			});
		}()
	}
	app.init(); // call app.init()
})();

//in cooperation with Tijs Luitse
//Credits to Casper Boutens for the if else statement & underscore.js help