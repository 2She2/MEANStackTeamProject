var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function(app) {
    app.get('/api/users', controllers.users.getAllUsers);
    app.post('/api/users', controllers.users.createUser);
    app.put('/api/users', auth.isAuthenticated, controllers.users.updateUser);

    app.get('/api/users/:id', controllers.users.getUserById);

    app.get('/api/banned', auth.isInRole('admin'), controllers.users.getBannedUsers);
    app.put('/api/banned/:id', auth.isInRole('admin'), controllers.users.toggleUserBan);

    app.get('/api/admin/products', auth.isInRole('admin'), controllers.products.getAllProducts);

    app.get('/api/products', controllers.products.getAllAvailableProducts);
    app.post('/api/products', controllers.products.addProduct);

    app.get('/api/products/:id', controllers.products.getProductById);

    app.post('/api/products/:id/comment', controllers.products.addComment);
    app.post('/api/products/:type/:id', controllers.products.approveProduct);

    app.get('/partials/:partialArea/:partialName', function(req, res) {
        res.render('../../public/app/' + req.params.partialArea + '/' + req.params.partialName)
    });

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    app.get('/api/*', function(req, res) {
        res.status(404);
        res.end();
    });

    app.get('*', function(req, res) {
        res.render('index', {currentUser: req.user});
    });
};