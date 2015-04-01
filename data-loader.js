/*global require */

var fs = require('fs'),
    colors = require('colors'),
    moment = require('moment'),
    dbConfig = require('./config/db.js'),
    MongoClient = require('mongodb').MongoClient;

fs.readFile('./data/clubs.json', function(err, data) {
    if (err) throw err;
    var clubs = JSON.parse(data);

    MongoClient.connect(dbConfig.url, function(err, db) {
        if (err) {
            console.log(err);
            throw err;
        }
        db.collection(dbConfig.user_names).insert(clubs);
        db.close();
    });

    console.log(colors.bgBlue(moment.utc().toDate() + ' Data loaded: ' + clubs.length));
}); 
