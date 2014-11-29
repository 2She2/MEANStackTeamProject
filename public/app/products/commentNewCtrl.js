app.controller('CommentNewCtrl', function ($scope, $http, $routeParams, notifier, identity, $q, $location) {
    $scope.identity = identity;
    $scope._id = $routeParams.id;

    $scope.addComment = function (comment) {
        if (!identity.isAuthenticated()) {
            notifier.error("Login first!");
            return;
        }

        if(comment.title.length < 3) {
            notifier.error('Title must be at least 3 chars.');
            return;
        }

        if(comment.content.length < 10 ) {
            notifier.error('Content must be at least 10 chars.');
            return;
        }

        var url = '/api/products/' + $scope._id + '/comment';

        var deferred = $q.defer();
        $http.post(url, comment)
            .success(function (data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config) {
                deferred.reject(data);
            })
            .then(function (data) {
                notifier.success('Product approved.');
                $location.path('/products/' + $scope._id);
            }, function (error) {
                console.log(error.message);
            });
    }
});