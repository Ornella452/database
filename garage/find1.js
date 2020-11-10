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

const _id = "5faaf7bc78089118dcc64caf"

VoitureModel.findById(_id, function (err, docs) { 
    if (err){ 
        console.log(err); 
    } 
    else{ 
        console.log("Result : ", docs); 
    } 
}); 