angular.module('starter.services', [])
myApp.service('sharedTasks', ['$rootScope', '$firebaseAuth', function($rootScope, $firebaseAuth, $scope) {
  var tasksList = [];
  var firebaseUrl = "https://taskmasterr.firebaseio.com/";
  var ref = new Firebase(firebaseUrl);
  var auth = $firebaseAuth(ref);
  var tasksListRef, userRef;
  var nickname;
  // var showLoginContent = true;
  // var exTime=0;

  // auth.$onAuth(function(authUser) {
  // //     if (authUser) {
  // $rootScope.$on('auth', function(event, data) {
  //     console.log(data);
  //     tasksListRef = new Firebase(firebaseUrl + 'users/' + $rootScope.currentUser.profile.identities[0].user_id + '/tasks');
  //     if (tasksListRef) {
  //       tasksListRef.once("value", function(snapshot) {
  //           if (snapshot.exists()) {
  //               tasksList = snapshot.val()["tasksList"];
  //               // showLoginContent = false;
  //           }
  //       }, function(errorObject) {
  //           console.log("The read failed: ", errorObject.code);
  //       });
  //     }
  //     userRef = new Firebase(firebaseUrl + 'users/' + $rootScope.currentUser.profile.identities[0].user_id);
  //     if (userRef) {
  //       userRef.once("value", function(snapshot) {
  //           if (snapshot.exists()) {
  //               tasksList = snapshot.val()["tasksList"];
  //               nickname = snapshot.val()["nickname"];
  //               // lastname = snapshot.val()["lastname"];
  //               console.log("tasksList:", tasksList);
  //           }
  //       }, function(errorObject) {
  //           console.log("The read failed: ", errorObject.code);
  //       });
  //     }
  //   });
  //     }
  // })

  return {
    getTasksList: function() {
      return $rootScope.tasksList;
    },

    getNickname: function() {
      return nickname;
    },

    testFunction: function() {
      return "sharedTasks works";
    },

    // getLastname: function() {
    //   return lastname;
    // },

    getShowLoginContent: function() {
      return showLoginContent;
    },

    addTask: function(tasksList, newTask) {
      tasksListRef = new Firebase(firebaseUrl + 'users/' + $rootScope.currentUser.profile.identities[0].user_id);
      var index = (tasksList.length).toString();
      tasksList[index] = newTask;
      tasksListRef.update({"tasksList": tasksList});
    },

    setTasksList: function(tasksList) {
       tasksListRef = new Firebase(firebaseUrl + 'users/' + $rootScope.currentUser.profile.identities[0].user_id);
       if (tasksList.length>0) {
        tasksListRef.update({"tasksList": tasksList});
       } else {
        tasksListRef.update({"tasksList": [{
            name: "",
            time: ""

        }]});
       }
       
     // if
    },

    // updateAccountFirstname: function(newFirstname) {
    //   userRef.update({"firstname": newFirstname});
    // },

    // updateAccountLastname: function(newLastname) {
    //   userRef.update({"lastname": newLastname});
    // },

    // updateAccountEmail: function(newEmail) {
    //   userRef.update({"email": newEmail});
    // },

    // getExTime: function() {
    //   return exTime;
    // },

    // setExTime: function(newExtime) {
    //   exTime = newExtime;
    // },

    setRootId: function(newId) {
      $rootScope.currentUser.$id = newId;
    }

  }
}])
