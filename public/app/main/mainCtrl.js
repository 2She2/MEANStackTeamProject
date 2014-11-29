app.controller('MainCtrl', function($scope, identity, cachedProducts) {
    $scope.products = cachedProducts.query();

    $scope.userIsAuthenticated = identity.isAuthenticated();
});