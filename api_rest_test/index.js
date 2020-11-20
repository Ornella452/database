const mongoose = require('mongoose');
const express = require('express');
const app = express();
const Reseaux = require('./models/Reseaux');
const Donnee = require('./models/donee5g.json')


mongoose.connect('mongodb://localhost:27017/5G',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).catch(error => console.log(error));

app.use(express.json())
// GET pour recuperer 
app.get('/api_5g', (req, res) => {
   
   res.status(200).json(Donnee)
})

app.get('/api_5g/:id', (req,res) => {
    const i = req.params.id
    const result = Donnee.find(rest => rest.i === i)
    res.status(200).json(result)
})





// si je veux ajouter et enregistrer la bd à partir de postman
app.post('/donnee5g', async (req, res) => {

    try {

        const {id, operateur, ville, adr, loc, date, modif, cp} = req.body
    const newDonnee = new Reseaux({
        // "nom d'attribut"
        id,
        operateur,
        ville,
        adr,
        loc,
        date,
        modif,
        cp
    });
    const newDonneeAdded = await newDonnee.save(Donnee);
    console.log("result 5g", newDonneeAdded);
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