/*global require, module*/

var Q = require('q'),
    moment = require('moment'),
    fs = require('fs'),
    MongoClient = require('mongodb').MongoClient,
    dbConfig = require('./config/db.js');

module.exports = {
    transformData: function(users) {
        var deferred = Q.defer();
        var data = [];

        var date = moment.utc();
        for (var i = 0; i < users.length; i++) {
            data.push({
                date: date,
                year: date.format('YYYY'),
                month: date.format('MM'),
                day: date.format('DD'),
                id: users[i].id,
                description: users[i].description,
                url: users[i].url,
                followers_count: users[i].followers_count,
                friends_count: users[i].friends_count,
                profile_image_url: users[i].profile_image_url,
                profile_image_url_https: users[i].profile_image_url_https
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
