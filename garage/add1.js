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

  const voiture1 = new VoitureModel({
    brand: "Renault",
    model: "Scnénic",
    year: 2004
  });voiture1.save().then(res => console.log(res))
  
  const voiture2 = new VoitureModel({
    brand: "Peugeot",
    model: "308",
    year: 2017
  }); voiture2.save().then(res => console.log(res))

  