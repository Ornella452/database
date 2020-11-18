const mongoose = require('mongoose');
const express = require('express');
const app = express();
const User = require('./models/Students');
const adressModel = require('./models/Adress');
const Adress = require('./models/Adress');
const Students = require('./models/Students');

mongoose.connect('mongodb://localhost:27017/mongoose_populate',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).catch(error => console.log(error));

app.use(express.json())
// GET pour recuperer 
app.get('/', async (req, res) => {
   
    const students = await Students.find().populate('address')
    res.json(students)
    
})
app.post('/add/', async (req, res) => {

    try {

        //console.log(req.body) loger la party postman en json
        //const newAdress = new Adress(req.body.adress);
        // la syntaxe d'en bas c'est pareil que mettre à chaque attribut déclarer de mettre req.body.adress.leurs noms d'attributt
        const { streetName, streetNumber, postCode, city } = req.body.adress
        const newAddress = new Adress({
            // "nom d'attribut"
            streetName,
            streetNumber,
            postCode,
            city
        });
        const newAddressAdded = await newAddress.save();
        console.log("result adress", newAddress);


        const { firstName, surname } = req.body.student
        const newStudents = new Students({
            // "nom d'attribut"
            firstName,
            surname,
            address: newAddressAdded._id,
        });
        await newStudents.save();
        // pour le derner pas besoin de le stocker dans une const , à ajouter si jai besoin loger
        res.json("ok");

    } catch (error) {

        console.log(error);
        res.status(400).json('error')

    }


})


const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port  ${port}`)
})