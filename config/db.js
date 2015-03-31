/*global module*/

module.exports = {
    url: function() {
        return process.env.NODE_MONGOURL || 'mongodb://localhost:28017/heroku_app35406221';
    }(),
    twitter_stats: 'twitter-stats',
    user_names: 'user-names',
};
