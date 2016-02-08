// add iife
(function() {
    // lisa - ; achter 'use strict'
	'use strict'

	var app = {
		init: function(){

			// call routes
			routes.init();
		}
	};

	var routes = {
		
		init: function(){
			
			// use available hash to save state otherwise use #startscreen as default
			var currentHash = window.location.hash || '#startscreen';
			// new var for caching
			var currentHashEl = document.querySelector(currentHash);
			currentHashEl.classList.add('active');

			window.addEventListener('hashchange', function(){
				
				// declare newHash var with the hash
				var newHash = window.location.hash;

				// call sections.toggle()
				sections.toggle(currentHash,newHash);

				//update currentHash with the newHash
				currentHash = newHash;
			}, false);
		}
	};

	var sections = {
		toggle: function(currentHash,newHash){

			var currentEl = document.querySelector(currentHash);
			var newEl = document.querySelector(newHash);

			currentEl.classList.remove('active');
			newEl.classList.add('active');

		}
	};

	app.init(); // call app.init()
})();