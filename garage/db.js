const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/garage', 
{useNewUrlParser: true,
    useUnifiedTopology: true
}
).catch(error => console.log(error));

const Car = new mongoose.Schema({
    brand:  String,
    model: String,
    year:  Number,
    created: Date
  });

  const VoitureModel = mongoose.model('Voiture', Car);

  VoitureModel.create({
    brand : "Renault",
    model : "Espace",
    year: 1999,
    created: "01/01/1997"

})