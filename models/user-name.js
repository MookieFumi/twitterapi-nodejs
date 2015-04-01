/*global require, module*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userNameSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    last_update: Date
});

module.exports = mongoose.model('user-Name', userNameSchema);
