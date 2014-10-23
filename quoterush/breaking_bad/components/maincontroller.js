'use strict';

function MainController($scope,$http ,myNotices,$window, $rootScope, analytics) {

	$rootScope.$on("$routeChangeStart", function(){
		$rootScope.loading = true;
	});

	$rootScope.$on("$routeChangeSuccess", function(){
		$rootScope.loading = false;
	});

  var scrollItems = [];

  for (var i=1; i<=100; i++) {
    scrollItems.push("Item " + i);
  }

  $scope.scrollItems = scrollItems;
  $scope.invoice = {payed: true};
  $scope.userAgent =  navigator.userAgent;
//-------------------------------------Handle Click------------------------------------//
  init();
  noticebar();

  
//------------------------------------- Noticebar------------------------------------//
  function noticebar(){

  $scope.url ="https://cdn.rawgit.com/HaydenSookchand/mygithubpage/gh-pages/breaking_bad/resources/notices.json";
  myNotices.getMsg($scope.url).then(function(notice) { //success
          $scope.noticeArray = notice;
          $scope.notice = $scope.noticeArray[0].link;
          $scope.dlink = $scope.noticeArray[0].notice;
          },
        function(data) { //failure
          $scope.conn = false;
          console.log('Connection Error') 
		 });

     }
//------------------------------------- End Noticebar------------------------------------//

//------------------------------------- End Noticebar------------------------------------//

	function init(){
				console.log('Main Controller initialized');
				$scope.conn = true;
				$scope.url ="https://cdn.rawgit.com/HaydenSookchand/mygithubpage/gh-pages/breaking_bad/resources/data.json";

				myNotices.getMsg($scope.url).then(function(data) { //success
					$scope.quotesArray = data;
					$scope.random();
				},
				function(data) { //failure
					$scope.conn = false;
					console.log('No Internet Connection. Local Data is Active');
				  //if connection is false a neat css popup should appear saying that it is using local data only
		           $scope.url = "resources/data.json";
					myNotices.getMsg($scope.url).then(function(data) { //success
					$scope.quotesArray = data;
					$scope.random();
					},
				function(data) { //failure
					$scope.conn = false;
					//connection has failed and backup has failed , something is seriously wrong
		          });
        		});

	    //-----------------------------------Randomly choose a quote------------------------------------//
		$scope.random = function() {
				$scope.maxNumber = $scope.quotesArray.length - 1;
				$scope.Number = Math.floor((Math.random() * $scope.maxNumber) + 0);
				$scope.autoTrack($scope.Number);
				console.log('Random function initialized');
		}

	//-------------------------------------Go to the next quote------------------------------------//

		$scope.showNext = function() {
		    $scope.Number = $scope.Number + 1
			// if number is equal to the highest number then reset to 0
				if ($scope.Number == $scope.maxNumber) {
					$scope.Number = 0;
				}
			$scope.autoTrack($scope.Number);
        }

	//-------------------------------------Go to the previous quote------------------------------------//
		$scope.showPrev = function() {
		    $scope.Number = $scope.Number - 1
				//if number is less than 0 then loop to the maxNumber
				if ($scope.Number <= 0) {
				   $scope.Number = $scope.maxNumber;
				}
				$scope.autoTrack($scope.Number);
        }
	//-------------------------------Take Latest Number and add to output------------------------------------//
			$scope.autoTrack = function(Number) {
				var nextCharName = $scope.quotesArray[Number].name;
				var nextCharQoute = $scope.quotesArray[Number].quote;
				$scope.outputQuote =  nextCharQoute;
				$scope.outputName =  nextCharName;
				//console.log($scope.output);
        }
	//-------------------------------------Handle Click------------------------------------//


	}
}
