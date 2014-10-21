app.factory('myNotices', function($http, $q, $timeout) {
   return {
		getMsg: function() {	    
			var deferred = $q.defer();
		//	$http.get('resources/data.json')
		   var url = "http://github.com/HaydenSookchand/mygithubpage/blob/gh-pages/breaking_bad/resources/data.json" + "?callback=JSON_CALLBACK";

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
