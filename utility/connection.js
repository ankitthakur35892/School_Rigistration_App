const mongoose = require('mongoose');
const connection=mongoose.connect('mongodb://localhost:27017/test1', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    .then((result) => {
        console.log('connected successfully');
    })
    .catch((err) => {
        console.log(err);
    });

