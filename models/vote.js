var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VoteSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Vote', VoteSchema);
