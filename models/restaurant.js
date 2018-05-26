var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
    name: String,
    votes: [{
        type: Schema.Types.ObjectId,
        ref: 'Vote'
    }]
});

module.exports = mongoose.model('Restaurant', RestaurantsSchema);
