/*global global, require, module, process*/

var Q = require('q'),
    path = require('path'),
    utils = require(path.join(process.cwd(), 'utils')),
    UserName = require(path.join(process.cwd(), 'models', 'user-name'));

module.exports = {
    getUserNames: function(remaining) {
        global.remaining = remaining;
        console.log('Data service. Getting users names...(remaining: ' + global.remaining + ')');

        var deferred = Q.defer();
        UserName.find({
                $or: [{
                    last_update: {
                        $gt: new Date()
                    }
                }, {
                    last_update: null
                }]
            })
            .limit(100)
            .exec(function(err, data) {
                global.clubs = data;
                deferred.resolve();
            });

        return deferred.promise;
    },
    updateUserNames: function() {
        console.log('Data service. Updating users names...');

        var deferred = Q.defer();
        var date = new Date();

        UserName.update({
            username: {
                $in: utils.getUserNames().split(',')
            }
        }, {
            last_update: date
        }, {
            multi: true
        }, function(err, numberAffected, raw) {
            if (err) throw err;
        });

        deferred.resolve();

        return deferred.promise;
    }
};
