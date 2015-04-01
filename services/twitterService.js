/*global global, module, require, process */

var Q = require('q'),
    Twitter = require('twitter'),
    path = require('path'),
    twitterConfig = require(path.join(process.cwd(), 'config', 'twitter')),
    client = new Twitter({
        consumer_key: twitterConfig.consumer_key,
        consumer_secret: twitterConfig.consumer_secret,
        access_token_key: twitterConfig.access_token_key,
        access_token_secret: twitterConfig.access_token_secret
    }),
    utils = require(path.join(process.cwd(), 'utils'));

module.exports = {
    getUsersLookup: function() {
        console.log('Twitter service. Getting users lookup... ');
        var deferred = Q.defer();
        var usernames = utils.getUserNames();

        if (usernames.length > 0 && global.remaining > 0 && usernames.trim() !== '') {
            client.get('users/lookup', {
                screen_name: usernames
            }, function(error, users) {
                if (error) throw error;
                deferred.resolve(users);
            });
        } else {
            deferred.reject('No quota/ no data');
        }

        return deferred.promise;
    },
    getQuota: function() {
        console.log('Twitter service. Getting quota...');
        var deferred = Q.defer();
        client.get('application/rate_limit_status', function(error, data) {
            if (error) throw error;
            deferred.resolve(data.resources.users['/users/lookup'].remaining);
        });

        return deferred.promise;
    }
};
