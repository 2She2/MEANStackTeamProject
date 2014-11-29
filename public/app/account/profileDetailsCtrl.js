app.controller('ProfileDetailsCtrl', function ($scope, $location, $routeParams, auth, identity, UsersResource, BannedUsersResource) {
    $scope.currentUser = identity.currentUser;
    $scope.isAuthorizedAdmin = identity.isAuthorizedForRole('admin');

    $scope.user = getUser();

    function getUser() {
        return UsersResource.get({ id: $routeParams.id }, function (user) {
            $scope.user = user;
            $scope.banToggleTitle = $scope.user.isBanned ? "Unban" : "Ban";
        });
    }

    $scope.toggleBan = function () {
        BannedUsersResource.toggleBan({id: $scope.user._id});
        $scope.user.isBanned = !$scope.user.isBanned;
        $scope.banToggleTitle = $scope.user.isBanned ? "Unban" : "Ban";
    }
});