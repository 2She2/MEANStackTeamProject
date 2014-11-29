app.controller('ProductsListCtrl', function($scope, ProductResource, cachedProducts, identity, notifier) {
    $scope.currentUser = identity.currentUser;

    $scope.products = ProductResource.query();

    $scope.loadFilteredProducts = function(pageNumber, filterData) {
        filterData = filterData || {};
        $scope.products = ProductResource.query({
            page: pageNumber,
            orderBy: filterData.orderBy,
            orderType: filterData.orderType
        });
    };
});