app.factory('auth', function ($http, $q, identity, UsersResource, notifier) {
    return {
        signup: function (user) {
            if (user.username.length < 6) {
                notifier.error('Username must be at least 6 characters long');
                return;
            }

            if (user.password.length < 6) {
                notifier.error('Password must be at least 6 characters long');
                return;
            }

            if (user.password != user.confirmPassword) {
                notifier.error('Password does not match confirmation password');
                return;
            }

            var deferred = $q.defer();

            var user = new UsersResource(user);
            user.$save().then(function () {
                identity.currentUser = user;
                deferred.resolve();
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        },
        update: function (user) {
            var deferred = $q.defer();

            var updatedUser = new UsersResource(user);
            updatedUser._id = identity.currentUser._id;
            updatedUser.$update().then(function () {
                identity.currentUser.firstName = updatedUser.firstName;
                identity.currentUser.lastName = updatedUser.lastName;
                identity.currentUser.city = updatedUser.city;
                identity.currentUser.phone = updatedUser.phone;
                deferred.resolve();
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        },
        login: function (user) {
            if (user.username.length < 6) {
                notifier.error('Username must be at least 6 characters long');
                return;
            }

            if (user.password.length < 6) {
                notifier.error('Password must be at least 6 characters long');
                return;
            }

            var deferred = $q.defer();

            $http.post('/login', user).success(function (response) {
                if (response.success) {
                    var user = new UsersResource();
                    angular.extend(user, response.user);
                    identity.currentUser = user;
                    deferred.resolve(true);
                } else {
                    deferred.resolve(false);
                }
            });

            return deferred.promise;
        },
        logout: function () {
            var deferred = $q.defer();

            $http.post('/logout').success(function () {
                identity.currentUser = undefined;
                deferred.resolve();
            });

            return deferred.promise;
        },
        isAuthenticated: function () {
            //   console.log("is auth = "+identity.isAuthenticated());
            if (identity.isAuthenticated()) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        },
        isAuthorizedForRole: function (role) {
            if (identity.isAuthorizedForRole(role)) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }
    };
});