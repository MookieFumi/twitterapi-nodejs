/*global require, module*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var twitterStatSchema = new Schema({
    date: Date,
    year: Number,
    month: Number,
    day: Number,
    week: Number,
    type: String,
    id: Number,
    name: String,
    screen_name: String,
    description: String,
    url: String,
    followers_count: String,
    friends_count: String,
    profile_image_url: String,
    profile_image_url_https: String
});

module.exports = mongoose.model('twitter-stats', twitterStatSchema);
