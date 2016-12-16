var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var songsSchema =  new Schema({
    name: {type:String, default:''},
    rating: {type:Number, default:0}
});

module.exports = mongoose.model('song', songsSchema);
