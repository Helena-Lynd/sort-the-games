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
	
	let attribute2 = "";
	let attribute2Count = 0;
	
	// If either of the first two tiles have a second attribute, need to check all tiles for it
	if (updatedBoard[start].attribute2 !== ""){
		attribute2 = updatedBoard[start].attribute2;
		attribute2Count = 1;
	} else if (updatedBoard[start + increment].attribute2 !== "") {
		attribute2 = updatedBoard[start + increment].attribute2;
	}
	
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
		
		if (attribute2 !== "") {
			if (updatedBoard[i].attribute2 === attribute2) {
				attribute2Count++;
			}
		}
	}
	return [firstTheme, firstThemeCount, secondTheme, secondThemeCount, attribute2, attribute2Count]
}


function App() {
	// Number of swaps left before the game ends
	const [swapsLeft, setSwapsLeft] = useState(15);
	
	// Number of themes found, a state variable so the themes found will render appropriately
	const [themesFound, setThemesFound] = useState(0);
	
	// Number of themes found, a reference variable for accurate logic when rendering
	const themesFoundVar = useRef(0);
	
	// Themes and Descriptions, state variables so that accordions will render appropriately
	const [theme1, setTheme1] = useState([]);
	const [theme2, setTheme2] = useState([]);
	const [theme3, setTheme3] = useState([]);
	const [theme4, setTheme4] = useState([]);
	const [theme5, setTheme5] = useState([]);
	
	// Themes and Descriptions, reference variables so that they will update immediately for render logic
	const theme1Var = useRef([]);
	const theme2Var = useRef([]);
	const theme3Var = useRef([]);
	const theme4Var = useRef([]);
	const theme5Var = useRef([]);

	// Theme colors (for tiles, drop shadows, and accordions)
	const theme1Color = '#45a3e5';
	const theme1BackgroundColor = '#2975ab';
	const theme2Color = '#ff3355';
	const theme2BackgroundColor = '#db1f3e';
	const theme3Color = '#864cbf';
	const theme3BackgroundColor = '#5f2f8f';
	const theme4Color = '#f0721f';
	const theme4BackgroundColor = '#c25208';
	const theme5Color = '#66bf39';
	const theme5BackgroundColor = '#499920';
	
	// An array containing the positions of each tile on the board
	const [gameBoard, setGameBoard] = useState([
		{ title: 'LAST OF US PART II', 			attribute: 'Series: Second in a Franchise', 	content: "The game is the second in a series.",	attribute2: "Award: Game of the Year (From the Game Awards)",	content2: "This game was awarded game of the year at Jeff Keighley's award show.", 	color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
		{ title: 'OKAMI', 						attribute: 'Setting: Feudal Japan',				content: "The game is set in ancient Japan.",	attribute2: "",													content2: "",											 						 	color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
		{ title: 'SUPER SMASH BROS ULTIMATE', 	attribute: 'Release Year: 2018', 				content: "The game was released in 2018.",		attribute2: "",													content2: "",											 							color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
		{ title: 'BREATH OF THE WILD', 			attribute: 'Theme: Wake Up in Intro Sequence', 	content: "Hey, you're finally awake.",			attribute2: "Award: Game of the Year (From the Game Awards)",	content2: "This game was awarded game of the year at Jeff Keighley's award show.",	color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
		{ title: 'PORTAL', 						attribute: 'Theme: Wake Up in Intro Sequence', 	content: "Hey, you're finally awake.",			attribute2: "",													content2: "",											 							color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
		{ title: 'NIOH',						attribute: 'Setting: Feudal Japan',  			content: "The game is set in ancient Japan.",	attribute2: "",													content2: "",											 							color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
		{ title: 'SPIDERMAN: MILES MORALES', 	attribute: 'Series: Second in a Franchise', 	content: "The game is the second in a series.",	attribute2: "",													content2: "",																		color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
		{ title: 'CELESTE', 					attribute: 'Release Year: 2018', 				content: "The game was released in 2018.",		attribute2: "",													content2: "",											 							color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
		{ title: 'GOD OF WAR', 					attribute: 'Release Year: 2018', 				content: "The game was released in 2018.",		attribute2: "Award: Game of the Year (From the Game Awards)",	content2: "This game was awarded game of the year at Jeff Keighley's award show.", 	color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
		{ title: 'ELDER SCROLLS V: SKYRIM', 	attribute: 'Theme: Wake Up in Intro Sequence', 	content: "Hey, you're finally awake.",			attribute2: "",													content2: "",											 							color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
		{ title: 'SEKIRO: SHADOWS DIE TWICE',	attribute: 'Setting: Feudal Japan', 			content: "The game is set in ancient Japan.",	attribute2: "Award: Game of the Year (From the Game Awards)",	content2: "This game was awarded game of the year at Jeff Keighley's award show.", 	color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
		{ title: 'ARMA 2', 						attribute: 'Series: Second in a Franchise', 	content: "The game is the second in a series.",	attribute2: "",													content2: "",											 							color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
		{ title: 'MONSTER HUNTER WORLD', 		attribute: 'Release Year: 2018',				content: "The game was released in 2018.",		attribute2: "",													content2: "",																		color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
		{ title: 'BANJO TOOIE', 				attribute: 'Series: Second in a Franchise', 	content: "The game is the second in a series.",	attribute2: "",													content2: "",											 							color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
		{ title: 'FIRE EMBLEM AWAKENING',		attribute: 'Theme: Wake Up in Intro Sequence', 	content: "Hey, you're finally awake.",			attribute2: "",													content2: "",											 							color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
		{ title: 'GHOST OF TSUSHIMA', 			attribute: 'Setting: Feudal Japan', 			content: "The game is set in ancient Japan.",	attribute2: "",													content2: "",																		color: '#edeff1', boxShadow: '0px 10px #d5d7d9' },
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
		
		// The second attibute associated with tiles, if applicable
		let attribute2 = values[4];
		let attribute2Count = values[5];

		if (firstThemeCount === 4) {
			if (firstTheme !== theme1Var.current[0] && firstTheme !== theme2Var.current[0] && firstTheme !== theme3Var.current[0] && firstTheme !== theme4Var.current[0]) {
				modifyUpdatedBoard = lineOfFour(start, end, increment, modifyUpdatedBoard, false)
			}
		} else if (attribute2Count === 4){
			if (attribute2 !== theme5Var.current[0]) {
				modifyUpdatedBoard = lineOfFour(start, end, increment, modifyUpdatedBoard, true)
			}
		} else if (firstThemeCount === 3 || secondThemeCount === 3 || attribute2Count === 3) {
			if (firstThemeCount === 3) {
				modifyUpdatedBoard = lineOfThree(start, end, increment, modifyUpdatedBoard, firstTheme, column);
			} else if (secondThemeCount === 3) {
				modifyUpdatedBoard = lineOfThree(start, end, increment, modifyUpdatedBoard, secondTheme, column);
			} 
			
			if (attribute2Count === 3) {
				modifyUpdatedBoard = lineOfThree(start, end, increment, modifyUpdatedBoard, attribute2, column);
			}
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
	 * @param {boolean} attribute2			: true if the row of 4 is a second attribute, false otherwise
	*/
	function lineOfFour (start, end, increment, modifyUpdatedBoard, attribute2) {
		// The color and background color to make the tile
		let color;
		let bgColor;

		// The title and content of the game tile, to use for updating an accordion
		let newTitle = modifyUpdatedBoard[start].attribute;
		let newContent = modifyUpdatedBoard[start].content;
		
		if (attribute2) {
			newTitle = modifyUpdatedBoard[start].attribute2;
			newContent = modifyUpdatedBoard[start].content2;
		}
		
		if (attribute2) {
			// Update color and bgColor so that the tiles can be updated to the correct color
			color = theme5Color;
			bgColor = theme5BackgroundColor;
		
			// Update theme5 variables with the updated content
			let newTheme = {title: newTitle, content: newContent, color: theme5Color, bgColor: theme5BackgroundColor}
			setTheme5(newTheme);
			theme5Var.current = [newTitle, newContent, theme5Color, theme5BackgroundColor];
			
		} else if (theme1Var.current.length === 0) {
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
			if ( (modifyUpdatedBoard[i].color === '#ffff38' && color === '#66bf39') || (modifyUpdatedBoard[i].color === '#ffff38' && modifyUpdatedBoard[i].attribute2 !== "" ) ) {
				// If the tile is currently yellow and updating to green, update only the color, not the box shadow
				modifyUpdatedBoard[i].color = color;
			} else if (modifyUpdatedBoard[i].color !== '#66bf39') {
				// If the tile is not green, update the tile to the theme color
				modifyUpdatedBoard[i].color = color;
				modifyUpdatedBoard[i].boxShadow = "0px 10px " + bgColor;
			} else {
				// If the tile is green, keep the box shadow green rather than updating it to the newly found theme color
				modifyUpdatedBoard[i].boxShadow = "0px 10px #499920"; 
			}
		}
		
		if (theme1Var.current.length !== 0 && theme2Var.current.length !== 0 && theme3Var.current.length !== 0 && theme4Var.current.length !== 0 && theme5Var.current.length !== 0) {
			// If all themes have been found, the game is over. Set swaps to 0.
			setSwapsLeft(0);
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
		if (theme === theme1Var.current[0] || theme === theme2Var.current[0] || theme === theme3Var.current[0] || theme === theme4Var.current[0] || theme === theme5Var.current[0]) {
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
		} else if (theme === theme5Var.current[0]) {
			setTheme5([]);
			theme5Var.current = [];
		}

		// Update the line of three tiles to be yellow. Update the odd tile out to gray if it is not already part of a line of three or four
		for (let i = start; i < end + 1; i += increment){
			if (modifyUpdatedBoard[i].attribute === theme && ( (column && theme5Var.current !== []) || !column ) && modifyUpdatedBoard[i].color === '#66bf39'){
				// If the the tile matches the theme of the yellow line, the tile is green, and theme5 has been found, update the box shadow only
				modifyUpdatedBoard[i].boxShadow = '0px 10px #f0f016'; 
			
			} else if ( modifyUpdatedBoard[i].attribute2 === theme ) {
				// If the fifth attribute line was just broken, update the color of the tiles to match the theme found if they are in a line of 4
				let inc;
				if (column && i !== 3 && i !== 7 && i !== 11 && i !== 15) {
					inc = 1;
				} else if (column) {
					inc = -1;
				} else if (!column && i < 12) {
					inc = 4;
				} else {
					inc = -4;
				}
				
				if (modifyUpdatedBoard[i + inc].attribute === modifyUpdatedBoard[i].attribute && modifyUpdatedBoard[i + inc].color !== '#ffff38' && modifyUpdatedBoard[i + inc].color !== '#edeff1'){
					// If the tile adjacent to it shares an attribute and is not gray or yellow, it means the tile should be part of the same theme
					modifyUpdatedBoard[i].color = modifyUpdatedBoard[i + inc].color;
					modifyUpdatedBoard[i].boxShadow = '0px 10px #f0f016';
				}  else if ( modifyUpdatedBoard[i].attribute2 === theme) {
					// If the theme matches and it's not part of a line, update it to yellow
					modifyUpdatedBoard[i].color = '#ffff38';
					modifyUpdatedBoard[i].boxShadow = '0px 10px #f0f016';
				} else if (modifyUpdatedBoard[i].attribute !== theme1Var.current[0] && modifyUpdatedBoard[i].attribute !== theme2Var.current[0] && modifyUpdatedBoard[i].attribute !== theme3Var.current[0] && modifyUpdatedBoard[i].attribute !== theme4Var.current[0] &&  modifyUpdatedBoard[i].attribute2 !== theme5Var.current[0] && (!column || modifyUpdatedBoard[i].color !== '#ffff38') ) {
					// If the theme does not match, recolor it to gray unless it is part of a theme or established yellow connection
					modifyUpdatedBoard[i].color = '#edeff1';
					modifyUpdatedBoard[i].boxShadow = '0px 10px #d5d7d9'
				}
			} else if ( (modifyUpdatedBoard[i].attribute === theme || modifyUpdatedBoard[i].attribute2 === theme) ) {
				// If the theme matches, update it to yellow
				modifyUpdatedBoard[i].color = '#ffff38';
				modifyUpdatedBoard[i].boxShadow = '0px 10px #f0f016';
			
			} else if (modifyUpdatedBoard[i].attribute !== theme1Var.current[0] && modifyUpdatedBoard[i].attribute !== theme2Var.current[0] && modifyUpdatedBoard[i].attribute !== theme3Var.current[0] && modifyUpdatedBoard[i].attribute !== theme4Var.current[0] &&  modifyUpdatedBoard[i].attribute2 !== theme5Var.current[0] && (!column || modifyUpdatedBoard[i].color !== '#ffff38') ) {
				// If the theme does not match, recolor it to gray unless it is part of a theme or established yellow connection
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
			if (modifyUpdatedBoard[i].attribute !== theme1Var.current[0] && modifyUpdatedBoard[i].attribute !== theme2Var.current[0] && modifyUpdatedBoard[i].attribute !== theme3Var.current[0] && modifyUpdatedBoard[i].attribute !== theme4Var.current[0] && modifyUpdatedBoard[i].attribute2 !== theme5Var.current[0] && (!column || modifyUpdatedBoard[i].color !== '#ffff38')) {
				// If the tile does not match any themes and is not intended to be yellow, update it to gray
				modifyUpdatedBoard[i].color = '#edeff1';
			}
			
			if (modifyUpdatedBoard[i].attribute !== theme1Var.current[0] && modifyUpdatedBoard[i].attribute !== theme2Var.current[0] && modifyUpdatedBoard[i].attribute !== theme3Var.current[0] && modifyUpdatedBoard[i].attribute !== theme4Var.current[0] && (!column || modifyUpdatedBoard[i].color !== '#ffff38')) {
				if (modifyUpdatedBoard[i].color === '#66bf39'){
					// If the tile does not match first 4 themes and is green, update the box shadow to green
					modifyUpdatedBoard[i].boxShadow = '0px 10px #499920'
				} else {
					// If the tile does not match any themes, update box shadow to gray
					modifyUpdatedBoard[i].boxShadow = '0px 10px #d5d7d9'
				}
			}
			if (modifyUpdatedBoard[i].attribute === theme1Var.current[0] || modifyUpdatedBoard[i].attribute === theme2Var.current[0] || modifyUpdatedBoard[i].attribute === theme3Var.current[0] || modifyUpdatedBoard[i].attribute === theme4Var.current[0] ) {
				// If the tile does match a theme, update color and box shadow (they can otherwise have a box shadow that stays yellow even without a sequence of 3 tiles)
				let theme = modifyUpdatedBoard[i].attribute;
				if (theme1Var.current[0] === theme) {
					modifyUpdatedBoard[i].color = theme1Color;
					modifyUpdatedBoard[i].boxShadow = '0px 10px ' + theme1BackgroundColor;
				} else if (theme2Var.current[0] === theme) {
					modifyUpdatedBoard[i].color = theme2Color;
					modifyUpdatedBoard[i].boxShadow = '0px 10px ' + theme2BackgroundColor;
				} else if (theme3Var.current[0] === theme) {
					modifyUpdatedBoard[i].color = theme3Color;
					modifyUpdatedBoard[i].boxShadow = '0px 10px ' + theme3BackgroundColor;
				} else if (theme4Var.current[0] === theme) {
					modifyUpdatedBoard[i].color = theme4Color;
					modifyUpdatedBoard[i].boxShadow = '0px 10px ' + theme4BackgroundColor;
				}
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
			
			{swapsLeft === 1 && <div className="game-over-bg">
				<p className="game-over">One Swap Left</p>
			</div>}
			
			{swapsLeft === 0 && <div className="game-over-bg">
				<p className="game-over">Game Over!</p>
			</div>}
			
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
			
			<div className="accordion">
				<Accordion title={theme5.title} content={theme5.content} color={theme5.color} bgColor={theme5.bgColor} />
			</div>
			
		</Fragment>
	);
}

export default App;