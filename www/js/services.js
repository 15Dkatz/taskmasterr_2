angular.module('starter.services', [])
myApp.service('sharedTasks', ['$rootScope', '$firebaseAuth', function($rootScope, $firebaseAuth) {
  // var tasksList = [];
  var firebaseUrl = "https://taskmasterr.firebaseio.com/";
  var ref = new Firebase(firebaseUrl);
  var auth = $firebaseAuth(ref);
  var tasksListRef, userRef;
  var nickname;
  // var showLoginContent = true;
  var exTime=0;

  auth.$onAuth(function(authUser) {
      if (authUser) {
        tasksListRef = new Firebase(firebaseUrl + 'users/' + $rootScope.currentUser.profile.identities[0].user_id + '/tasks');
        if (tasksListRef) {
          tasksListRef.once("value", function(snapshot) {
              if (snapshot.exists()) {
                  tasksList = snapshot.val()["tasksList"];
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
                  // tasksList = snapshot.val()["tasksList"];
                  nickname = snapshot.val()["nickname"];
                  // lastname = snapshot.val()["lastname"];
                  // console.log("tasksList:", $scope.tasksList);
              }
          }, function(errorObject) {
              console.log("The read failed: ", errorObject.code);
          });
        }
      }
  })

  return {
    getTasksList: function() {
      tasksListRef = new Firebase(firebaseUrl + 'users/' + $rootScope.currentUser.profile.identities[0].user_id);
      var tasksList;
      if (tasksListRef) {
          tasksListRef.once("value", function(snapshot) {
              if (snapshot.exists()) {
                  tasksList = snapshot.val()["tasksList"];
                  // console.log("tasksList", tasksList);
                  // console.log("tasksListRef", tasksListRef);
              }
          }, function(errorObject) {
              console.log("The read failed: ", errorObject.code);
          });
        }

      return tasksList;
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

    setTasksList: function(newList) {
      tasksList = newList;
      tasksListRef.update({"tasksList": newList});
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
