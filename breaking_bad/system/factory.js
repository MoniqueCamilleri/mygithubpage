app.factory('myNotices', function($http, $q, $timeout,$scope) {
   return {
		getMsg: function() {	    
			var deferred = $q.defer();
		//	$http.get('resources/data.json')
		   //var url = "https://api.myjson.com/bins/3sjud.json";

    $http.get($scope.url)
				.success(function(data) {
					deferred.resolve(data); //resolves the promise
				})
				.error(function(){
					deferred.reject(); //rejects the promise
				});
			return deferred.promise;
		},
   }
});
