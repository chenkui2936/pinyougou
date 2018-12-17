app.service('uploadService',function($http){
	//上传文件
	this.uploadFile=function(){
		var formData=new FormData();
		formData.append('file',file.files[0]);//file文件上传的类型
		return $http({
			method:'POST',
			url:"../upload.do",
			data:formData,
			headers:{'Content-Type':undefined},
			transformRequest:angular.identity
		});
	}
});