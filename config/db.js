/*global module, process*/

module.exports = {
    url: function() {
    	// return 'mongodb://heroku_app35439359:886eiu19675c1gsvdcu6beljtf@ds039281.mongolab.com:39281/heroku_app35439359';
        return process.env.MONGOLAB_URI || 'mongodb://localhost:28017/heroku_app35439359';
    }(),
    twitter_stats: 'twitter-stats',
    user_names: 'user-names',
    limit: 100
};
