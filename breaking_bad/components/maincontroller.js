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

function init(){
				console.log('Main Controller is working fine');
				$scope.conn = true;
				$scope.url = "";
				myNotices.getMsg().then(function(data) { //success
					$scope.quotesArray = data;
					$scope.random();		
				},
				function(data) { //failure
					$scope.conn = false;
        		});
				
				//-----------------------------------Randomly choose a quote------------------------------------//		
		$scope.random = function() {
				$scope.maxNumber = $scope.quotesArray.length - 1;
				$scope.Number = Math.floor((Math.random() * $scope.maxNumber) + 0);
				$scope.autoTrack($scope.Number);
				console.log('Random yo');
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
				
				//alert($scope.output);
        }
	//-------------------------------------Handle Click------------------------------------//
				
				
				}
} 							
