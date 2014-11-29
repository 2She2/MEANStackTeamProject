app.controller('ProductsAdminCtrl', function ($scope, AdminProductResource, identity, notifier, productData) {
    $scope.currentUser = identity.currentUser;

    $scope.products = AdminProductResource.query();

    $scope.loadFilteredProducts = function(pageNumber, filterData) {
        filterData = filterData || {};
        $scope.products = AdminProductResource.query({
            page: pageNumber,
            orderBy: filterData.orderBy,
            orderType: filterData.orderType
        });
    };

    $scope.approve = function (product) {
        productData.approve(product).then(function (data) {
            notifier.success('Product approved.');
            $scope.products = AdminProductResource.query();
        }, function (error) {
            notifier.error(error.Message);
        });
    };

    $scope.sold = function (product) {
        productData.sold(product).then(function (data) {
            notifier.success('Product sold.');
            $scope.products = AdminProductResource.query();
        }, function (error) {
            notifier.error(error.Message);
        });
    };
});