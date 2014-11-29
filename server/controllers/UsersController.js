var encryption = require('../utilities/encryption');
var User = require('mongoose').model('User');

module.exports = {
    createUser: function(req, res, next) {
        var newUserData = req.body;
        newUserData.salt = encryption.generateSalt();
        newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
        User.create(newUserData, function(err, user) {
            if (err) {
                console.log('Failed to register new user: ' + err);
                return;
            }

            req.logIn(user, function(err) {
                if (err) {
                    res.status(400);
                    return res.send({reason: err.toString()});
                }

                res.send(user);
            });
        });
    },
    updateUser: function(req, res, next) {
        if (req.user._id === req.body._id || req.user.roles.indexOf('admin') > -1) {
            var updatedUserData = req.body;
            if (updatedUserData.password && updatedUserData.password.length > 0) {
                updatedUserData.salt = encryption.generateSalt();
                updatedUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
            }

            User.update({_id: req.body._id}, updatedUserData, function() {
                res.end();
            });
        } else {
            res.send({reason: 'You do not have permissions!'});
        }
    },
    getAllUsers: function(req, res) {
        req.query.orderBy = req.query.orderBy || 'username';
        req.query.orderType = req.query.orderType || 'desc';
        req.query.page = req.query.page || 1;

        var orderBy = (req.query.orderType === 'desc' ? req.query.orderBy : "-" + req.query.orderBy);
        User.find({isBanned: false})
            .sort(orderBy)
            .skip((req.query.page - 1) * 10)
            .limit(10)
            .exec(function(err, collection) {
                if (err) {
                    console.log('Users could not be loaded: ' + err);
                }
                res.send(collection);
            });
    },
    getBannedUsers: function(req, res) {
        req.query.orderBy = req.query.orderBy || 'username';
        req.query.orderType = req.query.orderType || 'desc';
        req.query.page = req.query.page || 1;

        var orderBy = (req.query.orderType === 'desc' ? req.query.orderBy : "-" + req.query.orderBy);
        User.find({isBanned: true})
            .sort(orderBy)
            .skip((req.query.page - 1) * 10)
            .limit(10)
            .exec(function(err, collection) {
                if (err) {
                    console.log('Users could not be loaded: ' + err);
                }
                res.send(collection);
            });
    },
    toggleUserBan: function(req, res) {
        User.findOne({_id: req.params.id}).exec(function(err, user) {
            if (err) {
                console.log('Users could not be loaded: ' + err);
            }

            user.isBanned = !user.isBanned;
            if (user.isBanned) {
                user.roles.push('banned');
            } else {
                var index = user.roles.indexOf('banned');

                if (index > -1) {
                    user.roles.splice(index, 1)
                }
            }

            user.save();
            res.send(user);
        });
    },
    getUserById: function (req, res) {
        User.findOne({_id: req.params.id}).exec(function (err, user) {
            if (err) {
                console.log('User could not be loaded: ' + err);
            }

            res.send(user);
        });
    }
};