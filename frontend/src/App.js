import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">App con React y Node</h1>
				</header>
				<p className="App-intro">
					Recuerde que en este momento la app corre el archivo estatico que esta en build de React.
				</p>
			
				<div> 
					<p className="App-intro">
						By Esneider Velandia G.
					</p>
				</div>
			
			</div>
			
			);
	}
}

export default App;
