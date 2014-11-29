var mongoose = require('mongoose');

var productsSchema = mongoose.Schema({
    name: String,
    description: String,
    price: String,
    published: Date,
    image: String,
    approved: Boolean,
    sold: Boolean,
    seller: {
        username: String,
        userId: String
    },
    comments: [{
        title: String,
        published: Date,
        content: String
    }]
});

var Product = mongoose.model('Product', productsSchema);

module.exports.seedInitialProducts = function () {
    Product.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find products: ' + err);
            return;
        }

        if (collection.length === 0) {
            Product.create({
                seller: {
                    username: "Ivan Ivanov",
                    userId: "testUserIdasasas"
                },
                name: "some rmjvsnfv cd",
                description: "kjdlkajsl kdj alksjd ladasf",
                price: 12.68,
                approved: false,
                published: new Date('08.12.2314'),
                image: '',
                comments: [
                    {
                        title: "ifghrniur",
                        published: new Date('09.12.2314'),
                        content: "fsbnsfvn dafjnvs efnws"
                    },
                    {
                        title: "djngvsov",
                        published: new Date('22.12.2414'),
                        content: "dolfgmofn  jdfnmwsf rigfjwrisg iwrwrijfmwi fniwrnsr lorem"
                    }
                ],
                sold: false
            });
            Product.create({
                seller: {
                    username: "Gosho Petrov",
                    userId: "testUserId"
                },
                name: "Ultra Cool Prodict",
                price: 1234531,
                approved: false,
                published: new Date('12.12.2014'),
                image: '',
                comments: [
                    {
                        title: "Like",
                        published: new Date('13.12.2014'),
                        content: "This is really good product!"
                    },
                    {
                        title: "Hate",
                        published: new Date('14.12.2014'),
                        content: "This guy is LIAR!"
                    }
                ],
                sold: false
            });
        }
    });
};
