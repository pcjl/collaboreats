var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var restaurantSchema = new Schema({
    name: String,
    votes: [{
        type: Schema.Types.ObjectId,
        ref: 'Vote'
    }]
});

var Restaurant = mongoose.model('Restaurant', restaurantsSchema);
module.exports = Restaurant;
