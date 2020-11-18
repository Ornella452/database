const mongoose = require('mongoose');


const StudentShema = new mongoose.Schema({
    firstName: String,
    surname	: String,
    address: {
        type: mongoose.Types.ObjectId,
        ref : "Adress",
    },
});

module.exports = new mongoose.model('Students', StudentShema);




