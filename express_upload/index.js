const express = require('express');
const app = express();
const PORT = 3001;
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const multer = require("multer");
mongoose.connect('mongodb://localhost:27017/upload',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).catch(error => console.log(error));




/// pour s'assuerer que le server est bien connecter 
mongoose.connection.on('connected', function () {
    console.log(`Database connection open to 
    ${mongoose.connection.host} ${mongoose.connection.name}`);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});
/////




app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {//
    res.render('home');
    //res.send('Welcome to express upload');
});

var storage = multer.diskStorage({//
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        console.log('file multer diskstorage', file);
         cb(null, file.originalname)
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, Date.now() + ext)
    }
})

var upload = multer({ storage: storage });



const UserShema = new mongoose.Schema({
    username: {
        type: [String],
        index: true
    },
    firstName: String,
    surname: String,
    profilePicture: String
});

const UserModel = mongoose.model('User', UserShema);



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.post('/upload', upload.single('image'), async (req, res, next) => {

  //  res.json(req.file);

    const usernames = req.body.UserName;
    const image = req.file.filename;

    
    const newUser = await UserModel.create({
        username: usernames,
        profilePicture: image,
    });

    console.log('newser', newUser)
    res.render("uploadded", {
        username: usernames,
        id: newUser._id
    });


});





app.get('/user/:id/', (req, res) => {
    let result = UserModel.findById(req.params.id, function (err, result) {
       
       res.render('userFinal', {
           userName: result.username,
           profilePicture: result.profilePicture,
        });

    });

 //  console.log('resultat du resultat lol', result)
});




app.listen(PORT, () => {//
    console.log(`Vous etes sur le prt ${PORT}`)
});

