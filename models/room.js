var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({
    name: String,
    restaurants: [{
        type: Schema.Types.Mixed,
        ref: 'Restaurant'
    }],
});

var Room = mongoose.model('Room', roomSchema);
module.exports = Room;