app.controller("pageController", function ($scope, $http) {

    $scope.num = 1;

    /**
     * 修改购买数量
     * @param num
     */
    $scope.updateNum = function (n) {
        if (n < 1) {
            n = 1;
        }

        $scope.num = n;
    }

    /**
     * 记录用户选择的规格
     * @type {{}}
     */
    $scope.specificationItems = {}

    /**
     * 记录用户选中的sku
     * @type {{}}
     */
    $scope.sku = {}

    /**
     * 设置选中的默认的sku
     */
    $scope.defaultSpec = function () {
        if (itemList != null && itemList.length > 0) {

            $scope.sku = itemList[0];
            $scope.specificationItems = JSON.parse(JSON.stringify($scope.sku.spec));
        }
    }


    /**
     * 更新用户选择的规格
     * @param specName
     * @param optionName
     */
    $scope.selectSpec = function (specName, optionName) {
        $scope.specificationItems[specName] = optionName;

        //重新匹配sku
        $scope.matchSku();
    }


    /**
     * 根据用户选择的规格匹配sku
     */
    $scope.matchSku = function () {
        if (itemList != null && itemList.length > 0) {

            for (var i = 0; i < itemList.length; i++) {
                //判断选中的规格是否与sku.spe相同
                if ($scope.matchObject(itemList[i].spec, $scope.specificationItems)) {
                    $scope.sku = itemList[i];
                    return;
                }
            }

            $scope.sku = {id: 0, title: '--------', price: 0};//如果没有匹配的
        }
    }


    /**
     * 判断两个map结构的json对象是否相等
     * @param map1
     * @param map2
     */
    $scope.matchObject = function (map1, map2) {
        for (var key in map1) {
            if (map1[key] != map2[key]) {
                return false;
            }

        }
        for (var key in map2) {
            if (map2[key] != map1[key]) {
                return false;
            }
        }

        return true;
    };


    /**
     * 添加购物车
     */
    $scope.addToCart = function () {
        $http.get('http://localhost:8088/cart/addGoodsToCartList.do?itemId='
            + $scope.sku.id +'&num='+$scope.num,{'withCredentials':true}).success(function (result) {
            if (result.success) {
                //跨域跳转到购物车列表，并操作其cookic数据
                window.location.href="http://localhost:8088/cart.html";

            } else {
                alert(result.message);
            }
        });
        // alert('skuid:' + $scope.sku.id + " , num:" + $scope.num);
    }

});