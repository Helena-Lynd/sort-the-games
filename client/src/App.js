import React, { Fragment, useState } from 'react';
import './app-style.css';

function GameTile(props) {
	/* The index of the tile in the tile array */
	const index = props.index;
	/* The background color of the tile */
	const color = props.color;
	/* The leftward positioning of the tile */
	var left;
	/* The height of the tile */
	var height;
	
	/* Determines what row a tile should display in */
	if (index < 4) {
		height = '30px';
	} else if (index < 8) {
		height = '60px';
	} else if (index < 12) {
		height = '90px';
	} else {
		height = '120px';
	}
	
	/* Determines what column a tile should display in */
	if (index == 0 || index == 4 || index == 8 || index == 12) {
		left = '535px';
	} else if (index == 1 || index == 5 || index == 9 || index == 13) {
		left = '555px';
	} else if (index == 2 || index == 6 || index == 10 || index == 14) {
		left = '575px';
	} else {
		left = '595px';
	}
	
	return (
		<div className="game-tile" style={{ left: left, top: height, backgroundColor: color }}>
			<p>{props.title}</p>
		</div>
	);
}

function App() {
	/* Number of swaps left before the game ends */
	const [swapsLeft, setSwapsLeft] = useState(15);
	
	/* Number of themes found */
	const [themesFound, setThemesFound] = useState(0);
	
	/* An array containing the positions of each tile on the board */
	const [boxPositions, setBoxPositions] = useState([
		{ title: 'GAME1', color: '#edeff1', attribute: 'theme'},
		{ title: 'GAME2', color: '#edeff1', attribute: 'theme'},
		{ title: 'GAME3', color: '#edeff1', attribute: 'actor'},
		{ title: 'GAME4', color: '#edeff1', attribute: 'actor'},
		{ title: 'GAME5', color: '#edeff1', attribute: 'theme'},
		{ title: 'GAME6', color: '#edeff1', attribute: 'theme'},
		{ title: 'GAME7', color: '#edeff1', attribute: 'actor'},
		{ title: 'GAME8', color: '#edeff1', attribute: 'actor'},
		{ title: 'GAME9', color: '#edeff1', attribute: 'developer'},
		{ title: 'GAME10', color: '#edeff1', attribute: 'developer'},
		{ title: 'GAME11', color: '#edeff1', attribute: 'publisher'},
		{ title: 'GAME12', color: '#edeff1', attribute: 'publisher'},
		{ title: 'GAME13', color: '#edeff1', attribute: 'developer'},
		{ title: 'GAME14', color: '#edeff1', attribute: 'developer'},
		{ title: 'GAME15', color: '#edeff1', attribute: 'publisher'},
		{ title: 'GAME16', color: '#edeff1', attribute: 'publisher'},
	]);

	/* fill in */
	const handleDragStart = (index) => (event) => {
		event.dataTransfer.setData('text/plain', index);
	};

	/* fill in */
	const handleDrop = (index) => (event) => {
		const draggedIndex = event.dataTransfer.getData('text/plain');
		const updatedPositions = [...boxPositions];
		const draggedBox = updatedPositions[draggedIndex];
		updatedPositions[draggedIndex] = updatedPositions[index];
		updatedPositions[index] = draggedBox;
		setBoxPositions(updatedPositions);
		
		/* Update swaps left */
		if (swapsLeft >= 1) {
			setSwapsLeft(swapsLeft-1);
		}
		
		/*
		if (boxPositions[0].title === 'GAME1' && boxPositions[1].title === 'GAME2' && boxPositions[2].title === 'GAME3' && boxPositions[3].title === 'GAME4') {
			const updatedColors = boxPositions.map((box) => {
				if (box.title === 'GAME1' || box.title === 'GAME2' || box.title === 'GAME3' || box.title === 'GAME4') {
					return { ...box, color: '#45a3e5' };
				}
				return box;
			});
			setBoxPositions(updatedColors);
			setThemesFound(themesFound + 1);
		}
		*/
		
		/* Check row 1 
		var currentAttribute = boxPositions[0].attribute;
		var sharedAttribute = 1;
		for (var i=1; i<4; i++){
			if (boxPositions[i].attribute == currentAttribute) {
				sharedAttribute += 1;
			}
		}
		if (sharedAttribute == 4) {
			const updatedColors = [...boxPositions];
			for (var i=0; i<4; i++){
				updatedColors[i].color = '#45a3e5';
			}
			setBoxPositions(updatedColors);
			setThemesFound(themesFound+1);
		}
		*/
	};

	/* fill in */
	const handleDragOver = (event) => {
		event.preventDefault();
	};

	return (
		<Fragment>
			<div className="title">
				<span className="title-first-word">SORT</span>
				<span className="title-second-word">THE</span>
				<span className="title-third-word">GAMEDLE</span>
			</div>
			
			<div className="grid-container">
				{boxPositions.map((box, index) => (
					<div
					key={index}
					draggable={swapsLeft > 0 ? 'true' : 'false'}
					onDragStart={handleDragStart(index)}
					onDrop={handleDrop(index)}
					onDragOver={handleDragOver}
					style={{ flex: '0.1'}}
					>
						<GameTile title={box.title} index={index} color={box.color}/>
					</div>
				))}
			</div>

			<div style={{ display: 'flex' }}>
				<div className="games-found">
					<p>Themes: {themesFound}/5 </p>
				</div>

				<div className="swaps-left">
					<p>Swaps Left: {swapsLeft} </p>
				</div>
			</div>
		</Fragment>
	);
}

export default App;