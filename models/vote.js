var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var VoteSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Vote', VoteSchema);
