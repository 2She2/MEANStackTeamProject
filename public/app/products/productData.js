app.factory('productData', function($http, $q) {
    return {
        approve: function (product) {
            var deferred = $q.defer();
            var id = product._id;
            var url = '/api/products/approve/'+id;

            $http({method: 'POST', url: url})
                .success(function(data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function(data, status, headers, config) {
                    deferred.reject(data);
                });

            return deferred.promise;
        },
        sold: function (product) {
            var deferred = $q.defer();
            var id = product._id;
            var url = '/api/products/sold/'+id;

            $http({method: 'POST', url: url})
                .success(function(data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function(data, status, headers, config) {
                    deferred.reject(data);
                });

            return deferred.promise;
        }
    }
})

