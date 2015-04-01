/*global require, module, process*/

var Q = require('q'),
    moment = require('moment'),
    _ = require('underscore'),
    path = require('path'),
    TwitterStat = require(path.join(process.cwd(), 'models', 'twitter-stat'));

module.exports = {
    transformData: function(users) {
        console.log('Data service. Transforming data...');

        var deferred = Q.defer();
        var data = [];
        var now = new Date();
        var nowMoment = moment(now);

        var sortedUser = _.sortBy(users, function(o) {
            return o.followers_count;
        });

        _.each(sortedUser, function(user) {
            var twitterStat = {
                date: now,
                year: parseInt(nowMoment.format('YYYY')),
                month: parseInt(nowMoment.format('MM')),
                day: parseInt(nowMoment.format('DD')),
                week: parseInt(nowMoment.format('ww')),
                type: 'soccer',
                id: user.id,
                name: user.name,
                screen_name: user.screen_name,
                description: user.description,
                url: user.url,
                followers_count: user.followers_count,
                friends_count: user.friends_count,
                profile_image_url: user.profile_image_url,
                profile_image_url_https: user.profile_image_url_https
            };
            data.push(twitterStat);
        });

        deferred.resolve(data);

        return deferred.promise;
    },
    saveData: function(data) {
        console.log('Data service. Saving data...');
        var deferred = Q.defer();

        if (data.length > 0) {
            TwitterStat.collection.insert(data);
            deferred.resolve();
        } else {
            deferred.reject();
        }
        return deferred.promise;
    }
};
