'use strict';

function favcontroller($scope,$http ,myNotices,$window, $rootScope, analytics) {
   $scope.fav = []

    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
        $scope.fav[i] = localStorage.getItem(localStorage.key(i));
    }

    //must be wrapped in square brackets for some strange reasons
    $scope.jtest =  ($scope.fav);

};
