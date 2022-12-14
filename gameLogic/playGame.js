const GameBoard = require('../models/GameBoard.model');
const drawPile = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const gameRoomPinger = async(gameID) => { await GameBoard.findOne({ where: { gameID: gameID } })}

module.exports = {
  gameMaker: async(GameData) => {
    let newGameRoom = GameBoard.findOrCreate({ 
      where: {
        gameID: GameData.gameID,
    }, 
      defaults: {
        gameCreator: GameData.gameCreator,
        gameStatus: GameData.gameStatus,
        gamePlayers: GameData.gamePlayers,
        gameTurn: GameData.gameTurn
    }});

    // if it is there, it just overwrites the one found
    newGameRoom.update({
      gameID: GameData.gameID,
      gameCreator: GameData.gameCreator,
      gameStatus: GameData.gameStatus,
      gamePlayers: GameData.gamePlayers,
      gameTurn: GameData.gameTurn
    });

    return newGameRoom;
  },
  getGameData: async(gameID) => {
    const gameRoom = gameRoomPinger(gameID);
    return gameRoom
  },
  initDealCards: async(gameID) => {
    const gameRoom = gameRoomPinger(gameID);
    console.log(gameRoom.gamePlayers);

    // ref array for easier
    let gamePlayers = gameRoom.gamePlayers;
    
    // nested for loop to create 5 cards and push them to each players hand
    for (let i = 0; i < gamePlayers.length; i++) {
      tempHand = [];
      for (let j = 0; j < 5; j++) {
        // generate index for card
        cardIndex = Math.floor(Math.random() * drawPile.length);
        // push to tempcard array
        tempHand.push(drawPile[cardIndex]);
      }
      // then sets the random hand to the current user 
      gamePlayers[i].hand = tempHand;
    }

    // updates the database with the new hands for everyone
    const updatedGameRoom = await gameRoom.update({
      gamePlayers: gamePlayers 
    },
    {
      where: {
        gameID: gameID
      }
    });

    return updatedGameRoom.gamePlayers;
  },
  playCard: async(gameID, player, card) => {
    const gameRoom = gameRoomPinger(gameID);
    let gamePlayers = gameRoom.gamePlayers;

    let playerI = gamePlayers.indexOf( obj => {
      if (obj.username == player) {
        return true;
      }
    });

    return gamePlayers[playerI].hand.splice(card, 1);
  },
  movePeg: async(gameID, pegID, pegLoc) => {
    const gameRoom = gameRoomPinger(gameID);
    let gamePlayers = gameRoom.gamePlayers;
    let playerI, pegI;

    // then iterates through and finds the mathing pegID to update its location
    for (let i = 0; i < gamePlayers.length; i++) {
      for (let j = 0; j < gamePlayers[i].pegs.length; j++) {
        if ( gamePlayers[i].pegs[j].pegID == pegID ) {
          playerI = i;
          pegI = j;
        } 
      }
    }


    // if the peg is in the finish location of any of the players
    switch (playerI) {
      case 0:
      if (pegLoc >= 72) {
        gamePlayers[playerI].pegs[pegI].pegLocation = null;
        gamePlayers[playerI].pegs[pegI].isInFinish = true;
      } else if (gamePlayers[playerI].pegs[pegI].isAtSpawn) {
        gamePlayers[playerI].pegs[pegI].pegLocation = 3 + pegLoc;
        gamePlayers[playerI].pegs[pegI].isAtSpawn = false;
      }
        break;
      case 1:
      if (pegLoc >= 77) {
        gamePlayers[playerI].pegs[pegI].pegLocation = null;
        gamePlayers[playerI].pegs[pegI].isInFinish = true;
      } else if (gamePlayers[playerI].pegs[pegI].isAtSpawn) {
        gamePlayers[playerI].pegs[pegI].pegLocation = 21 + pegLoc;
        gamePlayers[playerI].pegs[pegI].isAtSpawn = false;
      }
        break;
      case 2:
      if (pegLoc >= 82) {
        gamePlayers[playerI].pegs[pegI].pegLocation = null;
        gamePlayers[playerI].pegs[pegI].isInFinish = true;
      } else if (gamePlayers[playerI].pegs[pegI].isAtSpawn) {
        gamePlayers[playerI].pegs[pegI].pegLocation = 39 + pegLoc;
        gamePlayers[playerI].pegs[pegI].isAtSpawn = false;
      }
        break;
      case 3:
      if (pegLoc >= 87) {
        gamePlayers[playerI].pegs[pegI].pegLocation = null;
        gamePlayers[playerI].pegs[pegI].isInFinish = true;
      } else if (gamePlayers[playerI].pegs[pegI].isAtSpawn) {
        gamePlayers[playerI].pegs[pegI].pegLocation = 57 + pegLoc;
        gamePlayers[playerI].pegs[pegI].isAtSpawn = false;
      }
        break;
      default:
        gamePlayers[playerI].pegs[pegI].pegLocation = pegLoc;
        gamePlayers[playerI].pegs[pegI].isAtSpawn = false;
        break;
    }

    // first iterates through all players and pegs to find if there's one in it's spot
    for (let i = 0; i < gamePlayers.length; i++) {
      for (let j = 0; j < gamePlayers[i].pegs.length; j++) {
        if ( gamePlayers[i].pegs[j].pegLocation == pegLoc) {
          gamePlayers[i].pegs[j].pegLocation = null;
          gamePlayers[i].pegs[j].isAtSpawn = true;
          }
        }
      }

    // saving updated gamePlayers to gameRoom with the gameID
    const updatedGameRoom = await gameRoom.update({gamePlayers: gamePlayers }, {
      where: {
        gameID: gameID
      }
    });

    return updatedGameRoom;
  },
  dealCard: (gameID, player, cardPlayed) => {
    const gameRoom = gameRoomPinger(gameID);
    let gamePlayers = gameRoom.gamePlayers;


    let tempHand = [];
    let playerIndex;
    
    // grabs the hand from the player
    for (let i = 0; i < gamePlayers.length; i++) {
      if ( gamePlayers[i].username == player) {
        tempHand = gamePlayers[i].hand;
        playerIndex = i;
      }
    }

    // grabs index of played card and slices from array
    let cardIndex = tempHand.indexOf(cardPlayed);
    tempHand.splice(cardIndex, 1);

    // generate index for card
    newCardIndex = Math.floor(Math.random() * drawPile.length);
    // push to tempcard array
    tempHand.push(drawPile[cardIndex]);
    // setting hand in JSON data
    gamePlayers.playerIndex.hand = tempHand;

    const updatedGameRoom = gameRoom.update({gamePlayers: gamePlayers}, {
      where: {
        gameID: gameID
      }
    });

    return updatedGameRoom;
  },
  getAllPegs: (gameID) => {
    const gameRoom = gameRoomPinger(gameID);

    let pegList = [];
    // first looping through all the players
    for (let i = 0; i < gameRoom.gamePlayers.length; i++) {
      // for each player, loop through all the pegs
      for (let j = 0; j < gameRoom.gamePlayer[i].pegs.length; j++) {
        pegList.push({ // push each peg data to the peg array for easy rendering
          userID: gameRoom.gamePlayer[i].pegs[j].pegID,
          pegLoc: gameRoom.gamePlayer[i].pegs[j].pegLocation,
          atSpawn: gameRoom.gamePlayer[i].pegs[j].isAtSpawn,
          inFinish: gameRoom.gamePlayer[i].pegs[j].isInFinish,
          pegColor: gameRoom.gamePlayers[i].userColor
        });
      }
    }
    return pegList;
  },
  getPlayerData: async(gameID) => {
    const gameRoom = gameRoomPinger(gameID);

    let gamePlayers = gameRoom.gamePlayers;
    let playerData = [];
    

    for (let i = 0; i < gamePlayers.length; i++) {
      let pegsAtSpawn = 0;
      let pegsInFinish = 0;
      for (let j = 0; j < gamePlayers[i].pegs.length; j++) {
        gamePlayers[i].pegs[j].isAtSpawn ? pegsAtSpawn++ : false;
        gamePlayers[i].pegs[j].isInFinish ? pegsInFinish++ : false;
      }
      playerData.push({
        username: gamePlayers[i].username,
        userColor: gamePlayers[i].userColor,
        pegsAtSpawn: pegsAtSpawn,
        pegsInFinish: pegsInFinish
      })
    }

    return playerData;
  },
  checkIfWin: async(gameID) => {
    const gameRoom = gameRoomPinger(gameID);
    let gamePlayers = gameRoom.gamePlayers;

    for (let i = 0; i < gamePlayers.length; i++) {
      currPlayerPoints = 0;
      for (let j = 0; j < gamePlayers[i].pegs.length; j++) {
        gamePlayers[i].pegs[j].isInFinish ? currPlayerPoints++ : false;
      }
      if (currPlayerPoints == 5) {
        return gamePlayers[i].username;
      }
    }

    return false;
  }
}








































