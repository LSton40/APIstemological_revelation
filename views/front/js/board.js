let app;
const NORMAL = 0xFFFFFF;
const OVER = 0x00FF00;
const DOWN = 0xFF0000;
const red = 0xff0000;
const blue = 0x0000FF;
const green = 0x008000;
const black = 0x000000;
const RECT_W = 100;
const RECT_H = 100;
let offsetX = 650;
let offsetY = 50;
let spacing = 0;
let pegHoles = [];
let pointerIsDown = false;
let pointerIsOver = false;
let color = NORMAL;
let startingX = 0;
let startingY = 0;
let radius = 15;
let posTracker = 0;
const cardBtn = document.querySelector('#card-btn');
let gameContainer;
const cardValue = 7;
const playerLocation = 2 + 1;
let playerOneLocations = [4, 25, 52, 64];
let playerTwoLocations = [7];
let playerThreeLocations = [41, 17, 3];
let playerFourLocations = [6, 31];

//when the start button is presses put all clientside information in local storage
localStorage.setItem('playerOneLocations', JSON.stringify({ playerOneLocations }));
window.onload = function () {
    app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight / 1.5,
        backgroundColor: 0x2b1515

    });

    document.querySelector('#gameDiv').appendChild(app.view);
    gameContainer = new PIXI.Container();
    app.stage.addChild(gameContainer);

    //beginning of game drawing
    // Top column // peg hole 0 - 18
    for (let i = 0; i < 19; i++) {

        const x = startingX + 2 * radius * i;
        const y = startingY;

        pegHoles.push(new PegHole((x + offsetX), y + offsetY, radius, color, posTracker++));
    };

    // Right column // peg holes 19 - 35
    for (let i = 0; i < 17; i++) {

        const x = startingX + 36 * radius;
        const y = startingY + 2 * radius + 2 * radius * i;

        pegHoles.push(new PegHole(x + offsetX + (spacing * 11), y + offsetY + spacing, radius, color, posTracker++));
    };
    // Bottom row // peg holes 36 - 54
    for (let i = 0; i < 19; i++) {

        const x = startingX + 36 * radius - 2 * radius * i;
        const y = startingY + 2 * radius + 34 * radius;

        pegHoles.push(new PegHole(x + offsetX, y + offsetY, radius, color, posTracker++));
    };
    // Left column // peg holes 55 - 71
    for (let i = 0; i < 17; i++) {

        const x = startingX;
        const y = startingY + 34 * radius - 2 * radius * i;

        pegHoles.push(new PegHole(x + offsetX, y + offsetY, radius, color, posTracker++));
    };
    // Top finish line // peg holes 72 - 76
    for (let i = 0; i < 3; i++) {

        const x = startingX + 6 * radius;
        const y = startingY + 2 * radius + 2 * radius * i;

        pegHoles.push(new PegHole(x + offsetX, y + offsetY, radius, color, posTracker++));
    };
    for (let i = 0; i < 2; i++) {

        const x = startingX + 8 * radius + 2 * radius * i;
        const y = startingY + 6 * radius;

        pegHoles.push(new PegHole(x + offsetX, y + offsetY, radius, color, posTracker++));
    };
    // Bottom finish line // peg holes 77 - 81
    for (let i = 0; i < 3; i++) {

        const x = startingX + 30 * radius;
        const y = startingY + 30 * radius + 2 * radius * i;

        pegHoles.push(new PegHole(x + offsetX, y + offsetY, radius, color, posTracker++));
    }
    for (let i = 0; i < 2; i++) {

        const x = startingX + 26 * radius + 2 * radius * i;
        const y = startingY + 30 * radius;

        pegHoles.push(new PegHole(x + offsetX, y + offsetY, radius, color, posTracker++));
    };
    // Right finish line // peg holes 82 - 86
    for (let i = 0; i < 3; i++) {

        const x = startingX + 30 * radius + 2 * radius * i;
        const y = startingY + 6 * radius;

        pegHoles.push(new PegHole(x + offsetX, y + offsetY, radius, color, posTracker++));
    };
    for (let i = 0; i < 2; i++) {

        const x = startingX + 30 * radius;
        const y = startingY + 8 * radius + 2 * radius * i;

        pegHoles.push(new PegHole(x + offsetX, y + offsetY, radius, color, posTracker++));
    };
    // Left finish line // peg holes 87 - 91
    for (let i = 0; i < 3; i++) {

        const x = startingX + 2 * radius + 2 * radius * i;
        const y = startingY + 30 * radius;

        pegHoles.push(new PegHole(x + offsetX, y + offsetY, radius, color, posTracker++));
    };
    for (let i = 0; i < 2; i++) {

        const x = startingX + 6 * radius;
        const y = startingY + 26 * radius + 2 * radius * i;

        pegHoles.push(new PegHole(x + offsetX, y + offsetY, radius, color, posTracker++));
    };

    playerPieces();

    //end of game drawing
    //needs a parent square to hold pegs

    for (let i = 0; i < pegHoles.length; i++) {
        gameContainer.addChild(pegHoles[i]);
    }
    console.log(pegHoles);

    app.ticker.add(gameLoop);
}

