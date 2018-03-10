import React, {Component} from "react";

export default class SearchBox extends Component{
	constructor(props){
		super(props);
	}
	//escucha evento del input
	onEnterTag(evt){
		console.log(evt.target.value);
	
		if(evt.key=="Enter")
		{
			this.props.searchTag(evt.target.value);
			this.props.searchText(evt.target.value);
			console.log("hice el event 2")
		}
	}
	
	render(){
	return(
	<div>
		<div class = "container-fluid">
			<div class = "row">

				<div class = "col-sm">
					<div class="form-group"> 
						<label for="ip1" class="bmd-label-floating">Ingresa tu Tag</label>
						<input id="ip1" class="form-control" type="text"  onKeyPress={this.onEnterTag.bind(this)}/>
					</div>
				</div>

			</div>
		</div>
	</div>);
	}
}
