const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const url = "mongodb+srv://ant121:AD17198anto@cluster0.pod3w.mongodb.net/proyectoad?retryWrites=true&w=majority";

router.get('/', async (req, res) =>{
  MongoClient.connect(url, function(err, db) {
     if (err) throw err;
     var dbo = db.db("proyectoad");
     dbo.collection("doctores").find({}).toArray(function(err, result) {
       if (err) throw err;
       res.status(200).json(result);
       db.close();
     });
   });
});

router.get('/:id', async (req, res) =>{
 MongoClient.connect(url, function(err, db) {
   if (err) throw err;
   var dbo = db.db("proyectoad");
   dbo.collection("doctores").findOne({ _id: ObjectId(req.params.id)}, function(err, result) {
     if (err) throw err;
     res.status(200).json(result);
     db.close();
   });
 });
});


router.post('/', async (req, res) =>{
 const {nombre, apellido, hospital, especialidad, direccion, telefono, sala} = req.body;
 if(nombre == null || apellido == null|| hospital == null|| especialidad == null|| direccion == null|| telefono == null|| sala== null){
    res.status(500).json({error: 'Es necesario tener los campos nombre, apellido, hospital, especialidad, direccion, telefono y sala en el JSON'});
  }else{
   MongoClient.connect(url, function(err, db) {
     if (err) throw err;
     var dbo = db.db("proyectoad");
     const data = req.body;
     dbo.collection("doctores").insertOne(data, function(err, res) {
       if (err) throw err;
       db.close();
     });
   });
   res.status(200).json({success: 'Los datos fueron agregados correctamente'});
  }
});


router.put('/:id', async (req, res) =>{
 const {nombre, apellido, hospital, especialidad, direccion, telefono, sala} = req.body;
 if(nombre == null || apellido == null|| hospital == null|| especialidad == null|| direccion == null|| telefono == null|| sala== null){
    res.status(500).json({error: 'Es necesario tener los campos nombre, apellido, hospital, especialidad, direccion, telefono y sala en el JSON'});
  }else{
     MongoClient.connect(url, function(err, db) {
       if (err) throw err;
       var dbo = db.db("proyectoad");
       var myquery = { _id: ObjectId(req.params.id)};
       var newvalues = { $set: {nombre: nombre, apellido: apellido, hospital: hospital, especialidad: especialidad, direccion: direccion, telefono: telefono, sala: sala}};
       dbo.collection("doctores").updateOne(myquery, newvalues, function(err, res) {
         if (err) throw err;
         db.close();
       });
     });
   res.status(200).json({success: 'Los datos fueron agregados correctamente'});
  }
});


router.delete('/:id', async (req, res) =>{
 MongoClient.connect(url, function(err, db) {
   if (err) throw err;
   var dbo = db.db("proyectoad");
   var myquery = { _id: ObjectId(req.params.id)};
   dbo.collection("doctores").deleteOne(myquery, function(err, obj) {
     if (err) throw err;
     db.close();
   });
 });
 res.status(200).json({success: 'Los datos fueron eliminados correctamente'})
});


module.exports = router;