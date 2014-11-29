var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    username: { type: String, require: '{PATH} is required', unique: true },
    firstName: { type: String, require: '{PATH} is required' },
    lastName: { type: String, require: '{PATH} is required' },
    salt: String,
    hashPass: String,
    roles: [String],
    city: String,
    phone: String,
    isBanned: Boolean,
    messages: [
        {
            from: {
                username: String,
                userId: String
            },
            dateSent: Date,
            content: String
        }
    ]
});

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashPass;
    }
});

var User = mongoose.model('User', userSchema);

module.exports.seedInitialUsers = function () {
    User.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find users: ' + err);
            return;
        }

        if (collection.length === 0) {
            var salt;
            var hashedPwd;

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'adminuser');
            User.create({
                username: 'adminuser',
                firstName: 'Administrator',
                lastName: 'Administratorov',
                salt: salt,
                hashPass: hashedPwd,
                roles: ['admin'],
                city: 'Sofia',
                phone: '0888888888',
                isBanned: false,
                messages: [
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qwe'
                        },
                        dateSent: new Date('17.12.2014'),
                        content: 'Message #1'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('13.12.2014'),
                        content: 'Message #2'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.11.2014'),
                        content: 'Message #3'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.12.2014'),
                        content: 'Message #4'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('10.11.2014'),
                        content: 'Message #5'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.16.2014'),
                        content: 'Message #6'
                    }
                ]
            });
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'standarduser');
            User.create({
                username: 'standarduser',
                firstName: 'Standard',
                lastName: 'Standardski',
                salt: salt,
                hashPass: hashedPwd,
                roles: ['standard'],
                city: 'Sofia',
                phone: '0889283754',
                isBanned: false,
                messages: [
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qwe'
                        },
                        dateSent: new Date('17.12.2014'),
                        content: 'Message #1'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('13.12.2014'),
                        content: 'Message #2'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.11.2014'),
                        content: 'Message #3'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.12.2014'),
                        content: 'Message #4'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('10.11.2014'),
                        content: 'Message #5'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.16.2014'),
                        content: 'Message #6'
                    }
                ]
            });
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'peshopesho');
            User.create({
                username: 'peshoROX',
                firstName: 'Pesho',
                lastName: 'Peshov',
                salt: salt,
                hashPass: hashedPwd,
                roles: ['standard'],
                city: 'Plovidv',
                phone: '0884092839',
                isBanned: true,
                messages: [
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qwe'
                        },
                        dateSent: new Date('17.12.2014'),
                        content: 'Message #1'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('13.12.2014'),
                        content: 'Message #2'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.11.2014'),
                        content: 'Message #3'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.12.2014'),
                        content: 'Message #4'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('10.11.2014'),
                        content: 'Message #5'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.16.2014'),
                        content: 'Message #6'
                    }
                ]
            });
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'qweqwe');
            User.create({
                username: 'velmond',
                firstName: 'Mitko',
                lastName: 'Nikolov',
                salt: salt,
                hashPass: hashedPwd,
                roles: ['admin'],
                city: 'Elin Pelin',
                phone: '0888123456',
                isBanned: false,
                messages: [
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qwe'
                        },
                        dateSent: new Date('17.12.2014'),
                        content: 'Message #1'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('13.12.2014'),
                        content: 'Message #2'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.11.2014'),
                        content: 'Message #3'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.12.2014'),
                        content: 'Message #4'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('10.11.2014'),
                        content: 'Message #5'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.16.2014'),
                        content: 'Message #6'
                    }
                ]
            });
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'i<3toto');
            User.create({
                username: 'dorothy',
                firstName: 'Dorothy',
                lastName: 'Whatshername',
                salt: salt,
                hashPass: hashedPwd,
                roles: ['standard'],
                city: 'Not From Kanzas',
                phone: '0894781783',
                isBanned: false,
                messages: [
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qwe'
                        },
                        dateSent: new Date('17.12.2014'),
                        content: 'Message #1'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('13.12.2014'),
                        content: 'Message #2'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.11.2014'),
                        content: 'Message #3'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.12.2014'),
                        content: 'Message #4'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('10.11.2014'),
                        content: 'Message #5'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.16.2014'),
                        content: 'Message #6'
                    }]
            });
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'peshor0x');
            User.create({
                username: 'peshkata',
                firstName: 'Pesho',
                lastName: 'Goshov',
                salt: salt,
                hashPass: hashedPwd,
                roles: ['standard'],
                city: 'Peshindol',
                phone: '0888173456',
                isBanned: false,
                messages: [
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qwe'
                        },
                        dateSent: new Date('17.12.2014'),
                        content: 'Message #1'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('13.12.2014'),
                        content: 'Message #2'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.11.2014'),
                        content: 'Message #3'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.12.2014'),
                        content: 'Message #4'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('10.11.2014'),
                        content: 'Message #5'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.16.2014'),
                        content: 'Message #6'
                    }]
            });
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'goshor0xmore');
            User.create({
                username: 'gesh',
                firstName: 'Gosho',
                lastName: 'Goshov',
                salt: salt,
                hashPass: hashedPwd,
                roles: ['standard'],
                city: 'Georgetown',
                phone: '0888129326',
                isBanned: false,
                messages: [
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qwe'
                        },
                        dateSent: new Date('17.12.2014'),
                        content: 'Message #1'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('13.12.2014'),
                        content: 'Message #2'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.11.2014'),
                        content: 'Message #3'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.12.2014'),
                        content: 'Message #4'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('10.11.2014'),
                        content: 'Message #5'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.16.2014'),
                        content: 'Message #6'
                    }]
            });
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'waterloosux');
            User.create({
                username: 'napoleon',
                firstName: 'Napoleon',
                lastName: 'Bonapartov',
                salt: salt,
                hashPass: hashedPwd,
                roles: ['standard'],
                city: 'Paris',
                phone: '0888433456',
                isBanned: false,
                messages: [
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qwe'
                        },
                        dateSent: new Date('17.12.2014'),
                        content: 'Message #1'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('13.12.2014'),
                        content: 'Message #2'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.11.2014'),
                        content: 'Message #3'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.12.2014'),
                        content: 'Message #4'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('10.11.2014'),
                        content: 'Message #5'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.16.2014'),
                        content: 'Message #6'
                    }]
            });
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'catsaredelicious');
            User.create({
                username: 'alfinito',
                firstName: 'Alfred',
                lastName: 'Melmakov',
                salt: salt,
                hashPass: hashedPwd,
                roles: ['standard'],
                city: 'Melmak',
                phone: '0888123456',
                isBanned: false,
                messages: [
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qwe'
                        },
                        dateSent: new Date('17.12.2014'),
                        content: 'Message #1'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('13.12.2014'),
                        content: 'Message #2'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.11.2014'),
                        content: 'Message #3'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.12.2014'),
                        content: 'Message #4'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('10.11.2014'),
                        content: 'Message #5'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.16.2014'),
                        content: 'Message #6'
                    }]
            });
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'toshkataroxthemost');
            User.create({
                username: 'toshkata',
                firstName: 'Tosho',
                lastName: 'Toshov',
                salt: salt,
                hashPass: hashedPwd,
                roles: ['standard'],
                city: 'Todorini livadi',
                phone: '0888529326',
                isBanned: false,
                messages: [
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qwe'
                        },
                        dateSent: new Date('17.12.2014'),
                        content: 'Message #1'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('13.12.2014'),
                        content: 'Message #2'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.11.2014'),
                        content: 'Message #3'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.12.2014'),
                        content: 'Message #4'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('10.11.2014'),
                        content: 'Message #5'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.16.2014'),
                        content: 'Message #6'
                    }]
            });
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'mozimozimozi');
            User.create({
                username: 'mozimozi',
                firstName: 'Mozi',
                lastName: 'Mozimozimozi',
                salt: salt,
                hashPass: hashedPwd,
                roles: ['standard'],
                city: 'Mozimozimozi',
                phone: '0888950426',
                isBanned: false,
                messages: [
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qwe'
                        },
                        dateSent: new Date('17.12.2014'),
                        content: 'Message #1'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('13.12.2014'),
                        content: 'Message #2'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.11.2014'),
                        content: 'Message #3'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.12.2014'),
                        content: 'Message #4'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('10.11.2014'),
                        content: 'Message #5'
                    },
                    {
                        from: {
                            username: 'qwe',
                            userId: 'qweqwe'
                        },
                        dateSent: new Date('12.16.2014'),
                        content: 'Message #6'
                    }]
            });
            console.log('Users added to database...');
        }
    });
};