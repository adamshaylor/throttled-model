(function () {


	'use strict';


	angular.module('throttledModelTest', ['throttledModel']);


	angular.module('throttledModelTest').controller('TestController', function ($scope) {
		$scope.prepopulatedTextValue = 'prepopulated';
	});


})();
