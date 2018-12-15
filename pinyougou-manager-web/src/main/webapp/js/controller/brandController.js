app.controller("brandController", function($scope, $controller,brandService) {
	$controller('baseController',{$scope:$scope});	
	
		$scope.findAll =function(){
			//$http.get('../brand/findAll.do').success(
					brandService.findAll().success(
			function(response){
				$scope.list=response;
			}		
			)
		}
		$scope.save=function(){
			//var methodName='add';
			var serviceObject;//服务层对象 
			if($scope.entity.id!=null){
				serviceObject=brandService.update($scope.entity);
				//methodName='update';
			}else{
				serviceObject=brandService.add( $scope.entity  );//增加 
			}
			//$http.post('../brand/'+methodName+'.do',$scope.entity).success(
					serviceObject.success(
					function(response){
						
						if(response.success){
							$scope.reloadList();
						}else{
							alert(response.message);
						}
					}
			)
		}
		
		
		
		//分页 
		$scope.findPage=function(page,size){
			//$http.get('../brand/findPage.do?page='+page +'&size='+size).success(
					brandService.findPage(page,size).success(
				function(response){
					$scope.list=response.rows;//显示当前页数据 	
					$scope.paginationConf.totalItems=response.total;//更新总记录数 
				}		
			);				
		}
		
		
		$scope.findOne=function(id){
			//$http.get('../brand/findOne.do?id='+id).success(
					brandService.findOne(id).success(
					function(response){
						$scope.entity=response; 	
					
					}		
				);		
		}
		
		$scope.dele=function(){
			
			//获取选中的复选框
			//$http.get('../brand/delete.do?ids='+$scope.selectIds).success(
					brandService.dele($scope.selectIds).success(
			function(response){
				
				if(response.success){
					$scope.reloadList();//刷新页面
				}else{
					alert(response.message);
				}
			}		
			)
		}
		$scope.searchEntity={};
		$scope.search=function(page,size){
		//	$http.post('../brand/search.do?page='+page+"&size="+
				//	size,$scope.searchEntity).success(
						brandService.search(page,size,$scope.searchEntity).success(
							function(response){
								$scope.paginationConf.totalItems=response.total;
								$scope.list=response.rows;
							}
					)
		}
		
		$scope.brandList={data:[]};//品牌列表
		//读取品牌列表
		$scope.findBrandList=function(){
			brandService.selectOptionList.success(
					function(response){
						$scope.brandList={data:response};
					}
					
			)
		}
		
	})