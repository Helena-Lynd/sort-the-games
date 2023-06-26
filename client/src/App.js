import React, { Fragment, useState, useRef } from 'react';
import './app-style.css';
import GameTile from './components/GameTile.js';
import Accordion from './components/Accordion.js';

/**
 * Determines how many tiles of a similar kind are lined up
 * 
 * @param {int} start	 		: the index of the starting tile in the gameboard array
 * @param {int} end   			: the index of the ending tile in the gameboard array
 * @param {int} increment 		: the amount to increment each iteration. 1 for rows, 4 for columns
 * @param {array} updatedBoard 	: the updated game board 
 */
function attributeMatch(start, end, increment, updatedBoard) {
	// The attribute of the first tile, and the number of tiles in the line that share that attribute
	let firstTheme = updatedBoard[start].attribute;
	let firstThemeCount = 1;
	
	// The attribute of the second tile, and the number of tiles in the line that share that attribute
	let secondTheme;
	let secondThemeCount = 0;
	
	// Loop through the row or column and add to the theme counts declared above accordingly
	for (let i = start + increment; i < end + 1; i += increment) {
		if (updatedBoard[i].attribute === firstTheme) {
			firstThemeCount++;
		} else if (secondThemeCount === 0) {
			secondTheme = updatedBoard[i].attribute;
			secondThemeCount++;
		} else if (updatedBoard[i].attribute === secondTheme) {
			secondThemeCount++;
		}
	}
	return [firstTheme, firstThemeCount, secondTheme, secondThemeCount]
}



