angular.module('hello', [])
	.controller('home', function($http){
//		this.greeting = {
//				id: '123456',
//				content: 'hello world'
//			}
		
		var self = this;
		$http.get('/resource/').then(function(response){
			self.greeting = response.data;
		});
	});