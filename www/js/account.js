myApp.controller('AccountCtrl', function($scope, auth, store, $state, $rootScope, $http) {
  $scope.logout = function() {
    auth.signout();
    store.remove('token');
    store.remove('profile');
    store.remove('refreshToken');
    $state.go('login', {}, {reload: true});
  };


  $scope.name;

  var user_id;

  $rootScope.$on('userAuthed', function() {
  	console.log("userAuthed");
  	$scope.$apply(function() {
  		if (!$rootScope.currentUser.profile.user_metadata.nickname) {
  			$scope.name = $rootScope.currentUser.profile.nickname;
  		} else {
  			$scope.name = $rootScope.currentUser.profile.user_metadata.nickname;
  		}
  		
  		user_id = $rootScope.currentUser.profile.user_id;

  		console.log("user_id", user_id);
  	})
  })

  // $scope.name = $rootScope.currentUser.nickname;

  	$scope.updateName = function(newName) {
	  	// console.log("name", $scope.name);
	  	console.log("currentUser", $rootScope.currentUser);

	  	var request = {
	  		"user_metadata": {
	        	"nickname": newName
	        }
	    }
	    var update = $http.patch('https://davidjtkatz.auth0.com/api/v2/users/' + user_id, request);

	    update.then(function(response) {
	            console.log("update success", response);
	            $scope.response = "success";
	        }, function(response) {
	            console.log("update failure", response);
	            $scope.response = "failure";
        });

	    setTimeout(function() {
	    	// console.log("resetting response");
	    	$scope.$apply(function() {
	    		$scope.response = "";
	    	})
	    }, 5000)

    	$scope.name = newName;
	}

	$scope.updateEmail = function(newEmail) {
	  	// console.log("name", $scope.name);
	  	console.log("currentUser", $rootScope.currentUser);

	  	var request = {
	  		// "user_metadata": {
	        	"email": newEmail
	        // }
	    }
	    var update = $http.patch('https://davidjtkatz.auth0.com/api/v2/users/' + user_id, request);

	    update.then(function(response) {
	            console.log("update success", response);
	        }, function(response) {
	            console.log("update failure", response);
        });

        $scope.response = response;
    	// $scope.name = newName;
	}


});

// have the response message fadeAway
// update auth0 appearance and coloring.