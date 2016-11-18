(function () {
	'use strict';

	angular
		.module('chickenLittle')
		.controller('HomeController', ['$http', '$interval', '$state', '$timeout', 'geolocation', function ($http, $interval, $state, $timeout, geolocation) {

			/* jshint validthis: true */
			var vm = this;

			// Initial Status
			vm.status = "Is the sky falling?!";

			// The Loader is initially off
			vm.showProgress = false;

			// HTML GeoLocation and Open Weather API Functions
			vm.getLocation = getLocation;
			vm.fetchWeather = fetchWeather;

			function getLocation() {

				vm.title = "Chicken Little"

				// If this is not the first time - user has used reset button
				if (vm.pristine == false) {
					vm.status = "Alright from the top!";
				}

				// When resetting this visually clears the old information
				vm.gotWeather = false;
				// removes the question "Is the sky falling?"
				vm.isTheSkyFalling = false;

				geolocation.getLocation().then(function (data) {

					// Tell user we're checking location
					vm.showProgress = true;
					vm.status = "Checking your location - hold still.";

					$timeout(function () {
						vm.coords = {
							lat: data.coords.latitude,
							long: data.coords.longitude
						};
						// Location check successful tell the user
						vm.showProgress = false;
						vm.status = 'Found you!';

						$timeout(function () {
							vm.status = 'Now about that sky...';
							$timeout(function () {
								fetchWeather(vm.coords.lat, vm.coords.long);
							}, 2000);
						}, 2500);
					}, 3000);

				});
				vm.pristine = false; // First time is over now
			}

			getLocation(); // Run app on load / launch

			function fetchWeather() {

				vm.showProgress = true;

				$http.get("http://api.openweathermap.org/data/2.5/weather?lat=" + vm.coords.lat + "&lon=" + vm.coords.long + "&APPID=d91e913e0a1ce7a631f4036170372669&units=metric")
					.then(function (response) {

						// API Response
						vm.details = response.data;

						vm.gotWeather = true;

						// sets the Weather icon using the Weather Icon Font
						vm.weatherID = 'owf-' + vm.details.weather[0].id;

						// temp in celcius
						vm.temp = Math.round(vm.details.main.temp) + '°C';

						// changes title to use the Open Weather main group name
						vm.title = vm.details.weather[0].main;

						if (200 <= vm.details.weather[0].id < 701) {
							vm.status = "You're safe! It's just " + vm.details.weather[0].description;
						} else {
							vm.status = "Something is definitely falling. Take cover!"
						}
						vm.showProgress = false;

					});
			}

		}]);
})();