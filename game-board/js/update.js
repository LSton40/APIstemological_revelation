const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = window.innerWidth / 3;
canvas.height = window.innerHeight / 5;

function render() {
    pegHoles.forEach(pegHole => {
        pegHole.draw();
    });
}