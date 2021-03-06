(function () {
	'use strict';

	angular
		.module('chickenLittle')
		.controller('HomeController', ['$http', '$interval', '$state', '$timeout', 'geolocation', function ($http, $interval, $state, $timeout, geolocation) {

			/* jshint validthis: true */
			var vm = this;

			// Initial Status of the app
			vm.status = "Is the sky falling?!";
			vm.gotWeather = false;
			vm.showProgress = false;
			vm.geoFailAgain = false;
			vm.pristine = true;
			vm.coords = {};

			// These are weather codes when something is falling: Rain, Hail, Volanice Ash...
			var somethingIsFalling = [200, 201, 202, 210, 211, 212, 221, 230, 231, 232, 300, 301, 302, 310, 311, 312, 314, 321, 500, 501, 502, 503, 504, 511, 520, 521, 522, 531, 600, 601, 602, 611, 612, 615, 616, 620, 621, 622];

			// HTML GeoLocation and Open Weather API Functions
			vm.userLocation = userLocation;
			vm.tryAPIGeolocation = tryAPIGeolocation;
			vm.fetchWeather = fetchWeather;

			// Standard HTML5 Geolocation
			function userLocation() {

				vm.geoFailAgain = false; // Set's this false each time to show a change when button pressed

				vm.title = "Chicken Little";

				// If this is not the first time - user has used reset button
				if (vm.pristine === false) {
					vm.status = "Alright from the top!"; // Acknowledges user action
					vm.bodyID = 'weather-nil'; // Changes colour back to yellow
				}

				// When resetting this hides the old information
				vm.gotWeather = false;
				// removes the question "Is the sky falling?"
				vm.isTheSkyFalling = false;

				geolocation.getLocation()
					.then(function (data) {

						// Tell user we're checking location
						vm.showProgress = true;
						vm.status = "Checking your location - hold still.";

						$timeout(function () { // $timeout used so usre can read vm.status changes
							vm.coords = {
								lat: data.coords.latitude,
								long: data.coords.longitude
							};
							// Location check complete - remove progress
							vm.showProgress = false;
							// Location check successful tell the user
							vm.status = 'Found you!';

							$timeout(function () {
								vm.status = 'Now about that sky...';
								$timeout(function () {
									fetchWeather(vm.coords.lat, vm.coords.long);
								}, 2000);
							}, 2500);
						}, 2000);

					})
					.catch(function (e) {
						console.log("HTML5 GeoLocation Error = ", e);
						vm.gotError = true;
						vm.title = 'Tractor Beam Failed!';
						vm.status = "We're having trouble finding you.";

						if (e === 'Unable to determine your location') {

							$timeout(function () {
								tryAPIGeolocation();
							}, 2500);

							console.log('Trying Google Maps API');
						}
						throw e;
						// If user blocks GeoLocation
					});

				vm.pristine = false; // First time is over now
			}

			// If the standard HTML5 geolocation fails try Google Maps API
			function tryAPIGeolocation() {

				vm.status = "Using Google Maps API to find you. Fingers crossed...";
				// This doesn't work, returns undefined :(
				$http.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAaD9BSO14vI37GoPDjbCQ5YZGG0cyvPns")
					.then(function (data) {
						vm.coords = {
							lat: data.location.lat,
							long: data.location.lng
						}
						fetchWeather(vm.coords.lat, vm.coords.long);
					})
					.catch(function (err) {

						vm.status = 'Google Maps API Failed';
						vm.coords = {
								lat: 18.422,
								long: -33.9191
							}
							// Fallback to the fallback
						$timeout(function () {
							vm.status = 'Showing weather for Cape Town';
							$timeout(function () {
								fetchWeather(vm.coords.lat, vm.coords.long);
							}, 2000);
						}, 2500);
					});

			};


			function fetchWeather() {

				vm.showProgress = true;

				$http.get("http://api.openweathermap.org/data/2.5/weather?lat=" + vm.coords.lat + "&lon=" + vm.coords.long + "&APPID=d91e913e0a1ce7a631f4036170372669&units=metric")
					.then(function (response) {

						// API Response
						vm.details = response.data;

						vm.weatherID = vm.details.weather[0].id;
						// sets the Weather icon using the Weather Icon Font
						vm.iconID = 'owf-' + vm.details.weather[0].id;
						// sets the Weather ID to Body Tag for colour changes
						vm.bodyID = 'weather-' + vm.details.weather[0].id;

						vm.gotWeather = true;

						// temp in celcius
						vm.temp = Math.round(vm.details.main.temp) + '°C';

						// changes title to use the Open Weather main group name
						vm.title = vm.details.weather[0].main;

						if (somethingIsFalling.indexOf(vm.weatherID) === -1) {
							vm.status = "You're safe! It's just " + vm.details.weather[0].description;
						} else {
							vm.status = "Something is falling. Take cover!";
						}
						vm.showProgress = false;
						vm.gotError = false;
					})
					.catch(function (e) {
						console.log("Weather API Error", e);
						vm.gotError = true;
						vm.title = "Eek! API Error.";
						vm.status = "Weather you think you can, we can't - Henry Fowl";
						throw e;
					});
			}

			userLocation();

		}]);
})();