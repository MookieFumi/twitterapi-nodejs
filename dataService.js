/*global global, require, module*/

var Q = require('q'),
    moment = require('moment'),
    _ = require('underscore'),
    dbConfig = require('./config/db.js'),
    MongoClient = require('mongodb').MongoClient;

module.exports = {
    getUserNames: function(remaining) {
        global.remaining = remaining;
        console.log('Data service. Getting users names...(remaining: ' + global.remaining + ')');
        var deferred = Q.defer();

        MongoClient.connect(dbConfig.url, function(err, db) {
            if (err) throw err;
            db.collection(dbConfig.user_names).find({
                $or: [{
                    last_update: {
                        $gte: new Date()
                    }
                }, {
                    last_update: ''
                }]
            }).limit(dbConfig.limit).toArray(function(err, data) {
                global.clubs = data;
                db.close();
                deferred.resolve();
            });
        });

        return deferred.promise;
    },
    updateUserNames: function() {
        console.log('Data service. Updating users names...');
        var deferred = Q.defer();

        MongoClient.connect(dbConfig.url, function(err, db) {
            if (err) {
                throw err;
            }
            var date = new Date();
            for (var i = 0; i < global.clubs.length; i++) {
                db.collection(dbConfig.user_names).update({
                    username: global.clubs[i].username
                }, {
                    $set: {
                        last_update: date
                    }
                });
            }
            db.close();
            deferred.resolve();
        });

        return deferred.promise;
    },
    transformData: function(users) {
        console.log('Data service. Transforming data...');

        var deferred = Q.defer();
        var data = [];
        var now = new Date();
        var nowMoment = moment(now);

        var sortedUser = _.sortBy(users, function(o) {
            return o.followers_count;
        });

        for (var i = 0; i < sortedUser.length; i++) {
            data.push({
                date: now,
                year: parseInt(nowMoment.format('YYYY')),
                month: parseInt(nowMoment.format('MM')),
                day: parseInt(nowMoment.format('DD')),
                week: parseInt(nowMoment.format('ww')),
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
                db.collection(dbConfig.twitter_stats).insert(data);
                db.close();
                deferred.resolve();
            });
        }
        else{
            deferred.reject();
        }
        return deferred.promise;
    }
};
