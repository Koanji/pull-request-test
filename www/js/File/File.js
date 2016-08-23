// This is a JavaScript file
angular.module("app")
.service("File", ["$http","$rootScope","Upload","AppPotConfig", function($http,$rootScope, Upload,AppPotConfig) {
    const TABLE_NAME = "Photo";
    var File = function() {
    	this.scopeType = "3";
    };
    
    this.create = function() {
        return new File();
    }
    // テーブル定義情報
    this.getSchema = function() {
		return {
			primary_key: "objectId",
			name: TABLE_NAME,
			columns: [
    		    { colName: "objectId", type: "varchar" },
        	    { colName: "koban", type: "varchar" },
        	    { colName: "issno", type: "varchar" },
			    { colName: "photoName", type: "varchar" },
			    { colName: "photoFileName", type: "varchar" },
                { colName: "mailAddress", type: "varchar" },
	            { colName: "scopeType", type: "integer" },
	            { colName: "createTime", type: "integer" },
                { colName: "updateTime", type: "integer" }
			]
		};
	};
    //保存処理（コントローラからの呼び出し口）
    this.save = function(file) {
        // ファイルを保存してからApppotのDBにファイル情報を保存する
        this.uploadFile(file)
		.then(function() {
			self.saveData(file.name);
		});
	};

    this.uploadFile = function(file,name) {
        var self = this;
        // https://github.com/ncdc-dev/AppPot-Documents/blob/master/APIDocument2.0/07.FileAPI.md
        // ng-file-upload https://github.com/danialfarid/ng-file-upload
        return Upload.upload({
            url: AppPotConfig.apiUrl() + "/files",
            data: {
            	file: file, 
            	entity: Upload.json({name: name})
            }
        })
        .then(function(response) {
        	throwErrorIfErrorStatus(response);
        });
    };
    
    this.saveData = function(filename) {
        this.koban = "";
        this.createTime = Math.floor(Date.now() / 1000);
        this.updateTime = Math.floor(Date.now() / 1000);
        this.photoName= filename;
        this.mailAddress = "";
        if (this.mailAddress == null || this.mailAddress == "") {
            this.mailAddress = "blank";
        }
        return $http.post(AppPotConfig.apiUrl() + "/data/batch/addData", {
			objectName: TABLE_NAME,
			data: [this]
		})
		.then(function(response) {
			throwErrorIfErrorStatus(response);
		})
        .catch(function(e) {
            console.log(JSON.stringify(e)); 
        });
    };

    this.findList = function(photoName) {
        // https://github.com/ncdc-dev/AppPot-Documents/blob/master/APIDocument2.0/05.DataAPI.md
        return $http.post(AppPotConfig.apiUrl() + "/data/query", {
			objectNames: [TABLE_NAME],
			returnedObjectNames: [TABLE_NAME],
			maxRecord: 1000,
			condition: {
				sortConditions: [{
                        tableName: TABLE_NAME,
                        columnName: "serverUpdateTime",
                        conditionValue: 2
				}],
				scope: 3
			}
		})
        .then(function(response) {
			throwErrorIfErrorStatus(response);
	
			var photos = [];
			angular.forEach(response.data.results.Photo, function(photo) {
				photos.push(angular.extend(new File(), photo));
			});
			return photos;
		})
	};

    this.photoUrl = function(filename) {
        // https://github.com/ncdc-dev/AppPot-Documents/blob/master/APIDocument2.0/07.FileAPI.md
    	return AppPotConfig.apiUrl() + "/files/" + filename + "?userToken=" + $rootScope.authToken;
	};
}]);