// /************
//  FUNCTIONS STILL TO CONSIDER
// ************/

// /* Counters 

//     Opponents' Starting counter arrays
//     Opponents' Home counter arrays

//     Handled automatically through the sockets connection???
//     */

//    //JOKER FUNCTION

   






// /************************
//  FUNCTIONS TO FINISH
// ************************/


// //assign values to "cards": spaces to play

// // 2) Highlight pieces and all possible moves (only for player)
// // 2a) function calculates all possible moves*/

// //     //Highlight pieces on board, add class 'myPieces'

// //     //Possible moves: 
// //     //location of 'myPieces' + value of 'selectedCard'
// //     //highlight all spaces from sum
// // }



// //Function that highlights the possible moves given the value of the card selection
// function iLikeToMoveItMoveIt(select) {

//     switch(select) {
//         case "A":
//             x + 1
//             break;
//         // case 'J':
    
//         //     break;
//         // case 'Q':
    
//         //     break;
//         // case 'K':
    
//         //     break;
//         case "2":
//             x + 2
//             break;
//         case "3":
//             x + 3
//             break;
//         case "4":
//             x + 4
//             break;
//         case "5":
//             x + 5
//             break;
//         case "6":
//             x + 6
//             break;
//         case "7":
//             x + 7
//             break;
//         case "8":
//             x + 8
//             break;
//         case "9":
//             x + 9
//             break;
//         // case 10:
    
