var animations = (function() {

	var touchState = function() {
		
		if ('addEventListener' in document) {
		    document.addEventListener('DOMContentLoaded', function() {
		        FastClick.attach(document.body);
		    }, false);
		}
	};

	var blur = function() {
		
		variables.animations.main.classList.add('blur');
		variables.animations.detailView.classList.add('active');
	
		document.onkeydown = function(evt) {
		    evt = evt || window.event;
		    if (evt.keyCode == 27) {
		        escapeDetailView();
		    }
		};

		variables.animations.html.addEventListener('click' ,escapeDetailView);
		
	};

	var escapeDetailView = function() {
			variables.animations.main.classList.remove('blur');
			variables.animations.detailView.classList.remove('active');
			variables.animations.video.pause();
	};

	return {
		touchState,
		blur,
		escapeDetailView
	}
})()