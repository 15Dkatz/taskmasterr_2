angular.module('starter.controllers', [])
.controller('LoginCtrl', function($scope, auth, $state, store, $rootScope, $firebaseObject) {
  var firebaseUrl = "https://taskmasterr.firebaseio.com/";
  // var ref = new Firebase("https://taskmasterr.firebaseio.com/");
  // var fbauth = $firebaseAuth(ref);

  function doAuth() {
    auth.signin({
      closable: false,
      // This asks for the refresh token
      // So that the user never has to log in again
      authParams: {
        scope: 'openid offline_access'
      }
    }, function(profile, idToken, accessToken, state, refreshToken) {
      store.set('profile', profile);
      store.set('token', idToken);
      store.set('refreshToken', refreshToken);
      $state.go('tab.account');

      var userRef = new Firebase(firebaseUrl + 'users/');

      // check if Firebase has this registered user. If not, then create the dataset.
      var hasUser;

      userRef.once("value", function(snapshot) {
        hasUser = snapshot.hasChild(auth.profile.identities[0].user_id);
        console.log("hasUser", hasUser);
        if (hasUser===false) {
        userRef.child(auth.profile.identities[0].user_id).set({
          date: Firebase.ServerValue.TIMESTAMP,
          email:  auth.profile.email,
          nickname: auth.profile.nickname,
          tasksList: [
              {
                name: "your first task",
                time: 5
              }
            ]
        });
      }

      tasksListRef = new Firebase(firebaseUrl + 'users/' + auth.profile.identities[0].user_id);
      var tasksList;
      if (tasksListRef) {
      tasksListRef.once("value", function(snapshot) {
           if (snapshot.exists()) {
                tasksList = snapshot.val()["tasksList"];
                console.log("tasksList", tasksList);
                console.log("tasksListRef", tasksListRef);
                $rootScope.tasksList = tasksList;
                // return tasksList;
                $rootScope.$broadcast('tasksListSet');


           }
       }, function(errorObject) {
           console.log("The read failed: ", errorObject.code);
       });
       }


    })

    // console.log(userRef)

    }, function(error) {
      console.log("There was an error logging in", error);
    });



    $rootScope.currentUser = auth;


    
  }

  $scope.$on('$ionic.reconnectScope', function() {
    doAuth();
  });

  doAuth();

  $scope.login = function() {
    auth.signin({
      authParams: {
        scope: 'openid offline_access',
        device: 'Mobile device'
      }
    }, function(profile, token, accessToken, state, refreshToken) {
      // Success callback
      store.set('profile', profile);
      store.set('token', token);
      store.set('refreshToken', refreshToken);
      $location.path('/');
    }, function() {
      // Error callback
    });
  }

  $scope.logout = function() {
    auth.signout();
    store.remove('profile');
    store.remove('token');
  }
  
  $scope.auth = auth;  

  $scope.getAuth = function() {
     // console.log("auth", auth.profile.identities[0].user_id);
     console.log(auth);
  }
  
})



.controller('BuildCtrl', function($scope, $http) {
  // $scope.callApi = function() {
  //   // Just call the API as you'd do using $http
  //   $http({
  //     url: 'http://auth0-nodejsapi-sample.herokuapp.com/secured/ping',
  //     method: 'GET'
  //   }).then(function() {
  //     alert("We got the secured data successfully");
  //   }, function() {
  //     alert("Please download the API seed so that you can call it.");
  //   });
  // };

})


.controller('AccountCtrl', function($scope, auth, store, $state) {
  $scope.logout = function() {
    auth.signout();
    store.remove('token');
    store.remove('profile');
    store.remove('refreshToken');
    $state.go('login', {}, {reload: true});
  };
});
