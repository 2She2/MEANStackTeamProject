var Products = require('mongoose').model('Product'),
    Users = require('mongoose').model('User'),
    formidable = require('formidable'),
    util = require('util'),
    fs = require('fs-extra');

module.exports = {
    getAllAvailableProducts: function (req, res, next) {
        req.query.orderBy = req.query.orderBy || 'name';
        req.query.orderType = req.query.orderType || 'desc';
        req.query.page = req.query.page || 1;

        var orderBy = (req.query.orderType === 'desc' ? req.query.orderBy : "-" + req.query.orderBy);

        Products.find({sold: false, approved: true})
            .sort(orderBy)
            .skip((req.query.page - 1) * 10)
            .limit(10)
            .exec(function (err, collection) {
                if (err) {
                    console.log('Products could not be loaded: ' + err);
                }
                res.send(collection);
            });
    },
    getAllProducts: function (req, res, next) {
        req.query.orderBy = req.query.orderBy || 'name';
        req.query.orderType = req.query.orderType || 'desc';
        req.query.page = req.query.page || 1;

        var orderBy = (req.query.orderType === 'desc' ? req.query.orderBy : "-" + req.query.orderBy);

        Products.find({})
            .sort(orderBy)
            .skip((req.query.page - 1) * 10)
            .limit(10)
            .exec(function (err, collection) {
                if (err) {
                    console.log('Products could not be loaded: ' + err);
                }
                res.send(collection);
            });
    },
    getProductById: function (req, res, next) {
        Products.findOne({_id: req.params.id}).exec(function (err, product) {
            if (err) {
                console.log('Product could not be loaded: ' + err);
            }

            res.send(product);
        });
    },
    addComment: function (req, res, next) {
        var title = req.body.title;
        var content = req.body.content;
        var productId = req.params.id;

        if(title.length < 3) {
            res.error("Comment title cannot be less than 3 characters long");
            return;
        }

        if(content.length < 10) {
            res.error("Comment length cannot be less than 10 characters long");
            return;
        }

        Products.findOne({_id: productId}).exec(function (err, product) {
            if (err) {
                console.log('Product could not be founed: ' + err);
            }

            product.comments.push({
                title: title,
                published: Date.now(),
                content: content
            });

            product.save(function(err){
                if (err){
                    return console.log(err);
                }

                res.redirect('/#/products/' + productId);
            });


        })
    },
    approveProduct: function (req, res, next) {
        Products.findOne({_id: req.params.id}).exec(function (err, product) {
            if (err) {
                console.log('Product could not be loaded: ' + err);
            }

            if (req.params.type == 'approve') {
                product.approved = true;
            } else if (req.params.type == 'sold') {
                product.sold = true;
            }

            product.save(function (err) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/#');
            })
        });
    },
    addProduct: function (req, res, next) {
     //   console.log('---------------------> Add function entered');
        var form = new formidable.IncomingForm();
        var productName = null;
        var productPrice = null;
        var username = null;
        form.uploadDir = __dirname + '/../../public/pictures/';

        form.parse(req, function (err, fields, files) {
            productName = fields['name'];
            productPrice = fields['price'];
            username = fields['username'];
        });

        form.on('end', function (fields, files) {
            var temp_path = this.openedFiles[0].path;
            var file_name = this.openedFiles[0].name;
            var filePathWithExt = temp_path + '.' + file_name.split('.')[1];
            var array = filePathWithExt.split('\\');
            var newFileName = array[array.length - 1];
            var userId = '';

            fs.copy(temp_path, filePathWithExt, function (err) {
                if (err) {
                    console.error(err);
                }

                Users.findOne({username: username}).exec(function (err, user) {
                    if (err) {
                        console.log('User could not be loaded: ' + err);
                    }

                    userId = user._id;

                    Products.create({
                        seller: {
                            username: username,
                            userId: userId
                        },
                        name: productName,
                        price: productPrice,
                        approved: false,
                        published: Date.now(),
                        image: newFileName,
                        comments: [],
                        sold: false
                    });
                });

                fs.remove(temp_path);

                res.redirect('/#');
            });
        });
    }
};
