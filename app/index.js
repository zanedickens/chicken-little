(function () {
	'use strict';

	var configuration = function ($stateProvider, $urlRouterProvider) {

		$stateProvider.state('home', {
				url: '/',
				templateUrl: 'app/home/home.html',
				controller: 'HomeController as vm'
			}) // This ended up a single state app, so this is techinically not needed. But it could grow in future.
	};

	angular
		.module('chickenLittle', ['ui.router', 'geolocation'])
		.config(['$stateProvider', configuration]);

})();