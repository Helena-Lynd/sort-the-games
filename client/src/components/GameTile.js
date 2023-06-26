import React from 'react';

/**
 * Creates a single game tile, a square with text displayed on it
 *
 * @param {int} index 		 : the index of the tile in the gameboard array
 * @param {string} title	 : the title to be displayed on the tile, formatted 'TITLE'
 * @param {string} color	 : the color of the tile, formatted '#xxxxxx'
 * @param {string} boxShadow : the style of the box shadow, formatted '0px 10px #xxxxxx'
 */
export default function GameTile(props) {
	// Variables storing the positioning of the tile
	let left;
	let height;
	
	// Determines what row a tile should display in
	if (props.index < 4) {
		height = '30px';
	} else if (props.index < 8) {
		height = '60px';
	} else if (props.index < 12) {
		height = '90px';
	} else {
		height = '120px';
	}
	
	// Determines what column a tile should display in
	if (props.index === 0 || props.index === 4 || props.index === 8 || props.index === 12) {
		left = '535px';
	} else if (props.index === 1 || props.index === 5 || props.index === 9 || props.index === 13) {
		left = '555px';
	} else if (props.index === 2 || props.index === 6 || props.index === 10 || props.index === 14) {
		left = '575px';
	} else {
		left = '595px';
	}
	
	return (
		<div className="game-tile" style={{ left: left, top: height, backgroundColor: props.color, boxShadow: props.boxShadow }}>
			<p>{props.title}</p>
		</div>
	);
}