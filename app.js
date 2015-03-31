/*global require */
//db.users.find({ year: {$eq: 2015}, week: {$eq: 14}, followers_count: { $gte: 500000 } }).sort( { followers_count: -1 } ).limit(10);

var fs = require('fs'),
    moment = require('moment'),
    twitterService = require('./twitterService.js'),
    dataService = require('./dataService.js'),
    dbConfig = require('./config/db.js');

global.clubs = [];

// setInterval(function() {
console.log(moment.utc().toDate() + ' Mongo:' + dbConfig.url);
fs.readFile('./data/clubs.json', function(err, data) {
    if (err) throw err;
    global.clubs = JSON.parse(data);
    twitterService.getQuota()
        .then(twitterService.getUsersLookup)
        .then(dataService.transformData)
        .then(dataService.saveData);
});
// }, 30 * 60 * 1000);
