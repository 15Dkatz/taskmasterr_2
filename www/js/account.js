myApp.controller('AccountCtrl', function($scope, auth, store, $state, $rootScope) {
  $scope.logout = function() {
    auth.signout();
    store.remove('token');
    store.remove('profile');
    store.remove('refreshToken');
    $state.go('login', {}, {reload: true});
  };


  $scope.name;

  $rootScope.$on('userAuthed', function() {
  	$scope.name = $rootScope.currentUser.profile.nickname;
  })

  // $scope.name = $rootScope.currentUser.nickname;

  $scope.updateName = function() {
  	console.log("name", $scope.name);
  }
});