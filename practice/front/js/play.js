/* Counters 
    User's Starting counter array
    User's home counter array

    Opponents' Starting counter arrays
    Opponents' Home counter arrays
*/


const userTokens = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]
const userTokensOnBoard = [];

const userStart = [];
const userHome = [];




//Array of cards
const cardArray = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

let playDeck;

//discard pile array
const discard = [];

//assign values to "cards": spaces to play

function iLikeToMoveItMoveIt(select) {

    switch(select) {
        case 'A':
            
            break;
        // case 'J':
    
        //     break;
        // case 'Q':
    
        //     break;
        // case 'K':
    
        //     break;
        case 2:
    
            break;
        case 3:
    
            break;
        case 4:
    
            break;
        case 5:
    
            break;
        case 6:
    
            break;
        case 7:
    
            break;
        case 8:
    
            break;
        case 9:
    
            break;
        // case 10:
    
        //     break;
        default:
            //move 10
    
    }
}



const hand = document.querySelector('#me_player');
let userHand;

//Deck generation function
function gameStart(cardArray) {

    // playDeck = cardArray.map(Math.floor(Math.random() * cardArray.length))
    

    for (let i = cardArray.length -1; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        let k = cardArray[i]
        cardArray[i] = cardArray[j]
        cardArray[j] = k;
    }
        
    playDeck = cardArray.map(value => value);

    console.log(playDeck);

    dealCards();
}

    //function to populate player's hand at start
function dealCards() {
    
    let player1Hand;
    let player2Hand;
    let player3Hand;
    let player4Hand;

        player1Hand = playDeck.splice(0, 5);
    
        player2Hand = playDeck.splice(0, 5);
    
        player3Hand = playDeck.splice(0, 5);
    
        player4Hand = playDeck.splice(0, 5);

        console.log(player1Hand);
        console.log(player2Hand);
        console.log(player3Hand);
        console.log(player4Hand);
    
        //Switch statement to equate userHand to appropriate player Hand ??

        userHand = player1Hand;

        dealMeIn(userHand) 
        
}
    
    // let userHand = [8,'Q',5,9,3]

    function dealMeIn(myHand) {
           
            for (let c in myHand) {
                
                let handCard = document.createElement('div');
                handCard.id = `card${c}`;
                handCard.className = "cards"
                handCard.textContent = myHand[c];
                hand.appendChild(handCard);
            // } )
            }

            drawCard();
        };



 

        //function to draw 6th card on turn
        
function drawCard() {
    
    let drawCard = userHand.push(playDeck.splice(0, 1));

    let handCard = document.createElement('div');
    handCard.id = 'card5';
    handCard.className = "cards"
    handCard.textContent = drawCard;
    hand.appendChild(handCard);
}








gameStart(cardArray);



//JOKER FUNCTION





const card1 = document.querySelector('#card0');
const card2 = document.querySelector('#card1');
const card3 = document.querySelector('#card2');
const card4 = document.querySelector('#card3');
const card5 = document.querySelector('#card4');
const card6 = document.querySelector('#card5');

const cards = document.querySelectorAll('.cards');



/*play function
1) Select card, highlights*/

function addSelectClass(thisCard) {

    if (thisCard.classList.contains("selectedCard")) {
        thisCard.classList.remove("selectedCard")
    } 
    // else {
    //     thisCard.classList.add("selectedCard")
    // }
    //if classList does not include 'selectedCard', add class 'selectedCard'
    //else if classList does include 'selectedCard', remove class 'selectedCard'
    // let selectedCard = cardEl.classList.add('selectedCard')

    
    
}






card1.addEventListener('click', addSelectClass(card1))
card2.addEventListener('click', addSelectClass(card2))
card3.addEventListener('click', addSelectClass(card3))
card4.addEventListener('click', addSelectClass(card4))
card5.addEventListener('click', addSelectClass(card5))
card6.addEventListener('click', addSelectClass(card6))



// for (let i = 0; i < userHand.length; i++) {
//     if (userHand[i] = ) {
//         //send to discard deck if selected 
//     }
// }






/* Move token from home*/






// const cardEl = document.querySelector();

// cardEl.addEventListener('click', addSelectClass)



/*
    2) Highlight pieces and all possible moves (only for player)
        2a) function calculates all possible moves*/

// function possibleMoves() {

//     userTokensOnBoard.forEach()
//     //Highlight pieces on board, add class 'myPieces'

//     //Possible moves: 
//     //location of 'myPieces' + value of 'selectedCard'
//     //highlight all spaces from sum
// }


// const selection = document.querySelector



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

