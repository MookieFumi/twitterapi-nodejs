/*global require, module*/

var Q = require('q'),
    moment = require('moment'),
    _ = require('underscore'),
    fs = require('fs'),
    MongoClient = require('mongodb').MongoClient,
    dbConfig = require('./config/db.js');

module.exports = {
    transformData: function(users) {
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
        if (global.clubs.length > 0) {
            fs.writeFile('./data/clubs.json', JSON.stringify(global.clubs), function(err) {
                if (err) throw err;
            });
        }

        if (data.length > 0) {
            MongoClient.connect(dbConfig.url, function(err, db) {
                if (err) throw err;
                for (var i = data.length - 1; i >= 0; i--) {
                    //insert record
                    db.collection('users').insert(data[i], function(err, records) {
                        if (err) throw err;
                    });
                }
            });
        }

        console.log('Data updated');
    }
};