function gameLoop(delta) { }

function PegHole(x, y, radius, color, name) {
    let circle = new PIXI.Graphics();
    circle.beginFill(NORMAL);
    circle.drawCircle(x, y, radius, radius);
    circle.endFill();
    let type = 'peghole';
    circle.interactive = true;
    circle.buttonMode = true;


    circle.on("pointerdown", doPointerDown);

    let canMove = false;

    circle.name = name;

    return circle;
}

function doPointerDown() {
    console.log(`type: ${this.type}`);
    console.log(`type: ${this.canMove}`);
    console.log(`this output ${this}`);
    console.log(`name ${this.name}`);
    if (this.canMove === true) {
        this.tint = red;

        //get location of original peg
        let pegLoc = this.name - cardValue;
        //if you pass i = 0, the original peg can be located
        if (pegLoc < 0) {
            pegLoc = pegLoc + 72;
        };
        let originalLoc = playerOneLocations.find(peg => {
            return peg == pegHoles[pegLoc].name;
        });

        //change the location numbers
        playerOneLocations[playerOneLocations.indexOf(originalLoc)] = this.name;
        pegHoles[pegLoc].tint = NORMAL;

        console.log(localStorage.getItem('playerOneLocations'));

    };
    pointerIsDown = true;
};

//This generates the player pieces using piece location
function playerPieces() {

    for (i = 0; i < playerOneLocations.length; i++) {
        pegHoles[playerOneLocations[i]].tint = red;
    };

    for (i = 0; i < playerTwoLocations.length; i++) {
        pegHoles[playerTwoLocations[i]].tint = blue;
    };

    for (i = 0; i < playerThreeLocations.length; i++) {
        pegHoles[playerThreeLocations[i]].tint = green;
    };

    for (i = 0; i < playerFourLocations.length; i++) {
        pegHoles[playerFourLocations[i]].tint = black;
    };

};

// When player clicks on card it shows the possible moves they can do
function showPossibleMoves() {

    for (i = 0; i < playerOneLocations.length; i++) {
        let moveLocations = playerOneLocations[i] + cardValue;
        let moves;

        //If next move i > 71, it will go to the beginning of the array before counting
        if (moveLocations > 71) {


            moveLocations = moveLocations - 72;
        };

        moves = pegHoles[moveLocations];
        moves.canMove = true;
        moves.tint = '0xffff00';
    };

    //Allow player to deploy unused peg
    if (playerOneLocations.length < 5) {


        pegHoles[39 + cardValue].tint = '0xffff00';

        //We'll need to add this to the array if they click it    
        //playerOneLocations.push(pegHoles[39 + cardValue].name);

        console.log(playerOneLocations);
    };
};

cardBtn.addEventListener('click', showPossibleMoves);