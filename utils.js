/*global global, module, require */

var _ = require('underscore');

module.exports = {
    getUserNames: function() {
        var values = '';

        _.each(global.clubs, function(club) {
            values = values + club.username + ',';
        });

        return values.substring(0, values.lastIndexOf(","));
    }
};
