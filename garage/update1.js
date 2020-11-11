const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/garage',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).catch(error => console.log(error));

const Car = new mongoose.Schema({
    brand: String,
    model: String,
    year: Number,
    created: Date
});

const VoitureModel = mongoose.model('Voiture', Car);
/*
VoitureModel.update({year:2020}, function (err, result) { 
  if (err){ 
      console.log(err) 
  }else{ 
      console.log("Result :", result)  
  } 
}); 
*/

/// pour modifier quelque chose en spécifiant la donnée qu'on veut modifier grace l'id
VoitureModel.findByIdAndUpdate("5fab072d2046723efc495d55", { year: 2020 },
    function (err, docs) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("Updated User : ", docs);
        }
    });





