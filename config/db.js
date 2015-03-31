/*global module*/

module.exports = {
    url: function () {
    	return process.env.NODE_MONGOURL || 'mongodb://localhost:28017';    	
    }(),
    collectionName: 'twitter-stats'
};
