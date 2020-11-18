const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adressShema = new Schema({
    streetName:	String,
    streetNumber: String,
    postCode: String,
    city: String,
});

module.exports = new mongoose.model('Adress', adressShema);


