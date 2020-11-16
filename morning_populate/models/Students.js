const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentShema = Schema({
    ID:	Object,
    firstName: String,
    surname	: String,
    address: Object,
});

const UserModel = mongoose.model('UserModel', StudentShema);

module.exports = UserModel;