function App() {
	// Number of swaps left before the game ends
	const [swapsLeft, setSwapsLeft] = useState(100);
	
	// Number of themes found, a state variable so the themes found will render appropriately
	const [themesFound, setThemesFound] = useState(0);
	
	// Number of themes found, a reference variable for accurate logic when rendering
	const themesFoundVar = useRef(0);
	
	// Themes and Descriptions, state variables so that accordions will render appropriately
	const [theme1, setTheme1] = useState([]);
	const [theme2, setTheme2] = useState([]);
	const [theme3, setTheme3] = useState([]);
	const [theme4, setTheme4] = useState([]);
	
	// Themes and Descriptions, reference variables so that they will update immediately for render logic
	const theme1Var = useRef([]);
	const theme2Var = useRef([]);
	const theme3Var = useRef([]);
	const theme4Var = useRef([]);

	// Theme colors (for tiles, drop shadows, and accordions)
	const theme1Color = '#45a3e5';
	const theme1BackgroundColor = '#2975ab';
	const theme2Color = '#ff3355';
	const theme2BackgroundColor = '#db1f3e';
	const theme3Color = '#864cbf';
	const theme3BackgroundColor = '#5f2f8f';
	const theme4Color = '#f0721f';
	const theme4BackgroundColor = '#c25208';
	
	// An array containing the positions of each tile on the board
	const [gameBoard, setGameBoard] = useState([
		{ title: 'MAJORAS MASK',	attribute: 'Setting: Parallel World', 	color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
		{ title: 'PERSONA 5', 		attribute: 'Setting: Parallel World',	color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
		{ title: 'OUTER WILDS', 	attribute: 'Main Character: Alien', 	color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
		{ title: 'ODDWORLD', 		attribute: 'Main Character: Alien', 	color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
		{ title: 'KINGDOM HEARTS', 	attribute: 'Setting: Parallel World', 	color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
		{ title: 'UNDERTALE',		attribute: 'Setting: Parallel World',  	color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
		{ title: 'ALIEN HOMINID', 	attribute: 'Main Character: Alien', 	color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
		{ title: 'RATCHET & CLANK', attribute: 'Main Character: Alien', 	color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
		{ title: '12 MINUTES', 		attribute: 'Publisher: Netflix', 		color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
		{ title: 'IMMORTALITY', 	attribute: 'Publisher: Netflix', 		color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
		{ title: 'DEATHLOOP', 		attribute: 'Developer: Arkane', 		color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
		{ title: 'DISHONORED',		attribute: 'Developer: Arkane', 		color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
		{ title: 'MOONLIGHTER', 	attribute: 'Publisher: Netflix',		color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
		{ title: 'OXENFREE', 		attribute: 'Publisher: Netflix', 		color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
		{ title: 'PREY', 			attribute: 'Developer: Arkane', 		color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
		{ title: 'REDFALL', 		attribute: 'Developer: Arkane', 		color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
	]);

	// Saves the index of the dragged tile
	const handleDragStart = (index) => (event) => {
		event.dataTransfer.setData('text/plain', index);
	};

	// Handles the event of the dragged tile being dropped
	const handleDrop = (index) => (event) => {
		// Retreives the saved index of the tile being dragged 
		const draggedIndex = event.dataTransfer.getData('text/plain');
		// Copy the gameBoard state 
		const updatedBoard = [...gameBoard];
		// Find the content associated with the tile being dragged
		const draggedBox = updatedBoard[draggedIndex];
		// Swap the position of the dragged tile with the tile it is dropped on
		updatedBoard[draggedIndex] = updatedBoard[index];
		updatedBoard[index] = draggedBox;
		// Update the state of the game board
		setGameBoard(updatedBoard);
		
		// Reduce number of swaps by 1. When this number hits 0, swapping is no longer enabled
		if (swapsLeft >= 1) {
			setSwapsLeft(swapsLeft-1);
		}
		
		// Check the board for matches, using the updated positions
		checkBoard(updatedBoard);
	};

	// Allows drag and drop functionality for the tiles
	const handleDragOver = (event) => {
		event.preventDefault();
	};
	
	/**
	* High level function that checks every row and column in the board
	*
	* @param {array} updatedBoard : the updated game board
	*/
	function checkBoard(updatedBoard) {
		checkLine(0, 3, 1, updatedBoard, false);
		checkLine(4, 7, 1, updatedBoard, false);
		checkLine(8, 11, 1, updatedBoard, false);
		const newRowPositions = checkLine(12, 15, 1, updatedBoard, false);
		checkLine(0, 12, 4, newRowPositions, true);
		checkLine(1, 13, 4, newRowPositions, true);
		checkLine(2, 14, 4, newRowPositions, true);
		checkLine(3, 15, 4, newRowPositions, true);
	}
	
	/**
	 * Determines if there is a line of matching tiles and updates colors accordingly
	 * 
	 * @param {int} start	 		: the index of the starting tile in the gameboard array
	 * @param {int} end   			: the index of the ending tile in the gameboard array
	 * @param {int} increment 		: the amount to increment each iteration. 1 for rows, 4 for columns
	 * @param {array} updatedBoard 	: the updated game board 
	 * @param {boolean} column		: true if a column is being checked, false if a row is being checked
	*/
	function checkLine(start, end, increment, updatedBoard, column) {
		// Shallow copy of the updatedBoard
		let modifyUpdatedBoard = [...updatedBoard];
		
		// Determine how many of a type of tile are in a line
		let values = attributeMatch(start, end, increment, modifyUpdatedBoard);
		
		// The attribute of the first tile, and the number of tiles in the line that share that attribute
		let firstTheme = values[0];
		let firstThemeCount = values[1];
	
		// The attribute of the second tile, and the number of tiles in the line that share that attribute
		let secondTheme = values[2];
		let secondThemeCount = values[3];

		if (firstThemeCount === 4) {
			if (firstTheme !== theme1Var.current[0] && firstTheme !== theme2Var.current[0] && firstTheme !== theme3Var.current[0] && firstTheme !== theme4Var.current[0]) {
				modifyUpdatedBoard = lineOfFour(start, end, increment, modifyUpdatedBoard)
			}
		} else if (firstThemeCount === 3 || secondThemeCount === 3) {
			let whichTheme;
			if (firstThemeCount === 3) {
				whichTheme = firstTheme;
			} else {
				whichTheme = secondTheme;
			}
			modifyUpdatedBoard = lineOfThree(start, end, increment, modifyUpdatedBoard, whichTheme, column)
		} else {			
			modifyUpdatedBoard = noMatches(start, end, increment, modifyUpdatedBoard, column);
		}
		return modifyUpdatedBoard;
	}
	
	/**
	 * Updates the color and themes of a line of four tiles
	 * 
	 * @param {int} start	 				: the index of the starting tile in the gameboard array
	 * @param {int} end   					: the index of the ending tile in the gameboard array
	 * @param {int} increment 				: the amount to increment each iteration. 1 for rows, 4 for columns
	 * @param {array} modifyUpdatedBoard 	: the updated game board 
	*/
	function lineOfFour (start, end, increment, modifyUpdatedBoard) {
		// The color and background color to make the tile
		let color;
		let bgColor;

		// The title and content of the game tile, to use for updating an accordion
		let newTitle = modifyUpdatedBoard[start].attribute;
		let newContent = modifyUpdatedBoard[start].title;

		if (theme1Var.current.length === 0) {
			// Update color and bgColor so that the tiles can be updated to the correct color
			color = theme1Color;
			bgColor = theme1BackgroundColor;
		
			// Update theme1 variables with the updated content
			let newTheme = {title: newTitle, content: newContent, color: theme1Color, bgColor: theme1BackgroundColor}
			setTheme1(newTheme);
			theme1Var.current = [newTitle, newContent, theme1Color, theme1BackgroundColor];
		
		} else if (theme2Var.current.length === 0) {
			// Update color and bgColor so that the tiles can be updated to the correct color
			color = theme2Color;
			bgColor = theme2BackgroundColor;
		
			// Update theme2 variables with the updated content
			let newTheme = {title: newTitle, content: newContent, color: theme2Color, bgColor: theme2BackgroundColor}
			setTheme2(newTheme);
			theme2Var.current = [newTitle, newContent, theme2Color, theme2BackgroundColor];
		
		} else if (theme3Var.current.length === 0) {
			// Update color and bgColor so that the tiles can be updated to the correct color
			color = theme3Color;
			bgColor = theme3BackgroundColor;
		
			// Update theme3 variables with the updated content
			let newTheme = {title: newTitle, content: newContent, color: theme3Color, bgColor: theme3BackgroundColor}
			setTheme3(newTheme);
			theme3Var.current = [newTitle, newContent, theme3Color, theme3BackgroundColor];
		
		} else if (theme4Var.current.length === 0) {
			// Update color and bgColor so that the tiles can be updated to the correct color
			color = theme4Color;
			bgColor = theme4BackgroundColor;
		
			// Update theme4 variables with the updated content
			let newTheme = {title: newTitle, content: newContent, color: theme4Color, bgColor: theme4BackgroundColor}
			setTheme4(newTheme);
			theme4Var.current = [newTitle, newContent, theme4Color, theme4BackgroundColor];
		
		}

		// Update the number of themes found
		themesFoundVar.current = themesFoundVar.current+1;
		setThemesFound(themesFoundVar.current);
	
		// Update the color and box shadows of the game tiles
		for (let i = start; i < end + 1; i += increment){
			modifyUpdatedBoard[i].color = color;
			modifyUpdatedBoard[i].boxShadow = "0px 10px " + bgColor;
		}
		setGameBoard(modifyUpdatedBoard);
		return modifyUpdatedBoard;
	}
	
	/**
	 * Updates the colors of the tiles when there is a line of 3 matching tiles
	 * 
	 * @param {int} start	 				: the index of the starting tile in the gameboard array
	 * @param {int} end   					: the index of the ending tile in the gameboard array
	 * @param {int} increment 				: the amount to increment each iteration. 1 for rows, 4 for columns
	 * @param {array} modifyUpdatedBoard 	: the updated game board 
	 * @param {string} theme				: the shared theme of 3 tiles in the line
	 * @param {boolean} column				: true if a column is being checked, false if a row is being checked
	*/
	function lineOfThree (start, end, increment, modifyUpdatedBoard, theme, column) {
		// If the theme of the three tiles is already stored as a theme, it means the line of four was broken. Reset the theme of the line and subtract from the theme count
		if (theme === theme1Var.current[0] || theme === theme2Var.current[0] || theme === theme3Var.current[0] || theme === theme4Var.current[0]) {
			themesFoundVar.current = themesFoundVar.current-1;
			setThemesFound(themesFoundVar.current);	
		}
	
		if (theme === theme1Var.current[0]) {
			setTheme1([]);
			theme1Var.current = [];
		} else if (theme === theme2Var.current[0]) {
			setTheme2([]);
			theme2Var.current = [];
		} else if (theme === theme3Var.current[0]) {
			setTheme3([]);
			theme3Var.current = [];
		} else if (theme === theme4Var.current[0]) {
			setTheme4([]);
			theme4Var.current = [];
		}

		// Update the line of three tiles to be yellow. Update the odd tile out to gray if it is not already part of a line of three or four
		for (let i = start; i < end + 1; i += increment){
			if (modifyUpdatedBoard[i].attribute === theme) {
				modifyUpdatedBoard[i].color = '#ffff38';
				modifyUpdatedBoard[i].boxShadow = '0px 10px #f0f016';
			} else if (modifyUpdatedBoard[i].attribute !== theme1Var.current[0] && modifyUpdatedBoard[i].attribute !== theme2Var.current[0] && modifyUpdatedBoard[i].attribute !== theme3Var.current[0] && modifyUpdatedBoard[i].attribute !== theme4Var.current[0] && (!column || modifyUpdatedBoard[i].color !== '#ffff38')) {
				modifyUpdatedBoard[i].color = '#edeff1';
				modifyUpdatedBoard[i].boxShadow = '0px 10px #d5d7d9'
			}
		}
		setGameBoard(modifyUpdatedBoard);
		return modifyUpdatedBoard;
	}
	
	/**
	 * Updates the colors of the tiles when there are no matches
	 * 
	 * @param {int} start	 				: the index of the starting tile in the gameboard array
	 * @param {int} end   					: the index of the ending tile in the gameboard array
	 * @param {int} increment 				: the amount to increment each iteration. 1 for rows, 4 for columns
	 * @param {array} modifyUpdatedBoard 	: the updated game board 
	 * @param {boolean} column				: true if a column is being checked, false if a row is being checked
	*/
	function noMatches(start, end, increment, modifyUpdatedBoard, column){		
		for (let i = start; i < end + 1; i += increment){
			if (modifyUpdatedBoard[i].attribute !== theme1Var.current[0] && modifyUpdatedBoard[i].attribute !== theme2Var.current[0] && modifyUpdatedBoard[i].attribute !== theme3Var.current[0] && modifyUpdatedBoard[i].attribute !== theme4Var.current[0] && (!column || modifyUpdatedBoard[i].color !== '#ffff38')) {
				modifyUpdatedBoard[i].color = '#edeff1';
				modifyUpdatedBoard[i].boxShadow = '0px 10px #d5d7d9'
			}
		}
		setGameBoard(modifyUpdatedBoard);
		return modifyUpdatedBoard;
	}

	return (
		<Fragment>
			<div className="title">
				<span className="title-first-word">SORT</span>
				<span className="title-second-word">THE</span>
				<span className="title-third-word">GAMEDLE</span>
			</div>
			
			<div className="grid-container">
				{gameBoard.map((box, index) => (
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
				<Accordion title={theme1.title} content={theme1.content} color={theme1.color} bgColor={theme1.bgColor} />
			</div>
			
			<div className="accordion">
				<Accordion title={theme2.title} content={theme2.content} color={theme2.color} bgColor={theme2.bgColor} />
			</div>
			
			<div className="accordion">
				<Accordion title={theme3.title} content={theme3.content} color={theme3.color} bgColor={theme3.bgColor} />
			</div>
			
			<div className="accordion">
				<Accordion title={theme4.title} content={theme4.content} color={theme4.color} bgColor={theme4.bgColor} />
			</div>
			
		</Fragment>
	);
}

export default App;