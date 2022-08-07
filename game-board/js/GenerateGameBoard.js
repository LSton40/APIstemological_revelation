// const canvas = document.querySelector('canvas');
// const c = canvas.getContext('2d');
// canvas.width = window.innerWidth / 3;
// canvas.height = window.innerHeight / 5;
// const gameBoard = require('../.././models/GameBoard.model');


//this class if for generating game boards
class GenerateGameboard {

    constructor() {
        this.pegHoles = [];
    }



    PegHole(x, y, radius, color, user) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.user = user;//this would be a number
    };

    draw = function (c) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    };

    createGameboard() {

        const radius = 5;
        const color = '#black';

        // Top row // peg holes 0 - 18
        for (let i = 0; i < 19; i++) {
            const x = 70 + 10 * i;
            const y = 20;

            this.pegHoles.push(new PegHole(x, y, radius, color));
        };

        // Right column // peg holes 19 - 36
        for (let i = 0; i < 17; i++) {
            const x = 250;
            const y = 30 + 10 * i;

            this.pegHoles.push(new PegHole(x, y, radius, color));
        };
        // Bottom row // peg holes 37 - 53
        for (let i = 0; i < 19; i++) {
            const x = 250 - 10 * i;
            const y = 200;
            this.pegHoles.push(new PegHole(x, y, radius, color));
        };
        // Left column // peg holes 54 -71
        for (let i = 0; i < 17; i++) {
            const x = 70;
            const y = 190 - 10 * i;

            this.pegHoles.push(new PegHole(x, y, radius, color));
        };
        // Top finish line // peg holes 72 - 76
        for (let i = 0; i < 3; i++) {
            const x = 100;
            const y = 30 + 10 * i;

            this.pegHoles.push(new PegHole(x, y, radius, color));
        };
        for (let i = 0; i < 2; i++) {
            const x = 110 + 10 * i;
            const y = 50;

            this.pegHoles.push(new PegHole(x, y, radius, color));
        };
        // Bottom finish line // peg holes 77 - 81
        for (let i = 0; i < 3; i++) {
            const x = 220;
            const y = 170 + 10 * i;

            this.pegHoles.push(new PegHole(x, y, radius, color));
        }
        for (let i = 0; i < 2; i++) {
            const x = 200 + 10 * i;
            const y = 170;

            this.pegHoles.push(new PegHole(x, y, radius, color));
        };
        // Right finish line // peg holes 82 - 86
        for (let i = 0; i < 3; i++) {
            const x = 220 + 10 * i;
            const y = 50;

            this.pegHoles.push(new PegHole(x, y, radius, color));
        };
        for (let i = 0; i < 2; i++) {
            const x = 220;
            const y = 60 + 10 * i;

            this.egHoles.push(new PegHole(x, y, radius, color));
        };
        // Left finish line // peg holes 87 - 91
        for (let i = 0; i < 3; i++) {
            const x = 80 + 10 * i;
            const y = 170;

            this.pegHoles.push(new PegHole(x, y, radius, color));
        };
        for (let i = 0; i < 2; i++) {
            const x = 100;
            const y = 150 + 10 * i;

            this.pegHoles.push(new PegHole(x, y, radius, color));
        };
        // Top spawn // peg holes 92 - 96
        for (let i = 0; i < 5; i++) {
            const x = 150;
            const y = 30 + 10 * i;

            this.pegHoles.push(new PegHole(x, y, radius, color));
        };
        // Bottom spawn // peg holes 97 - 101
        for (let i = 0; i < 5; i++) {
            const x = 170;
            const y = 150 + 10 * i;

            this.pegHoles.push(new PegHole(x, y, radius, color));
        };
        // Right spawn // peg holes 102 - 106
        for (let i = 0; i < 5; i++) {
            const x = 200 + 10 * i;
            const y = 100;

            this.pegHoles.push(new PegHole(x, y, radius, color));
        };
        // Left spawn // peg holes 107 - 112
        for (let i = 0; i < 5; i++) {
            const x = 80 + 10 * i;
            const y = 120;

            this.pegHoles.push(new PegHole(x, y, radius, color));
        };

        

    }

    drawGameboard() {
        this.pegHoles.forEach(pegHole => {
            pegHole.draw();
        });
    }

    getGameboard() {
        return this.pegHoles;
    }

    updateGameboardColor(color, user) {
        this.pegHoles.forEach(pegHole => {
            pegHole.color = color;
        }
        );
    }

}

module.exports = GenerateGameboard;