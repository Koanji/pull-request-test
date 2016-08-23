angular.module("app")
.service("Authenticator", ["$rootScope", "$http", "AppPotConfig", function($rootScope, $http, AppPotConfig) {

	this.getAnonymousToken = function() {
		var appKey = AppPotConfig.appKey;
		var deviceUDID = AppPotConfig.deviceUDID;
        return $http.get(AppPotConfig.apiUrl() + "/anonymousTokens?appKey=" + appKey + "&deviceUDID=" + deviceUDID)
		.then(function(response) {
			throwErrorIfErrorStatus(response);
			$rootScope.authToken = response.data.results;
			$http.defaults.headers.common["apppot-token"] = $rootScope.authToken;
			return $rootScope.authToken;
		})
	};
	
	this.login = function(authToken, userName, password) {
		return $http.post(AppPotConfig.apiUrl() + "/auth/login", {
			username: userName,
            password: password,
            companyId: AppPotConfig.companyId,
            appId: AppPotConfig.appId,
            appVersion: AppPotConfig.appVersion,
            deviceUDID: AppPotConfig.deviceUDID,
            isPush: "false"
		})
		.then(function(response) {
			throwErrorIfErrorStatus(response);
			
			$rootScope.user = response.data.authInfor;
			$rootScope.authToken = response.data.authInfor.userTokens;
			$http.defaults.headers.common["apppot-token"] = $rootScope.authToken;
			return $rootScope.user;
		});
	} 
	
	this.logout = function() {
		return $http.post(AppPotConfig.apiUrl() + "/auth/logout", {})
		.then(function(response) {
			throwErrorIfErrorStatus(response);
		})
		.finally(function() {
			$rootScope.user = null;
			$rootScope.authToken = null;
			$http.defaults.headers.common["apppot-token"] = null;
		});
	}
}]);