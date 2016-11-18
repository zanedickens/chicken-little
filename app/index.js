(function () {
	'use strict';

	var configuration = function ($stateProvider, $urlRouterProvider) {

		$stateProvider.state('home', {
			url: '/',
			templateUrl: 'app/home/home.html',
			controller: 'HomeController as vm'
		})
	};

	angular
		.module('chickenLittle', ['ui.router', 'geolocation'])
		.config(['$stateProvider', configuration]);

})();