app.controller('ProfileCtrl', function($scope, $location, auth, identity) {
    $scope.user = identity.currentUser;

    $scope.update = function(user) {
        auth.update(user).then(function() {
            $scope.firstName = user.firstName;
            $scope.lastName = user.lastName;
            $scope.city = user.city;
            $scope.phone = user.phone;

            $location.path('/');
        });
    }
});