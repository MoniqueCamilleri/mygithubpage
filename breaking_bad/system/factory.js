app.factory('myNotices', function($http, $q, $timeout) {
   return {
		getMsg: function(url) {	    
			var deferred = $q.defer();
	
			$http.get(url)
				.success(function(data) { //if success
					deferred.resolve(data); //resolves the promise
				})
				
				.error(function(){ // if fail to retrive from the server try this
					deferred.reject();
				});		
			return deferred.promise;
		},
   }
});
