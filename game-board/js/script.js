const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = window.innerWidth / 3;
canvas.height = window.innerHeight / 5;
// const gameBoard = require('../.././models/GameBoard.model');

// Peghole object
function PegHole(x, y, radius, color, user) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.user = user;//this would be a number
};
PegHole.prototype.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
};

// pegHoles array for us to put our peg holes in
let pegHoles = [];

// creating peg holes to go in pegHoles array
function createGameboard() {
    const radius = 5;
    const color = '#black';

    // Top row // peg holes 0 - 18
    for (let i = 0; i < 19; i++) {
        const x = 70 + 10 * i;
        const y = 20;

        pegHoles.push(new PegHole(x, y, radius, color));
    };

    // Right column // peg holes 19 - 36
    for (let i = 0; i < 17; i++) {
        const x = 250;
        const y = 30 + 10 * i;

        pegHoles.push(new PegHole(x, y, radius, color));
    };
    // Bottom row // peg holes 37 - 53
    for (let i = 0; i < 19; i++) {
        const x = 250 - 10 * i;
        const y = 200;
        pegHoles.push(new PegHole(x, y, radius, color));
    };
    // Left column // peg holes 54 -71
    for (let i = 0; i < 17; i++) {
        const x = 70;
        const y = 190 - 10 * i;

        pegHoles.push(new PegHole(x, y, radius, color));
    };
    // Top finish line // peg holes 72 - 76
    for (let i = 0; i < 3; i++) {
        const x = 100;
        const y = 30 + 10 * i;

        pegHoles.push(new PegHole(x, y, radius, color));
    };
    for (let i = 0; i < 2; i++) {
        const x = 110 + 10 * i;
        const y = 50;

        pegHoles.push(new PegHole(x, y, radius, color));
    };
    // Bottom finish line // peg holes 77 - 81
    for (let i = 0; i < 3; i++) {
        const x = 220;
        const y = 170 + 10 * i;

        pegHoles.push(new PegHole(x, y, radius, color));
    }
    for (let i = 0; i < 2; i++) {
        const x = 200 + 10 * i;
        const y = 170;

        pegHoles.push(new PegHole(x, y, radius, color));
    };
    // Right finish line // peg holes 82 - 86
    for (let i = 0; i < 3; i++) {
        const x = 220 + 10 * i;
        const y = 50;

        pegHoles.push(new PegHole(x, y, radius, color));
    };
    for (let i = 0; i < 2; i++) {
        const x = 220;
        const y = 60 + 10 * i;

        pegHoles.push(new PegHole(x, y, radius, color));
    };
    // Left finish line // peg holes 87 - 91
    for (let i = 0; i < 3; i++) {
        const x = 80 + 10 * i;
        const y = 170;

        pegHoles.push(new PegHole(x, y, radius, color));
    };
    for (let i = 0; i < 2; i++) {
        const x = 100;
        const y = 150 + 10 * i;

        pegHoles.push(new PegHole(x, y, radius, color));
    };
    // Top spawn // peg holes 92 - 96
    for (let i = 0; i < 5; i++) {
        const x = 150;
        const y = 30 + 10 * i;

        pegHoles.push(new PegHole(x, y, radius, color));
    };
    // Bottom spawn // peg holes 97 - 101
    for (let i = 0; i < 5; i++) {
        const x = 170;
        const y = 150 + 10 * i;

        pegHoles.push(new PegHole(x, y, radius, color));
    };
    // Right spawn // peg holes 102 - 106
    for (let i = 0; i < 5; i++) {
        const x = 200 + 10 * i;
        const y = 100;

        pegHoles.push(new PegHole(x, y, radius, color));
    };
    // Left spawn // peg holes 107 - 112
    for (let i = 0; i < 5; i++) {
        const x = 80 + 10 * i;
        const y = 120;

        pegHoles.push(new PegHole(x, y, radius, color));
    };
    // Generate peg holes
    pegHoles.forEach(pegHole => {
        pegHole.draw();
    });
    console.log(pegHoles);

    //store in database
    gameBoard.create(JSON.stringify(pegHoles));
};

createGameboard();

module.exports = createGameboard;