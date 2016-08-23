// This is a JavaScript file
//GETempにSQLを投げて画面の変数GETempsに値を返す

angular.module("app")
.controller("GETempController", ["$scope", "GETemp",function($scope,GETemp) {

    // 保存
    $scope.setDataToApppot = function() {
        var getemp = GETemp.create();
        getemp.DATA1="A799";
        getemp.DATA2="apppot_test_data2";
        getemp.DATA3="apppot_test_data3";
        promise = getemp.save();
    	promise.then(function() {
            console.log("保存に成功");
        })
		.catch(function(error) {
	    	console.log(error);
    	});
	};
    
    //自由SQL発行
    $scope.freeDataFromApppot = function() {
        var SQL = encodeURIComponent("select * from GETEMP where DATA1 = 'A799'");
        var getemp = GETemp.create();
        promise = getemp.find(SQL);
        promise.then(function(GETemps) {
    		$scope.GETemps = GETemps;
        })
    	.catch(function(error) {
	    	console.log(error);
    	});
    };
    
    //Select発行
    $scope.getDataFromApppot = function() {
        var SQL = "DATA1=A799";
        var getemp = GETemp.create();
        promise = getemp.select(SQL)
        .then(function(GETemps) {
			$scope.GETemps = GETemps;
        })
    	.catch(function(error) {
	    	console.log(error);
    	});
    };
    // Update発行
    $scope.updDataToApppot = function() {
        var SQL = "DATA1=A799";
        var getemp = GETemp.create();
        getemp.DATA1="A799";
        getemp.DATA2="AAA";
        getemp.DATA3="ZZZ";
        promise = getemp.update(SQL);
        promise.then(function() {
            console.log("更新に成功");
        })
		.catch(function(error) {
	    	console.log(error);
		});
    };
    // Delete発行
    $scope.delDataToApppot = function() {
        var SQL = "DATA1=A799";
        var getemp = GETemp.create();
        promise = getemp.delete(SQL);
        promise.then(function() {
            console.log("削除に成功");
        })
    	.catch(function(error) {
	    	console.log(error);
		});
    };	
}]);
