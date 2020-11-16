const mongoose = require('mongoose')
const studentsModel = require('./models/Students');
const adressModel = require('./models/Adress');

mongoose.connect('mongodb://localhost:27017/mongoose_populate',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).catch(error => console.log(error));