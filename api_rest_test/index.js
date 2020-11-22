const mongoose = require('mongoose');
const express = require('express');
const app = express();
const Reseaux = require('./models/Reseaux');
const Donnee = require('./models/donee5g')
const cors = require('cors')

mongoose.connect('mongodb://localhost:27017/5G',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).catch(error => console.log(error));
app.use(cors())
app.use(express.json())

// GET pour recuperer afficher tout mon fichier json => tester => ok il marche
app.get('/api_5g', async (req, res) => {
    //res.status(200).json(Donnee)
    try {
        const resultat = await Reseaux.find();
        res.json(resultat)

    } catch (error) {
        console.log(error);
        res.status(400).json('message : error')
    }

})

////// pour recuperer un id spécial => tester => ok il marche /////
app.get('/api_5g:id', async (req, res) => {
    try {
       const resultatId = await Reseaux.findById(req.params.id)
       res.json(resultatId)
    } catch (error) {

        console.log(error);
        res.status(400).json('message : error')
    }
})

// si je veux ajouter et enregistrer la bd à partir de postman
app.post('/api_5g', async (req, res) => {
    try {
        Reseaux.create(req.body.antennes)
        //res.json(req.body);
        res.status(400).json('bravo')
        const newRes = new Reseaux(req.body.antennes);
        await newRes.save;  
    }
    catch (error) {

        console.log(error);
        res.status(400).json('error')
    }
})


/////////////// si je veux supprimer un objet en particuliuer => tester => ok il marche 
app.delete('/api_5g/:id', async (req, res) => {
    try {
       const resultatRemove = await Reseaux.remove({_id: req.params.id})
       res.json(resultatRemove)
    } catch (error) {

        console.log(error);
        res.status(400).json('message : error')
    }
})

////////////// pour modifier la valeur d'une des clés proposer

app.patch('/api_5g/:id', async (req, res) => {
    const { operateur, ville, adr, loc, date, modif, cp } = req.body
    try {
       const resultatRemove = await Reseaux.updateOne({_id: req.params.id}, {$set: {operateur,
        ville,
        adr,
        loc,
        date,
        modif,
        cp}})
       res.json(resultatRemove)
    } catch (error) {

        console.log(error);
        res.status(400).json('message : error')
    }
})


//// post pour faire que un seule 

// app.post('/', async (req, res) => {

  // const { _id, operateur, ville, adr, loc, date, modif, cp } = req.body
    // const newDonnee = new Reseaux({
    //     // "nom d'attribut"
    //     _id,
    //     operateur,
    //     ville,
    //     adr,
    //     loc,
    //     date,
    //     modif,
    //     cp
    // });
    // try {

    //     const newDonneeAdded = await newDonnee.save();
    //     console.log("result 5g", newDonneeAdded);
    //     res.json("ok")

    // } catch (error) {

    //     console.log(error);
    //     res.status(400).json('error')
    // }
// })

////// le port 
const port = 3000;

app.listen(port, () => {
    console.log(`Server started on port  ${port}`)
})

// fetch('http://localhost:3000/api_5g').then(result => {
//   return result.json();
// }).then(data => {
//   console.log(data)
// });


