const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Reseaux = new Schema({
    id: Number,
    operateur:String,
    ville:String,
    adr:String,
    loc: [Number],
    date:String,
    modif:String,
    cp:String
});

module.exports = new mongoose.model('Reseaux', Reseaux);


