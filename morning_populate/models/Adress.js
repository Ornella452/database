const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adressShema = Schema({
    ID: Object,
    streetName:	String,
    streetNumber: String,
    postCode: String,
    city: String,
});

const AdressModel = mongoose.model('UserModel', adressShema);

module.exports = AdressModel;
