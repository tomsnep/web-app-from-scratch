'use strict'

var launcher = (function() {
	
	var loader = document.querySelector('.loader');

	return {
		init: function() {
			// call routes
			routes.init(loader);

		}	
	};
})();


launcher.init();