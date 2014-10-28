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

  $scope.url ="https://rawgit.com/HaydenSookchand/mygithubpage/gh-pages/quoterush/notice_bar/notice_bar.json";
   // $scope.url = "notice.json";
  myNotices.getMsg($scope.url).then(function(notice) { //success
          $scope.noticeArray = notice;
		  $scope.numOfNotice = $scope.noticeArray.length - 1; // get total number of quotes in array
		  console.log($scope.numOfNotice);
		  $scope.check = Math.floor((Math.random() * $scope.numOfNotice) + 0);
		   console.log($scope.check);
		  $scope.appname = $scope.noticeArray[$scope.check].appname;
		  
		  if ($scope.appname != "breakingbad"){
			$scope.link = $scope.noticeArray[$scope.check].link;
			$scope.app_icon = $scope.noticeArray[$scope.check].app_icon;
			$scope.status = $scope.noticeArray[$scope.check].status;
		 } else{
			$scope.link = $scope.noticeArray[$scope.check+1].link;
			$scope.app_icon = $scope.noticeArray[$scope.check+1].app_icon;
			$scope.status = $scope.noticeArray[$scope.check+1].status;
		 }
		  
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
				$scope.url ="https://rawgit.com/HaydenSookchand/mygithubpage/gh-pages/quoterush/breaking_bad/resources/quotes.json";
				$scope.totalImages = 11;
				$scope.randomBkgrnd = 1;
				myNotices.getMsg($scope.url).then(function(data) { //success
					$scope.quotesArray = data;
					$scope.random();
					$scope.getCharacterNames();
				},
				function(data) { //failure
					$scope.conn = false;
					console.log('No Internet Connection. Local Data is Active');
				  //if connection is false a neat css popup should appear saying that it is using local data only
		           $scope.url = "resources/data.json";
					myNotices.getMsg($scope.url).then(function(data) { //success
					$scope.quotesArray = data;
					$scope.random();
					$scope.getCharacterNames();
					},
				function(data) { //failure
					$scope.conn = false;
					//connection has failed and backup has failed , something is seriously wrong
		          });
        		});	
				Array.prototype.unique =
					  function() {
					    var a = [];
					    var l = this.length;
					    for(var i=0; i<l; i++) {
					      for(var j=i+1; j<l; j++) {
					        // If this[i] is found later in the array
					        if (this[i] === this[j])
					          j = ++i;
					      }
					      a.push(this[i]);
					    }
					    return a;
					  };
	}
	 $scope.toggleCustom = function() {
         $scope.custom = $scope.custom === false ? true: false;
     };
     
     $scope.addTofavorites = function(){
         a = a + 1;
        var favorite = $scope.outputQuote + "-" + $scope.outputName
           alert(favorite);
        localStorage.setItem("a" + a,  favorite);
    }
	$scope.getCharacterNames = function(){
		$scope.nameArray = [];
		for(var i =0; i< $scope.quotesArray.length;i++){
			$scope.nameArray.push($scope.quotesArray[i].name);	
		} 
		$scope.nameArray = $scope.nameArray.unique();
		console.log('unique'+$scope.nameArray.length);	
	}
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
				
				//resize quote - TODO swop out classes 
				if ((($scope.outputQuote).length) > 150){
				//alert('Smaller');
				jQuery(".quote").css("font-size", "1em");
				} else{
				console.log('');
				jQuery(".quote").css("font-size", "1.2em");
				}
				//Check if current image number is greater than total images we have and set it back to 0
				if($scope.randomBkgrnd > $scope.totalImages){ $scope.randomBkgrnd = 1; }
				if(($scope.Number % 5)==0 ){ //change image on every 5th qoute
				if($scope.randomBkgrnd <= $scope.totalImages){			
				//document.getElementById('backgroundContainer').style.background = "url('resources/img/bg-images/"+$scope.randomBkgrnd+".jpg') no-repeat" ;
				jQuery(".home-background").css('background-image', 'url("resources/img/bg-images/'+$scope.randomBkgrnd+'.jpg")');
				  $scope.randomBkgrnd++;
					} 
				}		
				$scope.outputName =  nextCharName;
				//console.log($scope.output);
        }
	//-------------------------------------Handle Click------------------------------------//


	}
