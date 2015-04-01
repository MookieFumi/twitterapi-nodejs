/*global require */

var fs = require('fs'),
    colors = require('colors'),
    moment = require('moment'),
    _ = require('underscore'),
    dbConfig = require('./config/db'),
    UserName = require('./models/user-name'),
    mongoose = require('mongoose');

mongoose.connect(dbConfig.url, function(err, res) {
    if (err) {
        console.log(colors.bgRed('Error connecting to Database. ' + err));
    }
});

fs.readFile('./data/clubs.json', function(err, data) {
    if (err) throw err;
    var clubs = JSON.parse(data);
    var usernames = _.map(clubs, function(club) {
        return new UserName({
            username: club.username,
            country: club.country,
            last_update: null
        });
    });

    _.each(usernames, function(username) {
        username.save(function(err) {
            if (err) console.log(err);
        });
    });

    console.log(colors.bgBlue(moment.utc().toDate() + ' Data loaded: ' + clubs.length));
});
