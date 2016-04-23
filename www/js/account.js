myApp.controller('AccountCtrl', function($scope, auth, store, $state, $rootScope, $http, Upload, $timeout) {
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
	  	// console.log("currentUser", $rootScope.currentUser);

	  	var request = {
	  		"user_metadata": {
	        	"nickname": newName
	        }
	    }
	    var update = $http.patch('https://davidjtkatz.auth0.com/api/v2/users/' + user_id, request);

	    update.then(function(response) {
	            console.log("update success", response);
	            $scope.response = "update success";
	        }, function(response) {
	            console.log("update failure", response);
	            $scope.response = "update failure";
        });

	    setTimeout(function() {
	    	// console.log("resetting response");
	    	$scope.$apply(function() {
	    		$scope.response = "";
	    	})
	    }, 5000)

    	$scope.name = newName;
	}


	// figure out and debug!

	$scope.updateEmail = function(newEmail) {
	  	// console.log("name", $scope.name);
	  	console.log("currentUser", $rootScope.currentUser);

	  	var request = {
        	"email": newEmail,

        	"identities": {
        		"provider": "auth0",
        		"connection": "Username-Password-Authentication"
        	}
        	// client_id 
	    }
	    var update = $http.patch('https://davidjtkatz.auth0.com/api/v2/users/' + user_id, request);

	    update.then(function(response) {
	            console.log("update success", response);
	            $scope.response = "update success";
	        }, function(response) {
	            console.log("update failure", response);
	            $scope.response = "update failure";
        });

        setTimeout(function() {
	    	// console.log("resetting response");
	    	$scope.$apply(function() {
	    		$scope.response = "";
	    	})
	    }, 5000)
    	// $scope.name = newName;
	}

	$scope.updatePassword = function(newPassword) {
	  	// console.log("name", $scope.name);
	  	console.log("currentUser", $rootScope.currentUser);

	  	var request = {
        	"password": newPassword,
        	"identities": {
        		 "connection": "Username-Password-Authentication"
        	}
        	// client_id 
	    }
	    var update = $http.patch('https://davidjtkatz.auth0.com/api/v2/users/' + user_id, request);

	    update.then(function(response) {
	            console.log("update success", response);
	            $scope.response = "update success";
	        }, function(response) {
	            console.log("update failure", response);
	            $scope.response = "update failure";
        });

        setTimeout(function() {
	    	// console.log("resetting response");
	    	$scope.$apply(function() {
	    		$scope.response = "";
	    	})
	    }, 5000)
    	// $scope.name = newName;
	}


	// example http://jsfiddle.net/danialfarid/xxo3sk41/590/
	// src https://github.com/danialfarid/ng-file-upload
	// fix
	 $scope.upload = function (dataUrl, name) {
        Upload.upload({
            url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
            data: {
                file: Upload.dataUrltoBlob(dataUrl, name)
            },
        }).then(function (response) {
            $timeout(function () {
                $scope.result = response.data;
            });
        }, function (response) {
            if (response.status > 0) $scope.errorMsg = response.status 
                + ': ' + response.data;
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
    }

});

// update auth0 appearance and coloring.