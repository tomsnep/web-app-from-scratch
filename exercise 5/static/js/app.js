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
			
			// use available hash to save state otherwise use #startscreen as default
			var currentHash = window.location.hash || '#startscreen';
			document.querySelector(currentHash).classList.add('active');

			window.addEventListener("hashchange", function(){
				
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

			document.querySelector(currentHash).classList.remove('active');
			document.querySelector(newHash).classList.add('active');

		}
	};

	// Fijne beschrijving door comments

	app.init(); // call app.init()
})();