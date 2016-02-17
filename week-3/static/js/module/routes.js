var routes = (function(loader) {

		window.location.hash = '#user-search';
		var usersearch = document.querySelector('#user-search');
		usersearch.classList.add('active');
		

		return {

			init: function(loader) {
			console.log('routes init is fired');
			// set #user-search as default

			window.location.hash = '#user-search';
			var usersearch = document.querySelector('#user-search');
			usersearch.classList.add('active');

			routie({
			    'user-search': function(loader) {
			    	
			    	// get path name and fire sections.toggle() to show section
			    	var hashName = this.path;
			    	routes.toggle(hashName);

			    	// fire searchTag() to enable searching on tags
			    	userSearch.searchTag(loader);
			    },
			    'user-feed/:id': function(userId, loader) {   	
			    	
			    	// fire userInfo() & userFeed() to get data about the specific user
			    	userInfo.getData(userId, loader);
			    	userFeed.getData(userId, loader);

			    	// show user-feed section
			    	routes.toggle('user-feed');

			    },
			    'tag-search': function() {
			    	
			    	// get path name and fire routes.toggle() to show section
			    	var hashName = this.path;
			    	routes.toggle(hashName);

			    	// fire searchTag()  to get data about the chosen tag
			    	tagFeed.searchTag();
			    },
			    'photo-detail/:id': function(photoId) { 

			    	// fire getData() to start render proces of detailView  	
			    	detailView.getData(photoId);
			    }
			});	
		},

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
	}
})();
