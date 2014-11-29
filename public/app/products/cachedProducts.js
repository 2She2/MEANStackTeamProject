app.factory('cachedProducts', function(ProductResource) {
    var cachedProducts;

    return {
        query: function() {
            if (!cachedProducts) {
                cachedProducts = ProductResource.query();
            }

            return cachedProducts;
        }
    };
});