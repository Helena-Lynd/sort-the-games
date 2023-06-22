import React, { Fragment, useState, useEffect } from 'react';
import './app-style.css';

function GameTile(props) {
	/* The index of the tile in the tile array */
	const index = props.index;
	/* The background color of the tile */
	const color = props.color;
	/* The box shadow values for the tile */
	const boxShadow = props.boxShadow;
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
		<div className="game-tile" style={{ left: left, top: height, backgroundColor: color, boxShadow: boxShadow }}>
			<p>{props.title}</p>
		</div>
	);
}

function Accordion(props) {
  const [isActive, setIsActive] = useState(false);
  //const color = props.color;

  return (
    <div className="accordion-item">
      <div className="accordion-title" /*style={{ backgroundColor: color }}*/ onClick={() => setIsActive(!isActive)}>
        <div>{props.title}</div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && <div className="accordion-content">{props.content}</div>}
    </div>
  );
};

function App() {
	/* Number of swaps left before the game ends */
	const [swapsLeft, setSwapsLeft] = useState(15);
	
	/* Number of themes found */
	const [themesFound, setThemesFound] = useState(0);
	
	/* Themes and Descriptions */
	const [theme1, setTheme1] = useState([]);
	const [theme2, setTheme2] = useState([]);
	const [theme3, setTheme3] = useState([]);
	const [theme4, setTheme4] = useState([]);
	
	/* An array containing the positions of each tile on the board */
	const [boxPositions, setBoxPositions] = useState([
		{ title: 'MAJORAS MASK', color: '#edeff1', boxShadow: '0px 10px #d5d7d9', attribute: 'Setting: Parallel World'},
		{ title: 'PERSONA 5', color: '#edeff1', boxShadow: '0px 10px #d5d7d9', attribute: 'Setting: Parallel World'},
		{ title: 'OUTER WILDS', color: '#edeff1', boxShadow: '0px 10px #d5d7d9', attribute: 'Main Character: Alien'},
		{ title: 'ODDWORLD', color: '#edeff1', boxShadow: '0px 10px #d5d7d9', attribute: 'Main Character: Alien'},
		{ title: 'KINGDOM HEARTS', color: '#edeff1', boxShadow: '0px 10px #d5d7d9', attribute: 'Setting: Parallel World'},
		{ title: 'UNDERTALE', color: '#edeff1', boxShadow: '0px 10px #d5d7d9', attribute: 'Setting: Parallel World'},
		{ title: 'ALIEN HOMINID', color: '#edeff1', boxShadow: '0px 10px #d5d7d9', attribute: 'Main Character: Alien'},
		{ title: 'RATCHET & CLANK', color: '#edeff1', boxShadow: '0px 10px #d5d7d9', attribute: 'Main Character: Alien'},
		{ title: '12 MINUTES', color: '#edeff1', boxShadow: '0px 10px #d5d7d9', attribute: 'Publisher: Netflix'},
		{ title: 'IMMORTALITY', color: '#edeff1', boxShadow: '0px 10px #d5d7d9', attribute: 'Publisher: Netflix'},
		{ title: 'DEATHLOOP', color: '#edeff1', boxShadow: '0px 10px #d5d7d9', attribute: 'Developer: Arkane'},
		{ title: 'DISHONORED', color: '#edeff1', boxShadow: '0px 10px #d5d7d9', attribute: 'Developer: Arkane'},
		{ title: 'MOONLIGHTER', color: '#edeff1', boxShadow: '0px 10px #d5d7d9', attribute: 'Publisher: Netflix'},
		{ title: 'OXENFREE', color: '#edeff1', boxShadow: '0px 10px #d5d7d9', attribute: 'Publisher: Netflix'},
		{ title: 'PREY', color: '#edeff1', boxShadow: '0px 10px #d5d7d9', attribute: 'Developer: Arkane'},
		{ title: 'REDFALL', color: '#edeff1', boxShadow: '0px 10px #d5d7d9', attribute: 'Developer: Arkane'},
	]);

	/* Saves the index of the dragged tile */
	const handleDragStart = (index) => (event) => {
		event.dataTransfer.setData('text/plain', index);
	};

	/* Handles the event of the dragged tile being dropped */
	const handleDrop = (index) => (event) => {
		/* Retreives the saved index of the tile being dragged */
		const draggedIndex = event.dataTransfer.getData('text/plain');
		/* Copy the boxPositions state */
		const updatedPositions = [...boxPositions];
		/* Find the content associated with the tile being dragged */
		const draggedBox = updatedPositions[draggedIndex];
		/* Swap the position of the dragged tile with the tile it is dropped on */
		updatedPositions[draggedIndex] = updatedPositions[index];
		updatedPositions[index] = draggedBox;
		/* Update the state of the game board */
		setBoxPositions(updatedPositions);
		
		/* Reduce number of swaps by 1. When this number hits 0, swapping is no longer enabled. */
		if (swapsLeft >= 1) {
			setSwapsLeft(swapsLeft-1);
		}
		
		/*
		{ title: 'Setting: Parallel World', content: 'Games set in a world much like the main characters, but darkly different.' }
		*/
	};

	/* Allows drag and drop functionality for the tiles */
	const handleDragOver = (event) => {
		event.preventDefault();
	};
	
	useEffect(() => {
		// Function to be executed when `boxPositions` has changed
		checkBoard();
	}, [boxPositions]);
	
	function checkBoard() {
		/* Check matches in row 1 */
		var firstTheme = boxPositions[0].attribute;
		var firstThemeCount = 1;
		var secondTheme;
		var secondThemeCount = 0;
		for (var i = 1; i < 4; i++) {
			if (boxPositions[i].attribute == firstTheme) {
				firstThemeCount++;
			} else if (secondThemeCount == 0) {
				secondTheme = boxPositions[i].attribute;
				secondThemeCount++;
			} else if (boxPositions[i].attribute == secondTheme) {
				secondThemeCount++;
			}
		}
		
		if (firstThemeCount == 4) {
			const updatedColors = [...boxPositions];
			for (var i=0; i<4; i++){
				updatedColors[i].color = '#45a3e5';
			}
			setBoxPositions(updatedColors);

			// WHY IS THIS JUST INSTA ADDING TO 5???
			if (themesFound < 5) {
				setThemesFound(themesFound+1);
			}
	
			if (theme1.length == 0) {
				var newTitle = 'Setting: Parallel World';
				var newContent = 'Games set in a world much like the main characters, but darkly different.';
				var newTheme = {title: newTitle, content: newContent}
				setTheme1(newTheme);
			}
		}
		/*
		if (theme2count == 3) {
			const updatedColors = [...boxPositions];
			for (var i=0; i<4; i++){
				updatedColors[i].color = '#45a3e5';
			}
			setBoxPositions(updatedColors);
		}
		*/
	}

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
						<GameTile title={box.title} index={index} color={box.color} boxShadow={box.boxShadow}/>
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
			<br/> <br/> <br/> <br/> <br/>
			
			<div className="accordion">
					<Accordion title={theme1.title} content={theme1.content} />
			</div>
			
			<div className="accordion">
				{theme2.map(({ title, content }) => (
					<Accordion title={title} content={content} />
				))}
			</div>
			
			<div className="accordion">
				{theme3.map(({ title, content }) => (
					<Accordion title={title} content={content} />
				))}
			</div>
			
			<div className="accordion">
				{theme4.map(({ title, content }) => (
					<Accordion title={title} content={content} />
				))}
			</div>
			
		</Fragment>
	);
}

export default App;