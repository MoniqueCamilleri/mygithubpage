app.factory('myNotices', function($http, $q, $timeout) {
   return {
		getMsg: function() {	    
			var deferred = $q.defer();
		//	$http.get('resources/data.json')
			$http.get('https://github.com/HaydenSookchand/mygithubpage/blob/gh-pages/breaking_bad/resources/data.json')
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
