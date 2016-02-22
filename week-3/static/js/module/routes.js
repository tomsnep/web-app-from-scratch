var routes = (function() {

		//
		var init = function() {
			
			// set #user-search as default
			window.location.hash = '#user-search';
			variables.routes.usersearch.classList.add('active');

			routie({
			    'user-search': function() {
			    	// get path name and fire sections.toggle() to show section
			    	var hashName = this.path;
			    	routes.toggle(hashName);

			    	// fire searchTag() to enable searching on tags
			    	userSearch.searchTag();
			    },
			    'user-feed/:id': function(userId) {   	
			    	
			    	// fire userInfo() & userFeed() to get data about the specific user
			    	userInfo.getData(userId);
			    	userFeed.getData(userId);

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
		};

		var toggle = function(hashName) { 

			// get the active section by var hashName
			var activeSection = document.getElementById(hashName);
			
			// remove class active for all sections
			for (var i = 0; i < variables.routes.allSections.length; i++) {
				  variables.routes.allSections[i].classList.remove('active');
			};

			// toggle class active for the active section
			activeSection.classList.toggle('active');
		};

		return {
			init,
			toggle
	}
})();
