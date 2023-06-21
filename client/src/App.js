import React, { Fragment, useState }  from 'react';
import './app-style.css';

function GameTile(props) {
	const left = props.left;
	const height = props.height;
	
	return (
		<div className="game-tile" style={{left: left, top: height }}>
			<p>{props.title}</p>
		</div>
	);
}

function App() {  
	return (
		<Fragment>
			<div className="title">
				<span className="title-first-word">SORT</span>
				<span className="title-second-word">THE</span>
				<span className="title-third-word">GAMEDLE</span>
			</div>
      
			<div draggable="true" style={{ display: 'flex' }}>
				<span> <GameTile title='GAME' left='545px' height='40px'/> </span>
				<span> <GameTile title='GAME' left='565px' height='40px'/> </span>
				<span> <GameTile title='GAME' left='585px' height='40px'/> </span>
				<span> <GameTile title='GAME' left='605px' height='40px'/> </span>
			</div>
		</Fragment>
	);
}

export default App;