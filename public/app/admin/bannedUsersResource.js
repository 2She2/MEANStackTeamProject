app.factory('BannedUsersResource', function($resource) {
    var BannedUsersResource = $resource('/api/banned/:id', {
            _id:'@id'
        }, {
            toggleBan: {
                method: 'PUT',
                params: {
                    id: '@id'
                },
                isArray: false
            }
        });

    return BannedUsersResource;
});