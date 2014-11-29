app.controller('ProductDetailsCtrl', function($scope, $routeParams, cachedProducts, identity, ProductResource) {
    $scope.identity = identity;

    $scope.product = getProduct();

    function getProduct() {
        return ProductResource.get({ id: $routeParams.id }, function (product) {
            $scope.product = product;
        });
    }
});