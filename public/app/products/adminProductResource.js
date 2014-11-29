app.factory('AdminProductResource', function($resource) {
    var Resource = $resource('/api/admin/products');

    return Resource;
});