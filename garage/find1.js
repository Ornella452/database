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


// 2 eme methode avec mode await
/*
async function CarAsync(){
    
    try {
    
        const result = await VoitureModel.findById("5fab072d2046723efc495d55").exec()
            console.log(result)
           // return Promise.resolve(result)
        } catch (err) {
            console.log(err)
            //return Promise.reject(err)
         }
    }console.log(CarAsync())

*/
   