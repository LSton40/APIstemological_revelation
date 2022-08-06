const PORT = process.env.PORT || 6969;
const db = require('./config/connection');
const path = require('path');
require('dotenv').config();


//express
const express = require('express');
const app = require('express')();
//io is a socket.io server
const server = require('http').createServer(app);
const options = {};
const io = require("socket.io")(server, options);

//handlebars template engine
const { engine } = require('express-handlebars');
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');


//manage sessions
const session = require('express-session');
const UserAcc = require('./models/UserAcc.model');
const SequelizeStore = require('connect-session-sequelize')(session.Store);





// app.use(express.static(path.join('front')));

app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.SESSION_AGENT_MAN || '69420', // NTH: deprecated? provide secret option
    store: new SequelizeStore({ db }),
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: false
    }
}));

//set route defaults for any routes or authorization paths
// const { routes, authorization } = require('./controllers');
// app.use('/', routes);
// app.use('/auth', authorization);


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
})

//landing page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//check if user is logged in
io.on('connection', (browserConnection) => {
    browserConnection.on('create game', (msg) => {
        gameData.players.push
    });
    console.log(`User: ${browserConnection.id} connected to the server`);
    browserConnection.on('disconnect', (browserConnection) => {
        console.log('user disconnected');
    }

    );
    browserConnection.on('chat message', (msg) => {
        console.log('message: ' + msg);
        console.log(browserConnection.id);
        // io.to(socket.id).emit('hey', 'testing');

    });

    //when the join game button is clicked, the user is sent to the game lobby
    browserConnection.on('join lobby', (socket) => {
        // console.log('user joined lobby');
        // console.log(browserConnection.id);
        //grabs the socket id, socket.join the game lobby, and sends the user to the game lobby by changing handlebars to the game lobby



    });


    browserConnection.on('joined game', (socket) => {





    });

    browserConnection.on('start game', (socket) => {
        // console.log('user joined game');
        // console.log(browserConnection.id);
        //generates a game for the user to join by calling the game-board.hbs template and storing the game data in the gameData obj for storing in the database
        //swaps the handlebars lobby html to the game html
    });


    //should probably be emitted from the backend by checking if the games' finish condition is met
    browserConnection.on('game over', (socket) => {
        // console.log('game over');
        // console.log(browserConnection.id);
        //swaps the handlebars game html to the game over html
        //changes the gameBoard database table to game over
        //allows the users to go to the dashboard
    });


    browserConnection.on('player move', (gameData) => {
        // console.log('player move');
        // console.log(browserConnection.id);
        //updates the game data in the database
        //sends the updated game data to the players





        let players = gameData.players;
        let currPlayer = gameData.currPlayer;









    });




    io.emit('test', 'blah');
    //add connection to session

});



//listen for 'message' events from the client and print the message to the console




//sync db then start server
db.sync().then(() => {
    server.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`);
    });
});