//         //     break;
//         default:
//             x + 10
    
//     }
// }






// /********************************************************************************************************************* */




   
// const cardSelect = document.querySelector('.selectedCard');
// const hCounter = document.querySelector('#hCounter');
// const sCounter = document.querySelector('#sCounter');
// const bCounter = document.querySelectorAll('.basecounters');
// const hand = document.querySelector('#me_player');
// const card1 = document.querySelector('#card0');
// const card2 = document.querySelector('#card1');
// const card3 = document.querySelector('#card2');
// const card4 = document.querySelector('#card3');
// const card5 = document.querySelector('#card4');
// const card6 = document.querySelector('#card5');

// const cards = document.querySelectorAll('.cards');



// //Array of userTokens within the Starting Area
// const userTokens = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]

// //Array of userTokens currently in play on the board
// const userTokensOnBoard = [];

// //Array of userTokens that have reached home base
// const userHome = [];


// //Base Array of all cards
// const cardArray = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// //Variable for the Shuffled Deck
// let playDeck;

// //Deck Discard pile array
// const discard = [];

// //Variable for the user's current hand of cards
// let userHand;

// /********************
// Token Ticker Counters
// **********************/

// //Displays number of tokens in starting area at beginning of game
// function startCounter() {

//     for (let c in userTokens) {
//         let basecounter = document.createElement('span');
//         basecounter.className = "basecounters"
//         basecounter.textContent = '|';
//         sCounter.appendChild(basecounter);
//     };
// }

// //Displays number of tokens that have reached home base
// function homeCounter() {

//     let hometokens = document.createElement('span');
//     hometokens.className = "homecounters"
//     hometokens.textContent = '|';
//     hCounter.appendChild(hometokens);
// }





// //Starts game: shuffles cards, pushes into playDeck, then passes to the dealCards function
// function gameStart(cardArray) {

//     for (let i = cardArray.length -1; i > 0; i--) {
//         let j = Math.floor(Math.random() * i);
//         let k = cardArray[i]
//         cardArray[i] = cardArray[j]
//         cardArray[j] = k;
//     }
        
//     playDeck = cardArray.map(value => value);

//     dealCards();
// }

