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
  
  VoitureModel.update({year:2000}, function (err, result) { 
    if (err){ 
        console.log(err) 
    }else{ 
        console.log("Result :", result)  
    } 
}); 


