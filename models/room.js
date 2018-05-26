var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({
    name: String,
    restaurants: [{
        name: String,
        votes: [String]
    }],
});

var Room = mongoose.model('Room', roomSchema);
module.exports = Room;