// //Populates all players' hands from shuffled playDeck and equates the userHand with their player id
// //Calls the counter for the tokens in the start area
// //Calls the dealMeIn function
// function dealCards() {
    
//     let player1Hand;
//     let player2Hand;
//     let player3Hand;
//     let player4Hand;

//         player1Hand = playDeck.splice(0, 5);
    
//         player2Hand = playDeck.splice(0, 5);
    
//         player3Hand = playDeck.splice(0, 5);
    
//         player4Hand = playDeck.splice(0, 5);

//         console.log(player1Hand);
//         console.log(player2Hand);
//         console.log(player3Hand);
//         console.log(player4Hand);
    

//         //Switch statement to equate userHand to appropriate player Hand ??

//         userHand = player1Hand;

//         startCounter();
//         dealMeIn(userHand);
        
// }
    
    
// //Displays the player's hand in the HTML
// function dealMeIn(myHand) {
    
//     for (let c in myHand) {
        
//         let handCard = document.createElement('div');
//         handCard.id = `card${c}`;
//         handCard.className = "cards"
//         handCard.textContent = myHand[c];
//         hand.appendChild(handCard);
//     }

// };



 

// //On player's turn, draws a card and displays it in the HTML
// function drawCard() {
    
//     let drawCard = userHand.push(playDeck.splice(0, 1));

//     let handCard = document.createElement('div');
//     handCard.id = 'card5';
//     handCard.className = "cards"
//     handCard.textContent = drawCard;
//     hand.appendChild(handCard);
// }



// //Removes token from userTokens when a piece moves out of start position
// //Also removes counter from header
// function comeOut() {

//     const emergePiece = userTokens.splice(0, 1);
//     const token = emergePiece.find(el => el);
//     userTokensOnBoard.push(token);

//     bCounter[0].remove();
// }

// //Removes the played card to the discard pile upon piece click
// //Reassigns ids of remaining cards in hand
// function discardDatCard() {
    
//     const discardCard = userHand.find(cardSelect.textContent);
//     discard.push(discardCard);
    
//     cardPlayed(discardCard)

//     cardSelect.remove();
    
//     for (let c in cards) {
//         cards[c].id = `card${c}`;
//     }
// }

// //Displays the played card to the header for a few seconds
// function cardPlayed(showAll) {
    
//     const playPlayer = document.querySelector('#player1');
//     const playCard = document.createElement('div');
//     playCard.textContent = showAll;
//     playPlayer.appendChild(playCard);
    
//     setTimeout(() => {
//         playCard.remove();
//     }, 5000)
    
// }


// //Removes token from the userTokensOnBoard array when it reaches Home base
// //Adds calls homeCounter function to add home counter to header
// function goHome() {

//     const exitPiece = userTokensOnBoard.splice(0, 1);
//     const byeToken = exitPiece.find(el => el);
//     userHome.push(byeToken);

//     homeCounter();
// }


// //If all of the user's pieces enter home base, the game ends
// function winCondition() {

//     if (userHome.length = 5) {
//         //Game over message
//     }
// }


// //Starts game on page load
// gameStart(cardArray);


// card1.addEventListener('click', addSelectClass)
// card2.addEventListener('click', addSelectClass)
// card3.addEventListener('click', addSelectClass)
// card4.addEventListener('click', addSelectClass)
// card5.addEventListener('click', addSelectClass)
// card6.addEventListener('click', addSelectClass)





// // for (let i = 0; i < userHand.length; i++) {
// //     if (userHand[i] = ) {
//     //         //send to discard deck if selected 
// //     }
// // }




// /*
//     3) Click piece = submit
//     3a) piece moves (remove from one space, add to calculated space)
//     3b) piece and space highlighting disappears */


// /*




//     4) turn ends


// */


// //function to display turn-player's selection number to header





// /*Endgame algorithms
//     1) Piece reaches home: only exact number or passes
//     2) land on home space: piece removed from board
//         2a) player home counter +1
//         2b) show # of home tokens for each player
//     3) Counter = 5, game ends
//     4) Some kind of game over message, winner logged


// */




// /*Function for landing on opponent piece
//     1) User player piece replaces opponent player piece
//     2) Opponent player piece removed from board
//         2a) Opponent players Starting counter +1

// */

