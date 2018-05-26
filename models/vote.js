var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var voteSchema = new Schema({
    name: String
});

var Vote = mongoose.model('Vote', voteSchema);
module.exports = Vote;
