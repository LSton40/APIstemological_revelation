/* Counters 
    User's Starting counter array
    User's home counter array

    Opponents' Starting counter arrays
    Opponents' Home counter arrays
*/

const { createPromptModule } = require("inquirer");

const userTokens = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]
const userTokensOnBoard = [];

const userStart = [];
const userHome = [];




//Array of cards
const cardArray = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

let playDeck = [];

//discard pile array
const discard = [];

//Deck generation function
function gameStart() {


}


function generateDeck() {
    playDeck.push(cardArray[Math.floor(Math.random() * cardArray.length)])

}

gameStart();

//assign values to "cards": spaces to play

//JOKER FUNCTION



//function to populate player's hand at start

const userHand = [];

function dealCards() {
    
    player1Hand.push(playDeck.splice(0, 5));

    player2Hand.push(playDeck.splice(0, 5));

    player3Hand.push(playDeck.splice(0, 5));

    player4Hand.push(playDeck.splice(0, 5));


    //Switch statement to equate userHand to appropriate player Hand ??
}

//function to draw 6th card on turn

function drawCard() {

    userHand.push(playDeck.splice(0, 5));

}


/* Move token from home*/



/*play function
    1) Select card, highlights*/

function addSelectClass() {

    //if classList does not include 'selectedCard', add class 'selectedCard'
    //else if classList does include 'selectedCard', remove class 'selectedCard'
    let selectedCard = cardEl.classList.add('selectedCard')
}


const cardEl = document.querySelector();

cardEl.addEventListener('click', addSelectClass)


for (let i = 0; i < userHand.length; i++) {
    if (userHand[i] = ) {
        //send to discard deck if selected 
    }
}

/*
    2) Highlight pieces and all possible moves (only for player)
        2a) function calculates all possible moves*/

function possibleMoves() {

    userTokensOnBoard.forEach()
    //Highlight pieces on board, add class 'myPieces'

    //Possible moves: 
    //location of 'myPieces' + value of 'selectedCard'
    //highlight all spaces from sum
}


const selection = document.querySelector



/*
    3) Click piece = submit
    3a) piece moves (remove from one space, add to calculated space)
    3b) piece and space highlighting disappears */



/*
    3c) card displayed in header
    3d) card goes to discard pile
    3e) cards in hand reshuffle
    //function to remove selected card from hand and add selected card to array
    //shifts remaining 5 cards in hand


    4) turn ends
    5) 3rd party API triggers: show random fact

*/


//function to display turn-player's selection number to header


/*Endgame algorithms
    1) Piece reaches home: only exact number or passes
    2) land on home space: piece removed from board
        2a) player home counter +1
        2b) show # of home tokens for each player
    3) Counter = 5, game ends
    4) Some kind of game over message, winner logged


*/


/*Function for landing on opponent piece
    1) User player piece replaces opponent player piece
    2) Opponent player piece removed from board
        2a) Opponent players Starting counter +1

*/

