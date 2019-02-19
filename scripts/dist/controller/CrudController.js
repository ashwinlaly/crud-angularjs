(function(){

	var app = angular.module("CrudApp");

	var CrudController = function($scope,$log,CrudService){

		$scope.newEntry = true;

		$scope.init = function(){
			CrudService.getUsers().then(function(res,err){
				$scope.users = res;
			});
		};

		$scope.insertUser = function(){
			CrudService.insertUser($scope.user).then(function(res,err){
				$scope.init();
			});
		};

		$scope.updateUser = function(){
			CrudService.updateUser($scope.user).then(function(res,err){
				$scope.init();
			});
		};

		$scope.deleteUser = function(id){
			CrudService.deleteUser(id).then(function(res,err){
				CrudService.getUsers().then(function(res,err){
					$scope.users = res;
				});
			});
		};

		$scope.getUser = function(id){
			$scope.newEntry = false;
			CrudService.getUserById(id).then(function(res,err){
				$scope.user = res[0];
			});
		};

	}
	
	app.controller("CrudController",CrudController);

}());