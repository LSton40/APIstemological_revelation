<<<<<<< HEAD
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = window.innerWidth / 3;
canvas.height = window.innerHeight / 5;

function render() {
    pegHoles.forEach(pegHole => {
        pegHole.draw();
    });
}
=======


//get the game board class from GenerateGameBoard.js
const { GenerateGameBoard } = require('./GenerateGameBoard');



//render the game board
GenerateGameBoard.createGameboard();
GenerateGameBoard.render();



>>>>>>> 713144e4e2eb70741f3fca3a51c5b9d7866de88e
