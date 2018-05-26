var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var RoomSchema = new Schema({
    name: String,
    restaurants: [{
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    }],
});

module.exports = mongoose.model('Room', RoomSchema);
