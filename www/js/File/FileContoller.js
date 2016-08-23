// This is a JavaScript file
angular.module("app")
.controller("FileController", ["$scope","File",function($scope,File) {

    $scope.save = function(files) {
        //複数枚の可能性があるので配列で受け取って一枚ずつ処理
        for (i=0; i<files.length; i++){
            File.save(files[i]);
        }
	};
    
	$scope.findList = function() {
		File.findList("")
		.then(function(photos) {
			$scope.photos = photos;
		})
		.catch(function(error) {
			alert(error);
		});
	};
    
	$scope.photoUrl = function(str) {
		return File.photoUrl(str);
	};
}]);
