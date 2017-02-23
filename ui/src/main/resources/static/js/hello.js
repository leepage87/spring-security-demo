angular.module('hello', [])
	.controller('home', function($scope){
		this.greeting = {
				id: '123456',
				content: 'hello world'
			}
	});