const PORT = process.env.PORT || 6969;
const db = require('./config/connection');
const path = require('path');
require('dotenv').config();
// const cookieParser = require('cookie-parser');
const { view_routes, auth_routes } = require('./controllers');
const GameBoard = require('./models/GameBoard.model');
const GameDataClass = require('./models/GameDataClass');
const playGame = require('./gameLogic/playGame');

/* express */
const express = require('express');
const app = require('express')();
//io is a socket.io server
const server = require('http').createServer(app);
const options = {};

const io = require("socket.io")(server, options);
//middleware that gets cookie and asks passport to deserialize it and return the user document
// let passportSocketIo = require("passport.socketio"); // NTH: maybe future use?


/* handlebars template engine */
const { engine } = require('express-handlebars');
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');


/* manage sessions */
const UserAcc = require('./models/UserAcc.model');
// const { databaseVersion } = require('./config/connection');
const { sessionMiddleware, wrap } = require('./serverControl');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);




/* express thangs */
app.use(express.static(path.join('views')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(sessionMiddleware);
io.use(wrap(sessionMiddleware));


/* JD's idea to store game data in a singe object instead of table stufs */
// i added some example data for us to visualize / start experimenting?
let gameData = {
  currPlayers: [
    {
      name: 'guy',
      userSID: {}, // grab useracc sid from session obj?
      pegColor: 'purple',
      pegs: [
        {
          pegID: 1,
          pegLocation: 3,
          isAtSpawn: false,
          isInFinish: false
        },
        {
          pegID: 2,
          pegLocation: null,
          isAtSpawn: false,
          isInFinish: true
        },
        {
          pegID: 3,
          pegLocation: null,
          isAtSpawn: true,
          isInFinish: false
        },
        {
          pegID: 4,
          pegLocation: null,
          isAtSpawn: true,
          isInFinish: false
        },
        {
          pegID: 5,
          pegLocation: null,
          isAtSpawn: true,
          isInFinish: false
        }
      ]
    },

  ],
  finishConditionMet: false,
  isStarted: true
};

// giving every route the gameData obj
app.use((req, res, next) => {
  req.gameData = gameData;
  next();
}) //app.use 

/* ************** */
/* ROUTE MOUNTING */
/* ************** */
app.use('/', view_routes);
app.use('/auth', auth_routes);





//     socket.on('create game', (host, lobbyName) => {
//         gameData.players.push
//         GameBoard.findOne({
//             where: {
//                 gameId: lobbyName
//             }
//         }).then(game => {
//             if (game) {
//                 socket.emit('game exists', 'game exists');
//             } else {
//                 GameBoard.create({
//                     gameId: lobbyN  ame,
//                     gameCreator: host,
//                     gamePlayers: JSON.stringify([host]),
//                     gameTurn: host,
//                     GameBoard: JSON.stringify(GameBoard.createGameBoard())
//                 }).then(game => {
//                     socket.join(game.lobbyName);
//                     socket.emit('game created', game.lobbyName);
//                 }).catch(err => {
//                     console.log(err);
//                 }
//                 );
//             }
//         }).catch(err => {
//             console.log(err);
//         }
//         );

//         //when the game is created by the host add the host to the lobby
//         socket.join(`${lobbyName}`);
//         //then wait for the host to start the game

//     });

//     //when the join game button is clicked, the user is sent to the game lobby
//     socket.on('join lobby', (user_socket, lobbyName) => {
//         // console.log('user joined lobby');
//         // console.log(socket.id);
//         //grabs the socket id, socket.join the game lobby, and sends the user to the game lobby by changing handlebars to the game lobby
//         socket.join(`${lobbyName}`);



//     });


//     socket.on('joined game', (boolean) => {





//     });

//     socket.on('start game', (socket) => {



//         // console.log('user joined game');
//         // console.log(socket.id);

//         //do some check to see if the game has enough players to start

//         //io.of("/lobby").in("roomX").socketsJoin("GameX");


//         // const uuid = require("uuid");

//         // io.engine.generateId = (req) => {
//         //     return uuid.v4(); // must be unique across all Socket.IO servers
//         // }


//         //generates a game for the user to join by calling the game-board.hbs template and storing the game data in the gameData obj for storing in the database
//         //swaps the handlebars lobby html to the game html
//         const gameId = socket.id;
//         //the users name who created the game
//         // const gameCreator = UserAcc.findOne({
//         //     where: {
//         //         gameId
//         //     }
//         // });

//         //if the game is ongoing, or if it is finished
//         let gameStatus = 'active';

//         //all player sockets from the game room
//         let gamePlayers = io.sockets.clients(gameId);

//         //keeps track of the current turn of the game(could either be a int or maybe the name of the player)
//         // gameTurn

//         //json object of the game board
//         // gameBoard

//         //game winner (could be a int or maybe the name of the player). this will be null if the game is not finished
//         // gameWinner:

//     });


//     //should probably be emitted from the backend by checking if the games' finish condition is met
//     socket.on('game over', (socket) => {
//         // console.log('game over');
//         // console.log(socket.id);
//         //swaps the handlebars game html to the game over html
//         //changes the gameBoard database table to game over
//         //allows the users to go to the dashboard
//     });


//     socket.on('player move', (user, card, pegId, lobbyName) => {
//         // console.log('player move');
//         // console.log(socket.id);
//         //updates the game data in the database
//         //sends the updated game data to the players/re-renders the game board


//         GameBoard.findOne({
//             where: {
//                 gameId: lobbyName
//             }
//         }).then(game => {

//             //receive the lobbies game data from the database
//             let gameBoard = JSON.parse(game.gameBoard);


//             //once done with changes
//             game.gameBoard = JSON.stringify(gameBoard);






//         })
//             .catch(err => {
//                 console.log(err);
//             });


//         let players = gameData.players;
//         let currPlayer = gameData.currPlayer;









//     });

//     socket.on('chat message', (msg) => {
//         io.emit('chat message', msg);
//     });

//     socket.on('turn data', (data) => {

//         //get the gameboard from the database
//         //then updata the gameboard with the new data
//         //create a array that has all teh current players of that gameboard from the database
//         //then send back the updated gameboard to the players(use socket id)

//         //io.emit( 'update gameboard', gameboard );
//     });



//     io.emit('test', 'blah');
//     //add connection to session

// });



// const lobby = io.of('/lobby');
// lobby.on('connection', (socket) => {
//   // let username;
//   // console.log(socket.handshake.headers.cookie);

//   console.log('user connected to  lobby');
//   console.log(socket.id);



//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
//   socket.on('cookie time', async (cookie) => {

//     console.log(`cookieTime cookie: ${cookie}`);




//     let cutCookie = socket.handshake.headers.cookie.split('sid=')[1].split(';')[0];
//     console.log(cutCookie)

//     let cookieOwner = await UserAcc.findOne({
//       where: {
//         socket: socket.id
//       }
//     });
//     console.log(cookieOwner);

//     await cookieOwner.update({ sid: cutCookie }, {
//       where: {
//         socket: socket.id
//       }
//     });



//   });

//   socket.on('join game', (user, lobbyName) => {

//     socket.join(`${lobbyName}`);
//     if (lobby.adapter.rooms[lobbyName].length < 4) {
//       socket.emit('joined game', `${user} has joined the game`);


//     } else {
//       socket.emit('room full', `${lobbyName} is currently full`);
//     }

//   });

//   socket.on('create game', (host, lobbyName) => {
//     io.of("/lobby").in(`lobby${lobbyName}`).socketsJoin([`Game${lobbyName}`, `Chat${lobbyName}`]);
//     //create new gameboard and add it to the database
//     //find all the players in the game and add them to an array
//     socket.emit('redirect', `/game/${lobbyName}`);

//     GameBoard.findOne({
//       where: {
//         gameId: lobbyName
//       }
//     }).then(game => {
//       if (game) {
//         socket.emit('game exists', 'This game already exists');
//       } else {
//         GameBoard.create({
//           gameId: lobbyName,
//           gameCreator: host,
//           gamePlayers: JSON.stringify([host]),
//           gameTurn: host,
//           GameBoard: JSON.stringify(GameBoard.createGameBoard())
//         }).then(game => {
//           socket.join(game.lobbyName);
//           socket.emit('game created', game.lobbyName);
//         }).catch(err => {
//           console.log(err);
//         }
//         );
//       }
//     }).catch(err => {
//       console.log(`error finding game: ${err}`);
//     });
//   });
//   socket.on('start game', (user_socket, lobbyName) => {
//     io.to(`${lobbyName}`).emit('game started', 'game started');
//   }
//   );

// });




/* ************************* */
/* gunguns socket experiment */
/* ************************* */

//auth socket will be used only listen to players who are currently on their turn
const auth = io.of('/auth');

auth.on('connection', (socket) => {

  //recieve turn data object on 'turn emit'
  socket.on('turn', turnData => {


    //run logic and return updated gameboard
    let updatedData = {};


    //send data to listeners in the socket room of the turn emitter
    socket.to(turnData.room).emit(updatedData);
    //disconnect user and connect new user

    socket.disconnect();

  });


  socket.on('disconnect', () => {
    console.log('users turn is over');
    socket.disconnect();
  });

});

//     socket.on('chat message', (msg) => {
//         console.log('message: ' + msg);
//         console.log(socket.id);
//         // io.to(socket.id).emit('hey', 'testing');
//         console.log(socket.rooms);
//     });



// defining the room we're listening for
const lobby = io.of('/lobby');
// lobby connection func
lobby.on('connection', async (socket) => {


  const destination = '/index.html';
  socket.emit('redirect', destination);



  /* declares all games being played */

  const gameLister = async () => {
    let gameList = await GameBoard.findAll();
    let filteredGames;
    if (gameList.length > 0) {
      filteredGames = gameList.map(game => {
        return {
          gameName: game.gameID,
          host: game.gameCreator,
          status: game.gameStatus
        };
      });

      if (filteredGames.length > 0) {
        socket.emit('current games', filteredGames);
      }
    }

    socket.emit('errors', 'no games');

  }



  // // finding user from the database by its username
  // const currDBUser = await UserAcc.findOne({ where: { username: currUser } }) || null;
  // // setting the user to have the socket id
  // const updatedUser = await currDBUser.update({ socket: socket.id });
  // grabbing the username from the frontend as it's being passed. [!!]could technically be modified on front end[!!]
  let currUser = socket.handshake.query['username'] || null;
  // NTH: let user set their color or theme from some options? 
  let currUserColor = socket.handshake.query['userColor'];

  console.log(`${currUser} has connected to the lobby`);

  gameLister();


  // // finding user from the database by its username
  // const currDBUser = await UserAcc.findOne({ where: { username: currUser } }) || null;
  // // setting the user to have the socket id
  // const updatedUser = await currDBUser.update({ socket: socket.id });








  /* ************************* */
  /* join game socket listener */
  /* ************************* */
  socket.on('joinGame', async (gameID) => {
    // finding game with gameID
    console.log('caught join game call');
    const gameRoom = await GameBoard.findOne({ where: { gameID: gameID } });


    if (gameRoom) {
      // grabbing gamePlayers from the game
      let roomPlayers = gameRoom.gamePlayers || [];

      //if the gameRoom exists, then add the socket user to the gameID room
      socket.join('gameID');
      console.log(`${currUser} has joined the ${gameID}`);

      // pushing user to gamePlayers
      roomPlayers.push({
        username: currUser,
        userColor: currUserColor
      });

      // setting the gamePlayers array after updating
      gameRoom.gamePlayers = roomPlayers;

    } else {
      // emitting any errors that occur
      socket.emit('errors', {
        error: 'Error joining room - please try agian!'
      });
    }
  });



  /* ******************** */
  /* create game listener */
  /* ******************** */
  socket.on('createGame', async (gameID) => {
    /* board exists ? created = false : created = true && return newGame */
    let currUser = socket.handshake.query['username'] || null;
    console.log('test2');




    /* TEST DATA */
    let testGameID = 'epicGameName';
    let testUserList = [
      {
        username: 'bryan',
        userColor: '0xF78DA7'
      },
      {
        username: 'datboi',
        userColor: '0x8ED1FC'
      },
      {
        username: 'jewishMom',
        userColor: '0xFF6900'
      },
      {
        username: 'ordinateur',
        userColor: '0xABB8C3'
      }
    ];

    const GameData = new GameDataClass(testGameID, testUserList, testUserList[0].username);

    console.log(GameData.gamePlayers);
    console.log('test3');

    /* game exists ? created = false : created = true && return game */
    const game = await GameBoard.create({
      gameID: GameData.gameID,
      gameCreator: GameData.gameCreator,
      gameStatus: GameData.gameStatus,
      gamePlayers: GameData.gamePlayers,
      gameTurn: GameData.gameTurn
    });

    socket.emit('logs', {
      game: game,
    });

    // console.log(GameData);
    // console.log(GameData.returnUsers());

    // console.log(`current turn: ${GameData.gameTurn}`);
    // console.log(`nextUserTurn called and the next player turn is: ${GameData.nextUserTurn()}`);




    // try {
    //   const [newGame, created] = await GameBoard.findOrCreate({
    //     where: { // finding query looking for the gameID
    //       gameID: gameID
    //     },
    //     defaults: { // if there isn't a game, it will save user to host variable
    //       gameCreator: currUser,
    //       gamePlayers: roomPlayers,
    //       gameTurn: currUser
    //     }
    //   });
    // } catch (err) {
    //   socket.emit('errors', {
    //     error: 'There was an error creating the game!',
    //     errorData: err
    //   });
    // }















    //find game by gameID and create it if it doesn't exist

    // GameBoard.findOrCreate({
    //   where: {
    //     gameID: gameID
    //   },
    //   defaults: {
    //     gameCreator: currUser,
    //     gamePlayers: JSON.stringify([{
    //       username: currUser
    //     }])
    //   }
    // }).then(game => {
    //   console.log(game);
    // });






    // if (created) {
    //   // defining the playerList to include the host
    //   let roomPlayers = [];
    //   roomPlayers.push({
    //     username: currUser,
    //     userColor: currUserColor
    //   });

    //   // setting the gamePlayers array after updating
    //   gameRoom.gamePlayers = roomPlayers;

    //   gameLister();




    //   socket.emit('redirect', '/lobby');

    


    // } else {
    //   socket.emit('errors', {
    //     error: 'Error creating room - room with that name must already exist!'
    //   });
    // }


  });


  /* ************* */
  /* GUNGUNTESTING */
  /* ************* */
  socket.on('testQuery', async (gameID) => {
    // playGame.getGameData(gameID);
    // console.log(await playGame.getGameData(gameID));
    playGame.initDealCards(gameID);
    console.log(await playGame.initDealCards(gameID));

    socket.emit('redirect', '/lobby');
  });
  /* ************* */
  /* GUNGUNTESTING */
  /* ************* */





  /* ******************* */
  /* disconnect listener */
  /* ******************* */
  socket.on('disconnect', () => {
    console.log(`${currUser} has disconnected from the lobby`);
    // socket.socket.reconnect();
    socket.disconnect();
  });




});

//sync db then start server
db.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
});

