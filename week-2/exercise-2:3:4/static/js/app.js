// add iife
(function() {
	'use strict'

	var app = {
		init: function(){

			// call routes
			routes.init();
		}
	};

	var routes = {
		
		init: function(){

			var startscreen = document.querySelector('#startscreen');
			startscreen.classList.add('active');

			routie({
			    'startscreen': function() {
			    	
			    	var hashName = this.path;
			    	sections.toggle(hashName);
			    },
			    'photo-feed': function() {
			    	
			    	var hashName = this.path;
			    	sections.toggle(hashName);
			    	photofeed.search();
			    }
			});	
		}
	};


	var sections = {

		toggle: function(hashName){

				var allSections = document.querySelectorAll('section');
				var singleSection = document.getElementById(hashName);
			
				for (var i=0; i<allSections.length; i++) {
					  allSections[i].classList.remove('active');
					}

				singleSection.classList.toggle('active');
		}
	};


	var photofeed = {

		search: function() {

			var submit = document.querySelector('.searchSubmit');
			var input = document.querySelector('.searchInput');

			submit.onclick = function(){
	
				var tagName = input.value;
				photofeed.render(tagName);
			}
		},

		render: function(tagName){
			aja()
			   .url('https://api.instagram.com/v1/tags/' + tagName + '/media/recent?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b')
			   .type('jsonp')
			   .cache('false')
			   .on('success', function(data){
			   		
                    var data = data.data;
                   		
                    var filteredData = _.map(data, function(photo) {
                    	return _.pick(photo, 'link','images','likes','caption','user', 'id');
                    });

                    console.log(filteredData)

                    var directives = {

                        photoLink: {
                            href: function(params) {
                                return this.link;
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
                        		if(this.caption){
                        			return this.caption.text
                        		} else {
                        			return null
                        		}
                        		// if statement to prevent crashing when there is no caption is added
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
                        }
                    };

                    Transparency.render(document.getElementById('photoGallery'), filteredData,  directives);

			   })
			   .go();
		}
	};
	app.init(); // call app.init()
})();