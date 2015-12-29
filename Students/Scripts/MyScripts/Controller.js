'use strict';

app.controller("StudentController", function($scope, StudentService) {

	////The flag for the new record
    $scope.IsNewRecord = 1;
    loadRecords();

	//Function to load all Student records
	function loadRecords() {
	    var promiseGet = StudentService.getStudents(); //The method calls from service
	    promiseGet.then(function(pl) { $scope.Students = pl.data },
	        function(errorPl) {
	            $log.error('failure loading Student', errorPl);
	        });
	}

	//The Save scope method use to define the Student object.
	//In this method if IsNewRecord is not zero then Update Student else
	//Create the Student information to the server
    $scope.save = function() {
        var Student = {
            Id: $scope.Id,
            StudentName: $scope.StudentName,
            StudentRollNo: $scope.StudentRollNo,
            StudentDepartment: $scope.StudentDepartment,
            StudentBatchNo: $scope.StudentBatchNo,
            StudentYear: $scope.StudentYear
        };
        //If the flag is 1 then it is new record
        if ($scope.IsNewRecord === 1) {
            var promisePost = StudentService.post(Student);
            promisePost.then(function(pl) {
                $scope.Id = pl.data.Id;
                loadRecords();
            }, function(err) {
                console.log("Error: " + err);
            });
        } else { //Else Edit the record
            var promisePut = StudentService.put($scope.Id, Student);
            promisePut.then(function(pl) {
                $scope.Message = "Updated Successfully";
                loadRecords();
            }, function(err) {
                console.log("Error: " + err);
            });
        }
    };

	//Method to Delete
	$scope.delete = function() {
	    var promiseDelete = StudentService.delete($scope.Id);
	    promiseDelete.then(function(pl) {
	        $scope.Message = "Deleted Successfully";
	        $scope.Id = 0;
	        $scope.StudentName = "";
	        $scope.StudentRollNo = "";
	        $scope.StudentDepartment = "";
	        $scope.StudentBatchNo = "";
	        $scope.StudentYear = "";
	        loadRecords();
	    }, function(err) {
	        console.log("Error: " + err);
	    });
	}

	//Method to Get Single Student based on Id
	$scope.get = function(Student) {
	    var promiseGetSingle = StudentService.get(Student.Id);
	    promiseGetSingle.then(function(pl) {
	            var res = pl.data;
	            $scope.Id = res.Id;
	            $scope.StudentName = res.StudentName;
	            $scope.StudentRollNo = res.StudentRollNo;
	            $scope.StudentDepartment = res.StudentDepartment;
	            $scope.StudentBatchNo = res.StudentBatchNo;
	            $scope.StudentYear = res.StudentYear;
	            $scope.IsNewRecord = 0;
	        },
	        function(errorPl) {
	            console.log('failure loading Student', errorPl);
	        });
	}

	//Clear the Scope models
	$scope.clear = function() {
	    $scope.IsNewRecord = 1;
	    $scope.Id = 0;
		$scope.StudentName = "";
		$scope.StudentRollNo = "";
		$scope.StudentDepartment = "";
		$scope.StudentBatchNo = "";
		$scope.StudentYear = "";
	}

})