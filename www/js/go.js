myApp.controller('GoCtrl', ['$scope', '$rootScope', '$firebaseObject', '$firebaseAuth', 'sharedTasks', '$ionicPopup', '$timeout',
	function($scope, $rootScope, $firebaseObject, $firebaseAuth, sharedTasks, $ionicPopup, $timeout) {

	// var firebaseUrl = "https://taskmasterr.firebaseio.com/";
	// var ref = new Firebase("https://taskmasterr.firebaseio.com/");

	$scope.taskslist = {};

  	$scope.addTask = function(taskName) {
  		sharedTasks.addTask($scope.tasksList, taskName);
  	}

	$scope.showStartButton = true;


	var progressBarCircle = new ProgressBar.Circle("#progressBarCircle", {
        color: '#ef473c',
        strokeWidth: 8
    })

	$scope.reorderItem = function(item, fromIndex, toIndex) {
        $scope.tasksList.splice(fromIndex, 1);
        $scope.tasksList.splice(toIndex, 0, item);
        // save to firebase
    }



    // ********

    var tasksList;
    var taskTimeLimit;
    
    $scope.currentTask;
    var timer;
    var exTime = 0;

    var addTime = function() {
        // exTime=sharedTasks.getExTime();
        taskTimeLimit = $scope.currentTask["time"];
        // console.log($scope.currentTask["currentTime"], "currentTime");
        exTime+=1;
        // sharedTasks.setExTime(exTime);

        console.log("exTime", exTime)
        // $scope.$apply(function() {
        //     updatetaskVariables();
        // });

        if (exTime>taskTimeLimit) {
            removeCurrentTask();
            exTime=0;
            // sharedTasks.setExTime(exTime);
            // updatetaskVariables();
        }

        progressBarCircle.animate(exTime/taskTimeLimit, function() {
            progressBarCircle.setText(exTime);
        });



    }

    // $scope.$on('builtNewSet', function(event, args) {
    //     console.log("receiving builtNewSet broadcast");
    //     progressBarCircle.animate(0, function() {
    //         progressBarCircle.setText(0);
    //     });
    //     exTime=0;
    // });

    $scope.removeTask = function(index) {
        $scope.tasksList.splice(index, 1);
        sharedTasks.setTasksList($scope.tasksList);
        // $scope.updatetasksList();
        // $scope.tasksList = $scope.updatetasksList();
        timer = false;
        // updatetaskVariables();
        // exTime = $scope.currentTask["time"];
    }

    $scope.skipTask = function() {
        exTime=0;
        sharedTasks.setExTime(exTime);
        removeCurrentTask();
    }


    var removeCurrentTask = function() {
        $scope.tasksList.shift();
        console.log($scope.tasksList);
        sharedTasks.setTasksList($scope.tasksList);
        updatetaskVariables(); 
    }




    $scope.startTask = function() {
        // taskTimeLimit = $scope.currentTask["time"];
        $scope.showStartButton = false;
        $scope.currentTask = $scope.tasksList[0];
        if (!timer) {
            timer = setInterval(addTime, 1000);
        }
    }

    $scope.pauseBtn = {
        'name': 'pause',
        'ionname': 'ion-pause'
    }

    $scope.pauseTask = function() {
        clearInterval(timer);
        if ($scope.pauseBtn['name']=='pause') {
            $scope.pauseBtn['name']='resume';
            $scope.pauseBtn['ionname'] = 'ion-play';
        } else {
            timer = false;
            $scope.pauseBtn['name']='pause';
            $scope.pauseBtn['ionname'] = 'ion-pause';
            $scope.startTask();
        }

    }


    $scope.addTask = function() {
        // popup template for new Task
        $scope.newTask = {};
        var myPopup = $ionicPopup.show({
        template: "<input class='inputIndent' placeholder='Name' type='text' ng-model='newTask.task'><br><input type='number' class='inputIndent' placeholder='Time in seconds' ng-model='newTask.time'>",
        title: 'New Task',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Add</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.newTask) {
                e.preventDefault();
              } else {
                // $scope.tasksList.push($scope.newTask);
                // sharedTasks.setTaskList($scope.tasksList);
                console.log($scope.tasksList.length, "ts Length");
                sharedTasks.addTask($scope.taskslist, $scope.newTask);
                // updateTaskVariables();
              }
            }
          }
         ]
        });

        myPopup.then(function(res) {
          console.log('Tapped!', res);
        });

        $timeout(function() {
           myPopup.close(); 
        }, 20000);

    }


}])


// implement a savedTime response variable

