# sort-the-games<br>
A React website that displays a grid of tiles, which can be dragged and dropped into new positions until all matching tiles are lined up in rows or columns.

![GameBoard](https://github.com/Helena-Lynd/sort-the-games/blob/main/game-board.png)

## Description<br>
In this game, every tile has the title of a video game on it. The tiles must be swapped by the player to align games with a common theme in a row or column. When three tiles that belong to the same theme are lined up together, they will turn yellow. When the fourth tile that belongs to that theme is lined up with them, all tiles will turn a new color and the theme will appear in the "Themes Found" section at the bottom of the page.

The theme may be a common developer, publisher, genre, character type, etc. For example, the games "Breath of the Wild," "Sekiro," "God of War," and "" were all Game of Year winners, so they would belong in a row or column together.

Picture of Game Board with Game of the Year Winners here
![]()

The goal is for the player to find four themes aligned in rows or columns, whichever the player chooses.

Picture of board with themes lined up
![]()

Additionally, there is a fifth theme that will always go in the opposite direction of the other four themes, and its color will always be green when all four games have been aligned. 

Picture of the board with the green theme
![]()

The game is won once the player has found all five themes. The game is lost if the player cannot find all the themes within the limited number of swaps.

## Getting Started<br>
### Dependencies
- npm command line tools
### Installing
- Download the source files provided to your directory of choice
```
git clone git@github.com:Helena-Lynd/sort-the-games.git
```
### Executing
- Navigate to the client directory in a command terminal
- Use the command "npm start" to start the React page
- The page should open up once it has loaded. If it does not, open a browser and go to localhost:3000
- Have fun playing!
## Modifying
- You can make your own puzzles by navigating to "public/puzzles" and adding a new .txt file with your puzzle information. The format must be the same as the other puzzle files in order for the game to work correctly. To use your puzzle, change line [] in "App.js" to []
- Another way to play this game is to have words on the tiles, that represent a game title when they are lined up together. For example, the tiles "Meta" "Knight" "Dream" "Land" can represent the game "Kirby's Return to Dreamland." If you would like to make a puzzle in this format, look to Puzzle3.txt for an example of the formatting.
## Common Errors
Three tiles that share a theme will turn yellow when they are aligned in any row or column. This can cause for confusion or make the game appear to be broken when the player begins lining up tiles in both rows and columns (creating a row of four yellow tiles shown below). The logic of the game is not broken!
## Authors<br>
Helena Lynd
