var touch = (function(){
	var swipe = function(){

			(variables.touch.menuSwipe).on('swiperight', function(){
				var userSearch = document.querySelector('a[href="#user-search"]');
				variables.touch.userSearch.click();
			});
			(variables.touch.menuSwipe).on('swipeleft', function(){
				var tagSearch = document.querySelector('a[href="#tag-search"]');
				variables.touch.tagSearch.click();
			});
	};

	var shake = function(){
		var startShake = new Shake({
				    threshold: 15, // optional shake strength threshold
				    timeout: 1000 // optional, determines the frequency of event generation
				})

		startShake.start();

		var randomPictures = function() {
		    window.location.hash = '#tag-search';
		    tagFeed.getRandomData();
		};

		window.addEventListener('shake', randomPictures, false);
	};

	return {
		swipe,
		shake
	}
})()