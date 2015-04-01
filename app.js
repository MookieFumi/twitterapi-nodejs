/*global global, require */
var moment = require('moment'),
    colors = require('colors'),
    mongoose = require('mongoose'),
    twitterService = require('./services/twitterService.js'),
    twitterStatService = require('./services/twitterStatService.js'),
    usernameService = require('./services/usernameService.js'),
    dbConfig = require('./config/db.js');

global.clubs = [];
global.remaining = 0;

console.log(colors.bgBlue(moment.utc().toDate() + ' Mongo:' + dbConfig.url));

mongoose.connect(dbConfig.url, function(err, res) {
    if (err) {
        console.log(colors.bgRed('Error connecting to Database. ' + err));
    }
});

twitterService.getQuota()
    .then(usernameService.getUserNames)
    .then(twitterService.getUsersLookup)
    .then(twitterStatService.transformData)
    .then(twitterStatService.saveData)
    .then(usernameService.updateUserNames)
    .then(function() {
        console.log(colors.bgGreen("Process finished. " + moment.utc().toDate()));
    })
    .fail(function(err) {
        console.log(colors.bgRed(err + '. ' + moment.utc().toDate()));
    });
