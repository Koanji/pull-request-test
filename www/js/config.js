// This is a JavaScript file
//  appIdとappVersionとappKeyをアプリごとに変更
angular.module("app")
.value( "AppPotConfig", {
    url: "https://mobileapi.fujitec.co.jp/apppot",
    appId: "picture_upload",
    appVersion: "1.0.0",
	appKey: "077ef7b4427e42b1972e701b31c42a0e",
	companyId: 1,
    deviceUDID: "FJT_Training-Fixed-DeviceID",
	apiUrl: function() {
		return this.url + "/api/" + this.companyId + "/" + this.appId + "/" + this.appVersion;
	}
});
