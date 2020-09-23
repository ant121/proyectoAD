const express = require('express');
const morgan = require('morgan');
const body_parser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://ant121:AD17198anto@cluster0.pod3w.mongodb.net/proyectoad?retryWrites=true&w=majority";


const app = express();
app.use(body_parser.json());

MongoClient.connect(url);

//Settings
app.set('port', process.env.PORT || 3000);
//Middlewares
app.use(morgan('dev'));
//Routes
app.use('/doctors' , require('./routes/doctors'));
//Static files
app.use(express.static(__dirname + '/public'));

//Server levantado
app.listen(3000, () => {
    console.log('Server on port 3000', app.get('port'));
});