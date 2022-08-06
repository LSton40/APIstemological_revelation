const PORT = process.env.PORT || 6969;
const db = require('./config/connection');
// const path = require('path');
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
const UserAcc= require('./models/UserAcc.model');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


// app.use(express.static(path.join('front')));

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
        { pegID: 1,
          pegLocation: 3,
          isAtSpawn: false,
          isInFinish: false },
        { pegID: 2,
          pegLocation: null,
          isAtSpawn: false,
          isInFinish: true },
        { pegID: 3,
          pegLocation: null,
          isAtSpawn: true,
          isInFinish: false },
        { pegID: 4,
          pegLocation: null,
          isAtSpawn: true,
          isInFinish: false },
        { pegID: 5,
          pegLocation: null,
          isAtSpawn: true,
          isInFinish: false }
      ]
    },

  ],
  finishConditionMet: false,
  isStarted: true
  };

// giving every route the gameData obj
app.use((req,res,next) => {
  req.gameData = gameData;
  next();
})

//landing page
app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/index.html');
  req.gameData.currPlayers[0].name = 'JD';
  console.log(req.gameData);
  res.json(req.gameData);
});

app.get('/test', (req, res) => {
  // res.sendFile(__dirname + '/index.html');
  req.gameData.currPlayers[0].name = 'gunnar';
  console.log(req.gameData);
  res.json(req.gameData);
});

//check if user is logged in
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    }
    );
    //example of sending a message to the client
    // socket.on('chat message', (msg) => {
    //     console.log('message: ' + msg);
    //     io.emit('chat message', msg);
    // }
    // );
});

//sync db then start server
db.sync().then(() => {
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
});

