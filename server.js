const PORT = process.env.PORT || 6969;
const db = require('./config/connection');
const path = require('path');
require('dotenv').config();
// const cookieParser = require('cookie-parser');
const { view_routes, auth_routes } = require('./controllers');
const GameBoard = require('./models/GameBoard.model');

//express
const express = require('express');
const app = require('express')();
//io is a socket.io server
const server = require('http').createServer(app);
const options = {};

const io = require("socket.io")(server, options);
//middleware that gets cookie and asks passport to deserialize it and return the user document
// let passportSocketIo = require("passport.socketio"); // NTH: maybe future use?


//handlebars template engine
const { engine } = require('express-handlebars');
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');


//manage sessions
const session = require('express-session');
const UserAcc = require('./models/UserAcc.model');
// const { databaseVersion } = require('./config/connection');
const { sessionMiddleware, wrap } = require('./serverControl');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);


app.use(express.static(path.join('views')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(sessionMiddleware);

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





//     browserConnection.on('tile-press', (tile) => {
//         console.log('message received')
//         console.log(`Someone has pressed ${tile}`)

//     });



//     browserConnection.on('chat message', (msg) => {
//         console.log('message: ' + msg);
//         console.log(browserConnection.id);
//         // io.to(socket.id).emit('hey', 'testing');
//         console.log(browserConnection.rooms);
//     });

//     browserConnection.on('create game', (host, lobbyName) => {
//         gameData.players.push
//         GameBoard.findOne({
//             where: {
//                 gameId: lobbyName
//             }
//         }).then(game => {
//             if (game) {
//                 browserConnection.emit('game exists', 'game exists');
//             } else {
//                 GameBoard.create({
//                     gameId: lobbyName,
//                     gameCreator: host,
//                     gamePlayers: JSON.stringify([host]),
//                     gameTurn: host,
//                     GameBoard: JSON.stringify(GameBoard.createGameBoard())
//                 }).then(game => {
//                     browserConnection.join(game.lobbyName);
//                     browserConnection.emit('game created', game.lobbyName);
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
//         browserConnection.join(`${lobbyName}`);
//         //then wait for the host to start the game

//     });

//     //when the join game button is clicked, the user is sent to the game lobby
//     browserConnection.on('join lobby', (user_socket, lobbyName) => {
//         // console.log('user joined lobby');
//         // console.log(browserConnection.id);
//         //grabs the socket id, socket.join the game lobby, and sends the user to the game lobby by changing handlebars to the game lobby
//         browserConnection.join(`${lobbyName}`);



//     });


//     browserConnection.on('joined game', (boolean) => {





//     });

//     browserConnection.on('start game', (socket) => {



//         // console.log('user joined game');
//         // console.log(browserConnection.id);

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
//     browserConnection.on('game over', (socket) => {
//         // console.log('game over');
//         // console.log(browserConnection.id);
//         //swaps the handlebars game html to the game over html
//         //changes the gameBoard database table to game over
//         //allows the users to go to the dashboard
//     });


//     browserConnection.on('player move', (user, card, pegId, lobbyName) => {
//         // console.log('player move');
//         // console.log(browserConnection.id);
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

//     browserConnection.on('chat message', (msg) => {
//         io.emit('chat message', msg);
//     });

//     browserConnection.on('turn data', (data) => {

//         //get the gameboard from the database
//         //then updata the gameboard with the new data
//         //create a array that has all teh current players of that gameboard from the database
//         //then send back the updated gameboard to the players(use socket id)

//         //io.emit( 'update gameboard', gameboard );
//     });



//     io.emit('test', 'blah');
//     //add connection to session

// });


// io.use(wrap(sessionMiddleware));

// const lobby = io.of('/lobby');
// lobby.on('connection', (browserConnection) => {
//     // let username;
//     // console.log(browserConnection.handshake.headers.cookie);
//     try{
//     let connectionSid = browserConnection.handshake.headers.cookie.split('sid=')[1].split(';')[0];
//     // console.log(`browserConnection.request.session: ${browserConnection.id}`);
//     } catch(err){
//         console.log('no cookie');
//     }
//     //finds the user associated with the socket id


//     async function findUser() {
//         let user = await UserAcc.findOne({
//             where: {
//                 sid: browserConnection.handshake.headers.cookie.split('sid=')[1].split(';')[0]
//             }
//         });
//         // console.log(`username: ${user.username}`);
//         return user;

//     }

//     console.log('user connected to  lobby');
//     console.log(browserConnection.id);
//     browserConnection.on('disconnect', () => {
//         console.log('user disconnected');
//     });
//     browserConnection.on('cookie time', async (cookie) => {
//         // console.log(browserConnection.handshake);
//         // console.log(browserConnection.server.engin);
//         const user = await findUser();
//         console.log(`user: ${user}`);
//         await user.update({ sid: connectionSid }, {
//             where: {
//                 socket: browserConnection.id
//             }
//         });


//         console.log(`cookie: ${cookie.value}`);
//     });

//     browserConnection.on('join game', (user, lobbyName) => {

//         browserConnection.join(`${lobbyName}`);
//         if (lobby.adapter.rooms[lobbyName].length < 4) {
//             browserConnection.emit('joined game', `${user} has joined the game`);


//         } else {
//             browserConnection.emit('room full', `${lobbyName} is currently full`);
//         }

//     });

//     browserConnection.on('create game', (host, lobbyName) => {
//         io.of("/lobby").in(`lobby${lobbyName}`).socketsJoin([`Game${lobbyName}`, `Chat${lobbyName}`]);
//         //create new gameboard and add it to the database
//         //find all the players in the game and add them to an array
//         browserConnection.emit('redirect', `/game/${lobbyName}`);

//         GameBoard.findOne({
//             where: {
//                 gameId: lobbyName
//             }
//         }).then(game => {
//             if (game) {
//                 browserConnection.emit('game exists', 'This game already exists');
//             } else {
//                 GameBoard.create({
//                     gameId: lobbyName,
//                     gameCreator: host,
//                     gamePlayers: JSON.stringify([host]),
//                     gameTurn: host,
//                     GameBoard: JSON.stringify(GameBoard.createGameBoard())
//                 }).then(game => {
//                     browserConnection.join(game.lobbyName);
//                     browserConnection.emit('game created', game.lobbyName);
//                 }).catch(err => {
//                     console.log(err);
//                 }
//                 );
//             }
//         }).catch(err => {
//             console.log(`error finding game: ${err}`);
//         });
//     });
//     browserConnection.on('start game', (user_socket, lobbyName) => {
//         io.to(`${lobbyName}`).emit('game started', 'game started');
//     }
//     );

// });








//sync db then start server
db.sync().then(() => {
    server.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`);
    });
});

