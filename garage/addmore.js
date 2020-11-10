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
    
  });

  const VoitureModel = mongoose.model('Voiture', Car);

  VoitureModel.insertMany([ 
    { brand: 'Aston Martin', model: "DB9", year: 2010}, 
    { brand: 'Range Rover', model: "Discovery Sport", year: 2017}, 
   
]).then(res => console.log(res,"Data inserted"))  // Success 
.catch(error => console.log(error)); 