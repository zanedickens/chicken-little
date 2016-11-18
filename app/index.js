(function () {
	'use strict';

	var configuration = function ($stateProvider, $urlRouterProvider) {

		$stateProvider.state('home', {
			url: '/',
			templateUrl: 'app/home/home.html',
			controller: 'HomeController as vm'
		})

		.state('error', {
			url: '^/error',
			templateUrl: 'app/error/error.html'
		})
	};

	angular
		.module('chickenLittle', ['ui.router', 'geolocation'])
		.config(['$stateProvider', configuration]);

})();