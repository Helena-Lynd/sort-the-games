import React, { Fragment, useState, useRef } from 'react';
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
  const color = props.color;
  const bgColor = props.backgroundColor;

  return (
    <div>
      <div className="accordion-title" style={{ backgroundColor: color }} onClick={() => setIsActive(!isActive)}>
        <div>{props.title}</div>
      </div>
      {isActive && <div className="accordion-content" style={{ backgroundColor: bgColor }}>{props.content}</div>}
    </div>
  );
};

function App() {
	/* Number of swaps left before the game ends */
	const [swapsLeft, setSwapsLeft] = useState(100);
	
	/* Number of themes found */
	const [themesFound, setThemesFound] = useState(0);
	
	/* Themes and Descriptions, state variables so that accordions will render appropriately */
	const [theme1, setTheme1] = useState([]);
	const [theme2, setTheme2] = useState([]);
	const [theme3, setTheme3] = useState([]);
	const [theme4, setTheme4] = useState([]);
	
	/* Themes and Descriptions, variables so that they will update immediately for render logic */
	const theme1Var = useRef([]);
	const theme2Var = useRef([]);
	const theme3Var = useRef([]);
	const theme4Var = useRef([]);

	/* Theme colors (for tiles, drop shadows, and accordions) */
	const theme1Color = '#45a3e5';
	const theme1BackgroundColor = '#2975ab';
	const theme2Color = '#ff3355';
	const theme2BackgroundColor = '#db1f3e';
	const theme3Color = '#864cbf';
	const theme3BackgroundColor = '#5f2f8f';
	const theme4Color = '#f0721f';
	const theme4BackgroundColor = '#c25208';
	
	/* An array containing the positions of each tile on the board */
	const [boxPositions, setBoxPositions] = useState([
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
		
		checkBoard(updatedPositions);
	};

	/* Allows drag and drop functionality for the tiles */
	const handleDragOver = (event) => {
		event.preventDefault();
	};
	
	/* Check a single row */
	function checkRow(rowStart, rowEnd, newBoxPositions){
		var firstTheme = newBoxPositions[rowStart].attribute;
		var firstThemeCount = 1;
		var secondTheme;
		var secondThemeCount = 0;
		const updatedColors = [...newBoxPositions];
		for (var i = rowStart+1; i < rowEnd+1; i++) {
			if (newBoxPositions[i].attribute == firstTheme) {
				firstThemeCount++;
			} else if (secondThemeCount == 0) {
				secondTheme = newBoxPositions[i].attribute;
				secondThemeCount++;
			} else if (newBoxPositions[i].attribute == secondTheme) {
				secondThemeCount++;
			}
		}
		
		if (firstThemeCount == 4) {
			if (firstTheme != theme1Var.current[0] && firstTheme != theme2Var.current[0] && firstTheme != theme3Var.current[0] && firstTheme != theme4Var.current[0]) {
			var color;
			var bgColor;
			var newTitle = newBoxPositions[rowStart].attribute;
			var newContent = newBoxPositions[rowStart].title;
				
			if (theme1Var.current.length == 0) {
				color = theme1Color;
				bgColor = theme1BackgroundColor;
				var newTheme = {title: newTitle, content: newContent, color: theme1Color, bgColor: theme1BackgroundColor}
				setTheme1(newTheme);
				theme1Var.current = [newTitle, newContent, theme1Color, theme1BackgroundColor];
				setThemesFound(themesFound+1);
			} else if (theme2Var.current.length == 0) {
				color = theme2Color;
				bgColor = theme2BackgroundColor;
				var newTheme = {title: newTitle, content: newContent, color: theme2Color, bgColor: theme2BackgroundColor}
				setTheme2(newTheme);
				theme2Var.current = [newTitle, newContent, theme2Color, theme2BackgroundColor];
				setThemesFound(themesFound+1);
			} else if (theme3Var.current.length == 0) {
				color = theme3Color;
				bgColor = theme3BackgroundColor;
				var newTheme = {title: newTitle, content: newContent, color: theme3Color, bgColor: theme3BackgroundColor}
				setTheme3(newTheme);
				theme3Var.current = [newTitle, newContent, theme3Color, theme3BackgroundColor];
				setThemesFound(themesFound+1);
			} else if (theme4Var.current.length == 0) {
				color = theme4Color;
				bgColor = theme4BackgroundColor;
				var newTheme = {title: newTitle, content: newContent, color: theme4Color, bgColor: theme4BackgroundColor}
				setTheme4(newTheme);
				theme4Var.current = [newTitle, newContent, theme4Color, theme4BackgroundColor];
				setThemesFound(themesFound+1);
			}
		
			for (var i=rowStart; i<rowEnd+1; i++){
				updatedColors[i].color = color;
				updatedColors[i].boxShadow = "0px 10px " + bgColor;
			}
			setBoxPositions(updatedColors);
			}
			
		} else if (firstThemeCount == 3 || secondThemeCount == 3) {
			var whichTheme;
			if (firstThemeCount == 3) {
				whichTheme = firstTheme;
			} else {
				whichTheme = secondTheme;
			}
			if (whichTheme == theme1Var.current[0]) {
				setTheme1([]);
				theme1Var.current = [];
				setThemesFound(themesFound-1);
			} else if (whichTheme == theme2Var.current[0]) {
				setTheme2([]);
				theme2Var.current = [];
				setThemesFound(themesFound-1);
			} else if (whichTheme == theme3Var.current[0]) {
				setTheme3([]);
				theme3Var.current = [];
				setThemesFound(themesFound-1);
			} else if (whichTheme == theme4Var.current[0]) {
				setTheme4([]);
				theme4Var.current = [];
				setThemesFound(themesFound-1);
			}
			
			for (var i=rowStart; i<rowEnd+1; i++){
				if (updatedColors[i].attribute == whichTheme) {
					updatedColors[i].color = '#ffff38';
					updatedColors[i].boxShadow = '0px 10px #f0f016';
				} else {
					updatedColors[i].color = '#edeff1';
					updatedColors[i].boxShadow = '0px 10px #d5d7d9';
				}
			}
			setBoxPositions(updatedColors);
		} else {			
			for (var i=rowStart; i<rowEnd+1; i++){
				if (updatedColors[i].attribute != theme1Var.current[0] && updatedColors[i].attribute != theme2Var.current[0] && updatedColors[i].attribute != theme3Var.current[0] && updatedColors[i].attribute != theme4Var.current[0]) {
				updatedColors[i].color = '#edeff1';
				updatedColors[i].boxShadow = '0px 10px #d5d7d9'
				}
			}
			setBoxPositions(updatedColors);
		}
		return updatedColors;
	}
	
	/* Check a single column */
	function checkColumn(columnStart, columnEnd, newBoxPositions){
		var firstTheme = newBoxPositions[columnStart].attribute;
		var firstThemeCount = 1;
		var secondTheme;
		var secondThemeCount = 0;
		for (var i = columnStart+4; i < columnEnd+1; i+=4) {
			if (newBoxPositions[i].attribute == firstTheme) {
				firstThemeCount++;
			} else if (secondThemeCount == 0) {
				secondTheme = newBoxPositions[i].attribute;
				secondThemeCount++;
			} else if (newBoxPositions[i].attribute == secondTheme) {
				secondThemeCount++;
			}
		}
		const updatedColors = [...newBoxPositions];
		
		if (firstThemeCount == 4) {
			if (firstTheme != theme1Var.current[0] && firstTheme != theme2Var.current[0] && firstTheme != theme3Var.current[0] && firstTheme != theme4Var.current[0]) {
			var color;
			var bgColor;
			var newTitle = newBoxPositions[columnStart].attribute;
			var newContent = newBoxPositions[columnStart].title;
				
			if (theme1Var.current.length == 0) {
				color = theme1Color;
				bgColor = theme1BackgroundColor;
				var newTheme = {title: newTitle, content: newContent, color: theme1Color, bgColor: theme1BackgroundColor}
				setTheme1(newTheme);
				theme1Var.current = [newTitle, newContent, theme1Color, theme1BackgroundColor];
				setThemesFound(themesFound+1);
			} else if (theme2Var.current.length == 0) {
				color = theme2Color;
				bgColor = theme2BackgroundColor;
				var newTheme = {title: newTitle, content: newContent, color: theme2Color, bgColor: theme2BackgroundColor}
				setTheme2(newTheme);
				theme2Var.current = [newTitle, newContent, theme2Color, theme2BackgroundColor];
				setThemesFound(themesFound+1);
			} else if (theme3Var.current.length == 0) {
				color = theme3Color;
				bgColor = theme3BackgroundColor;
				var newTheme = {title: newTitle, content: newContent, color: theme3Color, bgColor: theme3BackgroundColor}
				setTheme3(newTheme);
				theme3Var.current = [newTitle, newContent, theme3Color, theme3BackgroundColor];
				setThemesFound(themesFound+1);
			} else if (theme4Var.current.length == 0) {
				color = theme4Color;
				bgColor = theme4BackgroundColor;
				var newTheme = {title: newTitle, content: newContent, color: theme4Color, bgColor: theme4BackgroundColor}
				setTheme4(newTheme);
				theme4Var.current = [newTitle, newContent, theme4Color, theme4BackgroundColor];
				setThemesFound(themesFound+1);
			}
			
			for (var i=columnStart; i<columnEnd+1; i+=4){
				updatedColors[i].color = color;
				updatedColors[i].boxShadow = '0px 10px ' + bgColor;
			}
			setBoxPositions(updatedColors);
			}
	
		} else if (firstThemeCount == 3 || secondThemeCount == 3) {
			var whichTheme;
			if (firstThemeCount == 3) {
				whichTheme = firstTheme;
			} else {
				whichTheme = secondTheme;
			}
			
			if (whichTheme == theme1Var.current[0]) {
				setTheme1([]);
				theme1Var.current = [];
				setThemesFound(themesFound-1);
			} else if (whichTheme == theme2Var.current[0]) {
				setTheme2([]);
				theme2Var.current = [];
				setThemesFound(themesFound-1);
			} else if (whichTheme == theme3Var.current[0]) {
				setTheme3([]);
				theme3Var.current = [];
				setThemesFound(themesFound-1);
			} else if (whichTheme == theme4Var.current[0]) {
				setTheme4([]);
				theme4Var.current = [];
				setThemesFound(themesFound-1);
			}
			
			for (var i=columnStart; i<columnEnd+1; i+=4){
				if (updatedColors[i].attribute == whichTheme) {
					updatedColors[i].color = '#ffff38';
					updatedColors[i].boxShadow = '0px 10px #f0f016';
				} else if (updatedColors[i].attribute != theme1Var.current[0] && updatedColors[i].attribute != theme2Var.current[0] && updatedColors[i].attribute != theme3Var.current[0] && updatedColors[i].attribute != theme4Var.current[0] && updatedColors[i].color != '#ffff38') {
					updatedColors[i].color = '#edeff1';
					updatedColors[i].boxShadow = '0px 10px #d5d7d9'
				}
			}
			setBoxPositions(updatedColors);
		} else {	
			for (var i=columnStart; i<columnEnd+1; i+=4){
				if (updatedColors[i].attribute != theme1Var.current[0] && updatedColors[i].attribute != theme2Var.current[0] && updatedColors[i].attribute != theme3Var.current[0] && updatedColors[i].attribute != theme4Var.current[0] && updatedColors[i].color != '#ffff38') {
					updatedColors[i].color = '#edeff1';
					updatedColors[i].boxShadow = '0px 10px #d5d7d9'
				}
			}
			setBoxPositions(updatedColors);
		}
		return updatedColors;
	}
	
	function checkBoard(newBoxPositions) {
		checkRow(0, 3, newBoxPositions);
		checkRow(4, 7, newBoxPositions);
		checkRow(8, 11, newBoxPositions);
		const newRowPositions = checkRow(12, 15, newBoxPositions);
		checkColumn(0, 12, newRowPositions);
		checkColumn(1, 13, newRowPositions);
		checkColumn(2, 14, newRowPositions);
		checkColumn(3, 15, newRowPositions);
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
				<Accordion title={theme1.title} content={theme1.content} color={theme1.color} colorBg={theme1.bgColor} />
			</div>
			
			<div className="accordion">
				<Accordion title={theme2.title} content={theme2.content} color={theme2.color} colorBg={theme2.bgColor} />
			</div>
			
			<div className="accordion">
				<Accordion title={theme3.title} content={theme3.content} color={theme3.color} colorBg={theme3.bgColor} />
			</div>
			
			<div className="accordion">
				<Accordion title={theme4.title} content={theme4.content} color={theme4.color} colorBg={theme4.bgColor} />
			</div>
			
		</Fragment>
	);
}

export default App;