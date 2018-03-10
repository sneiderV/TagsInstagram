var express = require('express');
var router = express.Router();
const fetch= require("node-fetch");
// const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

let NumFotosTag = 0;
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

//saco las fotos de los tags
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
    	 	//console.log(json);
    	 	//tengo la lista copn el Top de fotos con ese Tag 
    	 	//console.log(">>>>>Se tiene x fotos:  X= json.graphql.hashtag.edge_hashtag_to_top_posts.edges.lenght");
    	 	NumFotosTag = json.graphql.hashtag.edge_hashtag_to_top_posts.edges.length;
    	 	console.log(">>>>>>>>> LA FOTO TIENE "+NumFotosTag+" NUMERO DE FOTOS: ");
    	 	return res.send(json.graphql.hashtag.edge_hashtag_to_top_posts.edges);
			//debo devolver los datos
    	 	// this.setState({
          	// repos:json.data
          	// });
			});
});

//junto todos los text
router.get("/getTagsAll/:tag", function (req,res,next) {
    
    fetch("https://www.instagram.com/explore/tags/"+req.params.tag+"/?__a=1")
       .then( resp => { 
                if(resp.ok) {
                  return resp.json();
                }
              })
       .then( (json)=> {
        //NumFotosTag = json.graphql.hashtag.edge_hashtag_to_top_posts.edges.length;
        
        tagss = json.graphql.hashtag.edge_hashtag_to_top_posts.edges;
        var tods=" hola ";
        tagss.forEach(function(e){
          tods+=" "+(e.node.edge_media_to_caption.edges[0].node.text).toString()+" ";
        });
        // const jsson = {string:+tods}
        console.log(">>>>TODOS juntos !");
        return res.json({string: tods});
      });
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
