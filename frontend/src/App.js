import React, { Component } from "react";
import "./App.css";
import SearchBox from "./SearchBox.js"

class App extends Component {
	
	constructor(props){
    super(props);
    this.state ={
      listaTags:[],
      listaFotos:[],
      searchTag : "",
      searchText : "",
      listaTodos: ""
    }
  }

//atiendo la solicitud del tag a buscar
 searchTag(_tag){
    this.setState( {searchTag : _tag} );
  	fetch("/getTags/"+_tag)
 		.then( (res)=> {
			if(res.ok)
      		{
        		return res.json();
      		}
		})
		.then((_res)=>{
			this.setState({
				listaFotos: _res,
				listaTags:_res,
				listaTodos:_res
			});

			console.log(">>>listaFotos ESTADO= "+this.state.listaFotos);
			console.log(">>>listaFotos TODOS= "+this.state.listaTodos);
		});
  }

 searchText(_tag){
    this.setState( {searchText : _tag} );
  	fetch("/getTagsAll/"+_tag)
 		.then( (res)=> {
			if(res.ok)
      		{
        		return res;
      		}
		})
		.then((_res)=>{
			this.setState({
				listaTodos:_res
			});
		});
		
  }

//busco las palabras que tienen # y retorno UN OBJETO con el conteo de cada #Tag
splitTags(text){
  var x = {};
 // console.log(">>>texto para splitear "+this.state.searchText)
  for(let w of text.split(" "))
    {
      if(w.startsWith("#")){
           //x.push(w);
        if(!(w in x))
          {
            x[w]=1;
          }
        else{
          x[w]+=1;
        }
      }
    }
  return x;
}

//convierto el objeto en un arreglo de objetos donde cada objeto es un #tag con su respectiva cuenta
toArrayTags(obj){
  let ltags = []
  for(let ho in obj )
    {
      ltags.push({
        tag: ho,
        count: obj[ho]
      });
    }
 //eturn ltags;
  ltags.sort(function(a,b){
    return b.count - a.count;})
  return ltags
  console.log(">>>>esta es la lista ordenada: "+ltags);
}

//trato de anidar los textos para hacer los dos metodos de arriba
textAll(tagss){
		//ntagss = json.graphql.hashtag.edge_hashtag_to_top_posts.edges;
        var tods=" hola ";
        tagss.forEach(function(e){
          tods+=" "+(e.node.edge_media_to_caption.edges[0].node.text).toString()+" ";
        });	
        console.log(tods);
        return tods
}
//improviso la muestra de datos
darData(lista)
{
	var todos = "";
  lista.forEach(function(e)
    {
      //console.log(e);
      todos += " --cuenta: ".concat(e.count, " tag: " , e.tag, " --");
    });
  return todos;
}
//lo que actualizo cuando cambia de estado mi variable searchTag
	render() {
		return (
			<div className="container card contaColor">
			<div className="App">
				<header className="App-header"></header>
			<div className="container-fluid">	
				<div></div>
				<div></div>	
				<div >
					<SearchBox searchText={this.searchText.bind(this)}
							   searchTag={this.searchTag.bind(this)}
							    />
				</div>
				<div></div>
				<div></div>
				<div></div>
				</div>

				<div className="row">	
					<div className="col-3">
					<div className="card">
					<div className="card-body">
					 {
					 	//this.toArrayTags(this.splitTags(this.textAll(this.state.listaTodos))) 
						this.state.listaFotos.map((t)=>{
							return (
										<p>
										{this.darData(this.toArrayTags(this.splitTags(t.node.edge_media_to_caption.edges[0].node.text)))}
										</p>
										//this.splitText(te.node.edge_media_to_caption.edges[0].node.text)
										//{console.log("entre")}
									)
								})
					 	
					 }	
					 </div>										
					</div>
					</div>
					<div className="col">
					
						{ 
						 this.state.listaFotos.map((f)=>{
							return (
										<img src={f.node.thumbnail_resources[2].src}/>
									);
								})
							}		
					</div>
				</div>
				<div>
					<p className="App-intro">
						By Esneider Velandia G.
					</p>
				</div>
			
			</div>
			</div>	

		
			);
	}
}

export default App;
