app.controller('UserListCtrl', function($scope, $location, identity, UsersResource, BannedUsersResource, notifier) {
    $scope.currentUser = identity.currentUser;
    $scope.isAuthorizedAdmin = identity.isAuthorizedForRole('admin');

    $scope.users = UsersResource.query();

    if($scope.isAuthorizedAdmin) {
        $scope.bannedUsers = BannedUsersResource.query();
    }

    $scope.loadFilteredUsers = function(pageNumber, filterData) {
        filterData = filterData || {};
        $scope.users = UsersResource.query({
            page: pageNumber,
            orderBy: filterData.orderBy,
            orderType: filterData.orderType
        });
    };

    $scope.toggleBan = function (id) {
        if ($scope.currentUser._id === id) {
            notifier.error('You can\'t ban/unban yourself');
        } else {
            BannedUsersResource.toggleBan({id: id});

            if ($location.path().indexOf('users') > 0) {
                $scope.users = UsersResource.query();
            }
            else if ($location.path().indexOf('admin/banned') > 0 && $scope.isAuthorizedAdmin) {
                $scope.bannedUsers = BannedUsersResource.query();
            }

            notifier.success('Successfully toggled ban for user');
        }
    };

    $scope.loadFilteredBannedUsers = function(pageNumber, filterData) {
        filterData = filterData || {};
        $scope.bannedUsers = BannedUsersResource.query({
            page: pageNumber,
            orderBy: filterData.orderBy,
            orderType: filterData.orderType
        });
    };
});
