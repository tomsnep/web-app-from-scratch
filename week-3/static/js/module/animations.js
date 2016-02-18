var animations = (function() {

	var main = document.querySelector('main');
	var detailview = document.querySelector('#photo-detail-view');
	var video = document.querySelector('#photo-detail-view video');

	var touchState = function(){
		
		if ('addEventListener' in document) {
		    document.addEventListener('DOMContentLoaded', function() {
		        FastClick.attach(document.body);
		    }, false);
		}
	};

	var blur = function(){
		
		main.classList.add('blur');
		detailview.classList.add('active');

		
		document.onkeydown = function(evt) {
		    evt = evt || window.event;
		    if (evt.keyCode == 27) {
		        escapeDetailView();
		    }
		};

		document.querySelector('html').addEventListener('click' ,escapeDetailView);
		
	};

	var escapeDetailView = function(){
			main.classList.remove('blur');
			detailview.classList.remove('active');
			video.pause();
	};

	return {
		touchState,
		blur,
		escapeDetailView
	}
})()