var express = require('express');
var router = express.Router();
const fetch= require("node-fetch");
// const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// // Connection URL
// const url = 'mongodb://localhost:27017';

// // Database Name
// const dbName = 'myproject';

// // Use connect method to connect to the server
// MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);

//   client.close();
// });

router.get("/getTags/:tag", function (req,res,next) {
    
    console.log("Este es el tag a buscar: " + req.params.tag);
    //OJO: estoy haciendo prueba con tag=cat para mirar el json que retorna cambiar por el  tag
    //que entra por parametro. "https://www.instagram.com/explore/tags/cat/?__a=1"
    fetch("https://www.instagram.com/explore/tags/"+req.params.tag+"/?__a=1")
    	 .then( resp => { 
                //si lo datos que me llegan estan bien los retorno como un JSON
                if(resp.ok) {
                  return resp.json();
                }
              })
    	 .then( (json)=> {
    	 	console.log(json);
    	 	return res.send(json);
			//debo devolver los datos
    	 	// this.setState({
          	// repos:json.data
          	// });
			});
 


});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
