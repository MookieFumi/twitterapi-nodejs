/*global global, require, process */
var moment = require('moment'),
    colors = require('colors'),
    twitterService = require('./twitterService.js'),
    dataService = require('./dataService.js'),
    dbConfig = require('./config/db.js');

global.clubs = [];
global.remaining = 0;

console.log(colors.bgBlue(moment.utc().toDate() + ' Mongo:' + dbConfig.url));

twitterService.getQuota()
    .then(dataService.getUserNames)
    .then(twitterService.getUsersLookup)
    .then(dataService.transformData)
    .then(dataService.saveData)
    .then(dataService.updateUserNames)
    .then(function() {
        console.log(colors.bgGreen("Process finished. " + moment.utc().toDate()));
        process.exit();
    })
    .fail(function(err) {
        console.log(colors.bgRed(err + '. ' + moment.utc().toDate()));
        process.exit();
    });
