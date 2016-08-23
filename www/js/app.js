// This is a JavaScript file

// []で指定しているのはangularJSが呼び出すライブラリ
angular.module('app', ['onsen','ngFileUpload'])
.value(
    'key', {// AppPotに接続するユーザ
        'Id': 'training_user',
        'pass': '123456',
    }
)
.run(["$rootScope","Authenticator","LocalDBInitializer","key", "File",function($rootScope,Authenticator,LocalDBInitializer,key,File) {
//ここから開始
/*
    処理の流れとしては
    1.匿名トークンを取得
    2.ログインしてユーザトークン受け取り
    3.初期処理（今回はApppotのDBにテーブルを作成）
*/
    Authenticator.getAnonymousToken()
    .then(function(authToken) {
        return Authenticator.login(authToken, key.Id, key.pass);
    })
    .then(function(user) {
        var schemas = [File.getSchema()];
    	return LocalDBInitializer.createAppData(schemas);
    })
    .catch(function(error) {
        if (error.code && error.code == "111") {
            alert(error.message);
        }
        else {
            alert(error.message);
        }
    });            
}]);
