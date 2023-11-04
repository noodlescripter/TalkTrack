const mongo = require('mongoose');

const Schema = mongo.Schema;

const MyData = new Schema({
    storedData:{type: String},
    iden: {type: String}
});

module.exports = mongo.model('MyData', MyData);
