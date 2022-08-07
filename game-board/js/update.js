<<<<<<< HEAD
=======
//this file will update the game board
>>>>>>> main
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = window.innerWidth / 3;
canvas.height = window.innerHeight / 5;

<<<<<<< HEAD
function render() {
    pegHoles.forEach(pegHole => {
=======







function render () {
   pegHoles.forEach(pegHole => {
>>>>>>> main
        pegHole.draw();
    });
}