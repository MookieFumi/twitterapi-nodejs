/*global require, module*/
var moment = require('moment');

module.exports = {
    getUserNames: function() {
        var values = '';
        var now = moment.utc();
        
        for (var i = global.clubs.length - 1; i >= 0; i--) {
            var club = global.clubs[i];
            if (now.diff(club.last_update, 'days') !== 0) {
                values = values + club.username + ', ';
            }
        }
        
        return values.substring(0, values.lastIndexOf(","));
    }
};
