/*global require, module*/

var Q = require('q'),
    moment = require('moment'),
    _ = require('underscore'),
    dbConfig = require('./config/db.js'),
    MongoClient = require('mongodb').MongoClient;

module.exports = {
    updateUserNames: function() {
        console.log('Data service. Updating users names...');
        var deferred = Q.defer();

        MongoClient.connect(dbConfig.url, function(err, db) {
            if (err) {
                throw err;
            }
            var date = moment.utc();
            for (var i = global.clubs.length - 1; i >= 0; i--) {
                db.collection(dbConfig.user_names).update({
                    username: global.clubs[i].username
                }, {
                    $set: {
                        last_update: new Date((new Date(parseInt(date.format('YYYY')), parseInt(date.format('MM')), parseInt(date.format('DD')))))
                    }
                });
            };
            db.close();
            deferred.resolve();
        });

        return deferred.promise;
    },
    getUserNames: function() {
        console.log('Data service. Getting users names...');
        var deferred = Q.defer();
        var now = moment.utc();

        MongoClient.connect(dbConfig.url, function(err, db) {
            if (err) throw err;
            db.collection(dbConfig.user_names).find({
                last_update: {
                    $ne: new Date(parseInt(now.format('YYYY')), parseInt(now.format('MM')), parseInt(now.format('DD')))
                }
            }).toArray(function(err, data) {
                global.clubs = data;
                deferred.resolve();
                db.close();
            });
        });

        return deferred.promise;
    },
    transformData: function(users) {
        console.log('Data service. Transforming data...');

        var deferred = Q.defer();
        var data = [];
        var date = moment.utc();

        var sortedUser = _.sortBy(users, function(o) {
            return o.followers_count;
        });

        for (var i = 0; i < sortedUser.length; i++) {
            data.push({
                date: date,
                year: parseInt(date.format('YYYY')),
                year_position: 0,
                month: parseInt(date.format('MM')),
                month_position: 0,
                day: parseInt(date.format('DD')),
                day_position: 0,
                week: parseInt(date.format('ww')),
                week_position: 0,
                type: 'soccer',
                id: sortedUser[i].id,
                name: sortedUser[i].name,
                screen_name: sortedUser[i].screen_name,
                description: sortedUser[i].description,
                url: sortedUser[i].url,
                followers_count: sortedUser[i].followers_count,
                friends_count: sortedUser[i].friends_count,
                profile_image_url: sortedUser[i].profile_image_url,
                profile_image_url_https: sortedUser[i].profile_image_url_https
            });
        }

        deferred.resolve(data);

        return deferred.promise;
    },
    saveData: function(data) {
        console.log('Data service. Saving data...');
        var deferred = Q.defer();

        if (data.length > 0) {
            MongoClient.connect(dbConfig.url, function(err, db) {
                if (err) {
                    console.log(err);
                    throw err;
                }

                for (var i = data.length - 1; i >= 0; i--) {
                    db.collection(dbConfig.twitter_stats).insert(data[i], function(err) {
                        if (err) throw err;
                    });
                }
            });
        }

        deferred.resolve();
        return deferred.promise;
    }
};
