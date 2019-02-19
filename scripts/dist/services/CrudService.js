(function(){
	var app = angular.module("CrudApp");

	var CrudService = function($http){

		var getUsers = function(){
			return $http.get("http://localhost:1000/user").then(function(res,err){
				return res.data;
			});
		};

		var getUserById = function(id){
			return $http.get("http://localhost:1000/user/"+id).then(function(res,err){
				return res.data;
			});
		};

		var insertUser = function(user){
			return $http.post("http://localhost:1000/user",user).then(function(res,err){
				return res.data;
			});
		};

		var deleteUser = function(id){
			return $http.delete("http://localhost:1000/user/"+id).then(function(res,err){
				return res.data;
			});
		};

		var updateUser = function(user){
			return $http.patch("http://localhost:1000/user/"+user.id,user).then(function(res,err){
				return res;
			});
		};

		return{
			getUsers: getUsers,
			getUserById : getUserById,
			insertUser : insertUser,
			deleteUser : deleteUser,
			updateUser : updateUser
		};
	};

	app.factory("CrudService",CrudService);

}());