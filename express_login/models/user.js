const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  surname: String,
  email: String,
  password: {
   type: String,
   required: true,
   minlength: 8,
  },
  birthday: Date,

});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);

module.exports = User;