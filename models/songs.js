var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var songsSchema =  new Schema({
    name: String,
    rating: Number
});

module.exports = mongoose.model('song', songsSchema);
