/*global module, process*/

module.exports = {
    url: function() {
        return process.env.MONGOLAB_URI || 'mongodb://localhost:27017/heroku_app35439359';
    }(),
    twitter_stats: 'twitter-stats',
    user_names: 'user-names',
    limit: 100
};
