/*global require */
//db.users.find({ year: {$eq: 2015}, week: {$eq: 14}, followers_count: { $gte: 500000 } }).sort( { followers_count: -1 } ).limit(10);

var moment = require('moment'),
    colors = require('colors'),
    twitterService = require('./twitterService.js'),
    dataService = require('./dataService.js'),
    dbConfig = require('./config/db.js');

global.clubs = [];

console.log(colors.bgYellow(moment.utc().toDate() + ' Mongo:' + dbConfig.url));

dataService.getUserNames()
    .then(twitterService.getQuota)
    .then(twitterService.getUsersLookup)
    .then(dataService.transformData)
    .then(dataService.saveData)
    .then(dataService.updateUserNames)
    .then(function() {
        console.log(colors.bgBlue("Process finished. " + moment.utc().toDate()));
    })
    .fail(function(err) {
        console.log(colors.bgRed(err + '. ' + moment.utc().toDate()));
    });
