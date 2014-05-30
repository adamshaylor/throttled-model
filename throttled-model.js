(function () {


	'use strict';


	angular.module('throttledModel', []);


	angular.module('throttledModel').directive('throttledModel', ['$parse', '$timeout', function ($parse, $timeout) {


		var throttledModel = {};


		throttledModel.restrict = 'A';


		throttledModel.link = function (scope, element, attributes) {


			var throttleMs = Number(attributes.throttleMs),
				latestModel,
				delay;


			if (isNaN(throttleMs)) {
				throw new Error(
					'Expected to find attribute throttle-ms set to a number',
					'throttled-model.js'
				);
			}


			scope.$watch(attributes.ngModel, function (newModel, oldModel) {

				if (angular.equals(newModel, oldModel)) {
					return;
				}

				latestModel = newModel;

				if (delay) {
					delay.then(updateThrottledModelToLatest);
				}

				else {
					updateThrottledModelToLatest();
				}

				delay = $timeout(function () {}, throttleMs);

			});


			function updateThrottledModelToLatest () {
				$parse(attributes.throttledModel).assign(scope, latestModel);
			}


		};


		return throttledModel;


	}]);


})();
