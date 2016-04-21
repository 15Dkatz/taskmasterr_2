angular.module('starter.controllers', [])
.controller('LoginCtrl', function($scope, auth, $state, store, $rootScope, $firebaseObject) {
  var firebaseUrl = "https://taskmasterr.firebaseio.com/";
  var ref = new Firebase("https://taskmasterr.firebaseio.com/");
  // var fbauth = $firebaseAuth(ref);

  function doAuth() {
    // var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);

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
    }, function(error) {
      console.log("There was an error logging in", error);
    });

    var userRef = new Firebase(firebaseUrl + 'users/')
    .child(auth.profile.identities[0].user_id).set({
      date: Firebase.ServerValue.TIMESTAMP,
      email:  auth.profile.email,
      nickname: auth.profile.nickname,
      tasksList: ""
    }); //user info

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

// .controller('GoCtrl', function($scope, Chats) {
//   // $scope.chats = Chats.all();
//   // $scope.remove = function(chat) {
//   //   Chats.remove(chat);
//   // }
// })


.controller('AccountCtrl', function($scope, auth, store, $state) {
  $scope.logout = function() {
    auth.signout();
    store.remove('token');
    store.remove('profile');
    store.remove('refreshToken');
    $state.go('login', {}, {reload: true});
  };
});
