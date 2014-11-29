var app = angular.module('app', ['ngResource', 'ngRoute']).value('toastr', toastr);

app.config(function($routeProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);

    var routeUserChecks = {
        adminRole: {
            authenticate: function(auth) {
                return auth.isAuthorizedForRole('admin');
            }
        },/*
        notBanned: {
            authenticate: function(auth) {
                return !auth.isAuthorizedForRole('banned');
            }
        },*/
        authenticated: {
            authenticate: function(auth) {
                return auth.isAuthenticated();
            }
        }
    };

    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/home',
            controller: 'MainCtrl'
        })
        .when('/products', {
            templateUrl: '/partials/products/products-list',
            controller: 'ProductsListCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/products/new', {
            templateUrl: '/partials/products/products-new',
            controller: 'ProductsNewCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/products/admin', {
            templateUrl: '/partials/products/products-admin',
            controller: 'ProductsAdminCtrl',
            resolve: routeUserChecks.adminRole
        })
        .when('/products/:id', {
            templateUrl: '/partials/products/product-details',
            controller: 'ProductDetailsCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/products/:id/comment', {
            templateUrl: '/partials/products/comment-new',
            controller: 'CommentNewCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/signup', {
            templateUrl: '/partials/account/signup',
            controller: 'SignUpCtrl'
        })
        .when('/profile', {
            templateUrl: '/partials/account/profile',
            controller: 'ProfileCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/users/:id', {
            templateUrl: '/partials/account/profile-details',
            controller: 'ProfileDetailsCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/users', {
            templateUrl: '/partials/admin/users-list',
            controller: 'UserListCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/admin/users', {
            templateUrl: '/partials/admin/users-list',
            controller: 'UserListCtrl',
            resolve: routeUserChecks.adminRole
        })
        .when('/admin/banned', {
            templateUrl: '/partials/admin/banned-users-list',
            controller: 'UserListCtrl',
            resolve: routeUserChecks.adminRole
        })
        .when('/unauthorized', {
            templateUrl: '/partials/main/unauthorized'
        });
});

app.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/unauthorized');
        }
    });
});