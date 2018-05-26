var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var restaurantSchema = new Schema({
    name: String,
    room_name: String,
    votes: [String]
});

var Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;