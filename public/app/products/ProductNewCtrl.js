app.controller('ProductsNewCtrl', function($scope, $http, notifier, identity) {
    $scope.identity = identity;

    $scope.upload = function(product){
        if(!identity.isAuthenticated()) {
            notifier.error("Login first!");
            return;
        }

        var user = identity.currentUser.username;
        $('#username').val(user);
        $scope.user = user;

        $http.post('/api/products', product)
            .success(function(d){
                notifier.success('Product added ' + d);
            })
            .then(function (result) {

            });

        // ProductResource.post(product)
    }
});