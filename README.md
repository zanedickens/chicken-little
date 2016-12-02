# Chicken Little - A simple weather app
Is the sky falling? No it's raining. Temperature's 22 degrees. Wind is a raging gale. You get the idea...

It checks your location, then polls the Open Weather API; to see if the sky is falling. The app then displays the local temperature and an icon of the current weather state. The background changes colour based on the weather category. 

If something is falling, the app will let you know too.

## How to run this app:
- This is an AngularJS 1.5 app and needs a web server to run
- On your local machine this needs to be IIS or Apache or Node HTTP-Server
- This app is live here: http://zanedickens.com/chicken-little/#/ 
- This works in Firefox 50, Webkit (Chrome & Safari) blocks geolocation when not using HTTPS. 

### Window 8 or 10 - ISS
- Install ISS: http://www.howtogeek.com/112455/how-to-install-iis-8-on-windows-8/
- Download the archive and extract the folder
- Copy the folder to the wwwroot
- Navigate in your browser to http://localhost/chicken-little-master/#/

### macOS - NodeJS with http-server
- Install nodeJS - http://treehouse.github.io/installation-guides/mac/node-mac.html
- Install http-server via NPM - https://www.npmjs.com/package/http-server
- Download the archive and extract the folder
- Copy the folder to the your Sites folder or user root.
- Navigate in terminal to this app folder and type: http-server
- This will then run the web server and display your localhost and port, for example: http://127.0.0.1:8080
- Navigate in your browser to http://localhost:8080/chicken-little-master/#/

## Once install and the app runs:
- The app needs very little input besides allowing the use of Geolocation

## Uses: 
- AngularJS 1.5
- Bootstrap 3
- Google Maps API for a fallback to HTML5 Geolocation
- This great font for the weather symbols based on Open Weather API icon codes: http://websygen.github.io/owfont/
- AngularJS GeoLocation: https://github.com/arunisrael/angularjs-geolocation
