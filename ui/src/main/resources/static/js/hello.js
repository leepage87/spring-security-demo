//import homeController from ./home.controller.js;

angular.module('hello', ['ngRoute'])
	.config(function($routeProvider, $httpProvider){
		
		$routeProvider.when('/', {
			templateUrl: 'home.html',
			controller: 'home',
			controllerAs: 'controller'
		}).when('/login', {
			templateUrl: 'login.html',
			controller: 'navigation',
			controllerAs: 'controller'
		}).otherwise('/');
		
		$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
		
	}).controller('home', function($http){
		
		var self = this;
		//self is an alias for this so the below callback can reference the controller
		$http.get({
			url: 'http://localhost:9000/',
			method: 'GET',
			headers : {
				'X-Auth-Token' : response.data.token
			}
		}).then(function(response){
			self.greeting = response.data;
		});
		
		
		
		
		
	}).controller('navigation', function($rootScope, $http, $location){
		var self = this;
		
		//btoa() encodes in base64
		var authenticate = function(credentials, callback) {
			var headers = credentials ? {
					authorization: "Basic " + btoa(credentials.username + ":" + credentials.password)
				} : {};
				
			$http.get('user', {headers}).then(function(response) {
//				shorthand it by coercing to boolean for the sake of un-readability 
				$rootScope.authenticated = !!response.data.name;
				
				callback && callback();
			}, function(){
				$rootScope.authenticated = false;
				callback && callback();
			})
		}
		
		authenticate();
		
		self.credentials = {};
		self.login = function(){
			authenticate(self.credentials, function(){
				if ($rootScope.authenticated){
					$location.path("/");
					self.error = false;
				} else {
					$location.path("/login");
					self.error = true;
				}
			});
		};
		
		self.logout = function(){
			$http.post('logout', {}).finally(function(){
				$rootScope.authenticated = false;
				$location.path("/");
			});
		}
	});