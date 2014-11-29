app.factory('ProductResource', function($resource) {
    var Resource = $resource('/api/products/:id', {id:'@id'}, { update: {method: 'PUT', isArray: false}})

    return Resource;
});