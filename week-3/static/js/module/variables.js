var variables = (function() {

	var touch = (function() {
		var el = document.querySelector('body');
		var menuSwipe = new Hammer(el);
		var userSearch = document.querySelector('a[href="#user-search"]');
		var tagSearch = document.querySelector('a[href="#tag-search"]');

		return {
			el,
			menuSwipe,
			userSearch,
			tagSearch
		}
	})();

	var animations = (function() {
		var main = document.querySelector('main');
		var detailView = document.querySelector('#photo-detail-view');
		var video = document.querySelector('#photo-detail-view video');
		var html = document.querySelector('html');
		var description = document.querySelectorAll('.description');
		
		return {
			main,
			detailView,
			video,
			html,
			description
		}
	})();

	var routes = (function() {
		var usersearch = document.querySelector('#user-search');
		var allSections = document.querySelectorAll('.nav-section');
	
		return {
			usersearch,
			allSections
		}
	})();

	var userSearch = (function() {
		var submit = document.querySelector('.user-search-submit');
		var input = document.querySelector('.user-search-input');
		var userGalleryUl = document.querySelector('#user-gallery-ul');
		var photoGallery = document.querySelector('#user-gallery');
	
		return {
			submit,
			input,
			userGalleryUl,
			photoGallery,
		}
	})();

	var userFeed = (function() {
		var userFeedUl = document.querySelector('#user-photo-feed ul');
		var userInfo = document.querySelector('#user-info');

		return{
			userFeedUl,
			userInfo
		}
	})();

	var tagFeed = (function() {
		var submit = document.querySelector('.tag-search-submit');
		var input = document.querySelector('.tag-search-input');
		var photoGalleryUl = document.querySelector('#photo-gallery-ul');
		var photoGallery = document.querySelector('#photo-gallery');

		return {
			submit,
			input,
			photoGalleryUl,
			photoGallery
		}
	})();

	var detailView = (function() {
		var photoDetail = document.querySelector('#photo-detail-view');
		var videoEl = document.querySelector('.photo-detail-view-video');
		var img = document.querySelector('.photo-detail-view-img');

		return {
			photoDetail,
			videoEl,
			img
		}
	})();

	return {
		touch,
		animations,
		routes,
		userSearch,
		userFeed,
		tagFeed,
		detailView
	}
})();