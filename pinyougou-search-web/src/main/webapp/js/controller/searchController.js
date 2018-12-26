app.controller('searchController',function($scope,$location,searchService){
	
	//搜索
	$scope.search=function(){
		$scope.searchMap.pageNo=parseInt($scope.searchMap.pageNo);//转换为字符串
		searchService.search($scope.searchMap).success(
			function(response){
				
				$scope.resultMap=response;			
				buildPageLabel();//调用
			}
		);		
	}
	//定义搜索对象的结构  category:商品分类
	$scope.searchMap={'keywords':'','category':'','brand':'','spec':{},'price':'','pageNo':1,'pageSize':40,sort:'',sortField:''};
	//添加搜索项
	$scope.addSearchItem=function(key,value){
	
		if(key=='category'||key=='brand'||key=='price'){//如果点击的是分类或者是品牌
			$scope.searchMap[key]=value;	
		}else{
			$scope.searchMap.spec[key]=value;
		}
		$scope.search();//执行查询
	}
	//移除复合搜索条件
	$scope.removeSearchItem=function(key){
		if(key=='category'||key=='brand'||key=='price'){//如果是分类或品牌
			$scope.searchMap[key]="";
		}else{//否则是规格
			delete $scope.searchMap.spec[key];//移除此属性
		}
		$scope.search();//执行查询
	}
	buildPageLabel=function(){
		$scope.pageLabel=[];
		var maxPageNo=$scope.resultMap.totalPages;//得到最后页码
		var firstPage=1;//开始页码
		var lastPage=maxPageNo;//截至页码
		$scope.firstDot=true;
		$scope.lastDot=true;
		if($scope.resultMap.totalPages>5){
			if($scope.searchMap.pageNo<=3){
				lastPage=5;
				$scope.firstDot=false;
				
			}else if($scope.searchMap.pageNo>=lastPage-2){
				firstPage=maxPageNo-4;
				$scope.lastDot=false;
			}else{//显示当前页为中心的5页
				firstPage=$scope.searchMap.pageNo-2;
				lastPage=$scope.searchMap.pageNo+2;
				
			}
			
		}else{
			$scope.firstDot=false;
			$scope.lastDot=false;
		}
		//循环产生页码标签
		for (var i = firstPage; i <= lastPage; i++) {
			$scope.pageLabel.push(i);
		}
	}
	//根据页码查询
	$scope.queryByPage=function(pageNo){
		
		if(pageNo<1||pageNo>$scope.resultMap.totalPages){
			return;
		}
		$scope.searchMap.pageNo=pageNo;
		$scope.search();
	}
	//判断当前页为第一页 
	$scope.isTopPage=function(){
		if($scope.searchMap.pageNo==1){
			return true;
		}else{
			return false;
		}
	}
	//判断当前页是否未最后一页 
	$scope.isEndPage=function(){
		if($scope.searchMap.pageNo==$scope.resultMap.totalPages){
			return true;
		}else{
			return false;
		}
	}
	//设置排序规则 
	$scope.sortSearc=function(sortField,sort){
		$scope.searchMap.sortField=sortField;
		$scope.searchMap.sort=sort;
		$scope.search();
	}
	$scope.keywordsIsBrand=function(){
		for (var i = 0; i < $scope.resultMap.brandList.length; i++) {
			if($scope.searchMap.keywords.indexOf($scope.resultMap.brandList[i].text)>=0){
				return true;
			}
			
		}
		return false;
	}
	$scope.loadkeywords=function(){
		$scope.searchMap.keywords=$location.search()['keywords'];
		$scope.search();
	}
	
});