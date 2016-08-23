// This is a JavaScript file
// 呼び出してるメソッドに注意 https://ja.wikipedia.org/wiki/REST
angular.module("app")
.service("GETemp", ["$http", "AppPotConfig", function($http, AppPotConfig) {

    var GETemp = function() {};
    
    this.create = function() {
        return new GETemp();
    };
    //自由SQL
    GETemp.prototype.find = function(SQL) {
        return $http.get(AppPotConfig.apiUrl() + "/gateway/json_database/query?query="+SQL)
		.then(function(response) {
    		throwErrorIfErrorStatus(response);
			var getemps = [];
            // http://js.studio-kingdom.com/angularjs/ng_global_apis/angular_foreach
            angular.forEach(response.data.results.query, function(getemp) {
				getemps.push(angular.extend(new GETemp(), getemp));
			});
			return getemps;
        })
        .catch(function(error) {
        	console.log(error);
        });
	};

    GETemp.prototype.select = function(SQL) {
    	return $http.get(AppPotConfig.apiUrl() + "/gateway/json_database/GETEMP?"+SQL)
		.then(function(response) {
			throwErrorIfErrorStatus(response);
			var getemps = [];
			angular.forEach(response.data.results.GETEMP, function(getemp) {
				getemps.push(angular.extend(new GETemp(), getemp));
			});
			return getemps;
		})
        .catch(function(error) {
        	console.log(error);
        });
    };
    
    // INSERT
    GETemp.prototype.save = function() {
       // apppot start
        return $http.post(AppPotConfig.apiUrl() + "/gateway/json_database/GETEMP",[this])
        .then(function(response) {
            throwErrorIfErrorStatus(response);
        });
        //apppot end
    };
    // UPDATE
    GETemp.prototype.update = function(key) {
        return $http.put(AppPotConfig.apiUrl() + "/gateway/json_database/GETEMP?"+key,[this])
        .then(function(response) {
            throwErrorIfErrorStatus(response);
        });
    };
    // DELETE
    GETemp.prototype.delete = function(key) {
        return $http.delete(AppPotConfig.apiUrl() + "/gateway/json_database/GETEMP?"+key)
        .then(function(response) {
            throwErrorIfErrorStatus(response);
        });
    };

}]);