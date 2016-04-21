myApp.controller('GoCtrl', ['$scope', '$rootScope', '$firebaseObject', '$firebaseAuth', 'sharedTasks',
	function($scope, $rootScope, $firebaseObject, $firebaseAuth, sharedTasks) {
	// $scope.chats = Chats.all();
	// $scope.remove = function(chat) {
	//   Chats.remove(chat);
	// }
	$scope.test = "Go time";
	var firebaseUrl = "https://taskmasterr.firebaseio.com/";
	var ref = new Firebase("https://taskmasterr.firebaseio.com/");

	var auth = $firebaseAuth(ref);

	$scope.tasksList = "a";

	// auth.profile.identities[0].user_id

  	// var tasksRef = new Firebase(firebaseUrl + 'users/' + $rootScope.currentUser.profile.identities[0].user_id);

  	auth.$onAuth(function(authUser) {
        if (authUser) {
            $scope.tasksList = sharedTasks.getTasksList();

            console.log("sharedTasks", sharedTasks.getTasksList());
        }
    })

  	// $scope.tasksList = tasksRef.snapshot.val()["tasksList"];


  	$scope.addTask = function(taskName) {
  		// $scope.tasksList.push(taskName);
  		// tasksRefset.set({
  		// 	tasksList: $scope.tasksList
  		// })
  		console.log("sharedtasks tasks", sharedTasks.getTasksList());
  		console.log("test function working: ", sharedTasks.testFunction());
  	}


}])


