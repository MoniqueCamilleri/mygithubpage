app.factory('myNotices', function($http, $q, $timeout) {
   return {
		getMsg: function() {	    
			var deferred = $q.defer();
		//	$http.get('resources/data.json')
		   var url = "https://rawgit.com/HaydenSookchand/mygithubpage/gh-pages/breaking_bad/resources/data.json";

    $http.jsonp(url)
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
