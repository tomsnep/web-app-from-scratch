// add iife
(function() {
	// Casper - ; vergeten
	'use strict'

	var app = {
		init: function(){

			// call routes
			// Casper - call routes.init();
			routes.init();
		}
	};

	var routes = {
		
		init: function(){
			// Casper - !hoeft niet! private variabelen met _ om dat aan te geven
			// use available hash to save state otherwise use #startscreen as default
			var currentHash = window.location.hash || '#startscreen';
			document.querySelector(currentHash).classList.add('active');

			// Casper - je gebruikt "" en '' door elkaar heen
			window.addEventListener("hashchange", function(){
				
				// declare route var with the hash
				var newHash = window.location.hash;

				// call sections.toggle() with param route
				// Casper - param route ? denk dat dat een oude comment is
				sections.toggle(currentHash,newHash);

				//update currentHash with the newHash parameter
				// Casper - het wordt gegelijk gezet aan de newHash variabelen. parameters zijn variabelen die in een function worden gevoerd
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

	app.init(); // call app.init()
// Casper - volgens jslint moeten de () tussen de } en ), die buitenste haakjes zijn er om aan te geven voor de lezer dat het een IIFE is
})();