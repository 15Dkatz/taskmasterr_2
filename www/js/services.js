angular.module('starter.services', [])
.service('sharedTasks', ['firebaseUrl', '$rootScope', '$firebaseAuth', function($rootScope, $firebaseAuth) {
  var taskList = [];
  var firebaseUrl = "https://taskmasterr.firebaseio.com/";
  var ref = new Firebase(firebaseUrl);
  var auth = $firebaseAuth(ref);
  var taskListRef, userRef;
  var nickname;
  // var showLoginContent = true;
  var exTime=0;

  auth.$onAuth(function(authUser) {
      if (authUser) {
        taskListRef = new Firebase(firebaseUrl + 'users/' + $rootScope.currentUser.profile.identities[0].user_id + '/tasks');
        if (taskListRef) {
          taskListRef.once("value", function(snapshot) {
              if (snapshot.exists()) {
                  taskList = snapshot.val()["taskList"];
                  // showLoginContent = false;
              }
          }, function(errorObject) {
              console.log("The read failed: ", errorObject.code);
          });
        }
        userRef = new Firebase(firebaseUrl + 'users/' + $rootScope.currentUser.profile.identities[0].user_id);
        if (userRef) {
          userRef.once("value", function(snapshot) {
              if (snapshot.exists()) {
                  // taskList = snapshot.val()["taskList"];
                  nickname = snapshot.val()["nickname"];
                  // lastname = snapshot.val()["lastname"];
                  // console.log("taskList:", $scope.taskList);
              }
          }, function(errorObject) {
              console.log("The read failed: ", errorObject.code);
          });
        }
      }
  })

  return {
    getTaskList: function() {
      
      return taskList;
    },

    getNickname: function() {
      return nickname;
    },

    // getLastname: function() {
    //   return lastname;
    // },

    getShowLoginContent: function() {
      return showLoginContent;
    },

    setTaskList: function(newList) {
      taskList = newList;
      taskListRef.update({"taskList": newList});
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

    getExTime: function() {
      return exTime;
    },

    setExTime: function(newExtime) {
      exTime = newExtime;
    },

    setRootId: function(newId) {
      $rootScope.currentUser.$id = newId;
    }

  }
}])
