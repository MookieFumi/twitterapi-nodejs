/*global global, module */

module.exports = {
    getUserNames: function() {
        var values = '';

        for (var i = 0; i < global.clubs.length; i++) {
            values = values + global.clubs[i].username + ', ';
        }

        return values.substring(0, values.lastIndexOf(","));
    }
};
