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

	
	var tasksListRef;


	// var getTasksList = function() {
	// 	// if ($rootScope.currentUser.profile.identities[0]) {

	// 	// }
	// 	// tasksListRef = new Firebase(firebaseUrl + 'users/' + $rootScope.currentUser.profile.identities[0].user_id);
	// 	var tasksList;
	// 	if (tasksListRef) {
	// 	tasksListRef.once("value", function(snapshot) {
	// 	    if (snapshot.exists()) {
	// 	        tasksList = snapshot.val()["tasksList"];
	// 	        console.log("tasksList", tasksList);
	// 	        console.log("tasksListRef", tasksListRef);

	// 	        return tasksList;
	// 	    }
	// 	}, function(errorObject) {
	// 	    console.log("The read failed: ", errorObject.code);
	// 	});
	// 	}
	// 	// console.log("tasksList outside of snapshot", tasksList);
	// 	return tasksList;
	// }


	// $rootScope.$on('auth', function() {
	// 	tasksListRef = new Firebase(firebaseUrl + 'users/' + $rootScope.currentUser.profile.identities[0].user_id);
	// 	console.log("test successful");

	// 	$scope.tasksList = getTasksList();
	// })
	


	// auth.profile.identities[0].user_id

  	// var tasksRef = new Firebase(firebaseUrl + 'users/' + $rootScope.currentUser.profile.identities[0].user_id);

  	// auth.$onAuth(function(authUser) {
   //      if (authUser) {
   //          $scope.tasksList = sharedTasks.getTasksList();

   //          console.log("sharedTasks", sharedTasks.getTasksList());
   //      }
   //  })

  	// $scope.tasksList = tasksRef.snapshot.val()["tasksList"];


  	$scope.addTask = function(taskName) {
  		sharedTasks.addTask($scope.tasksList, taskName);
  	}


}])


