const PORT = process.env.PORT || 3333;
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
// const { engine } = require('express-handlebars');
// app.engine('hbs', engine({ extname: '.hbs' }));
// app.set('view engine', 'hbs');


//manage sessions
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.SESSION_AGENT_MAN,
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



//landing page
app.get('/', (req, res) => {
    console.log("landing page");
    res.sendFile(__dirname + '/index.html');
});

app.get('/test', (req, res) => {
    console.log("landing page");
    res.sendFile(__dirname + '/index2.html');
});

//check if user is logged in
io.on('connection', (browserConnection) => {
    console.log('a user connected');
    browserConnection.on('disconnect', () => {
        console.log('user disconnected');
    }

    );
    browserConnection.on('chat message', (msg) => {
        console.log('message: ' + msg);
        console.log(browserConnection.id);
        // io.to(socket.id).emit('hey', 'testing');

    });
    io.emit('test', 'blah');
    //add connection to session

});

//listen for 'message' events from the client and print the message to the console




//sync db then start server
db.sync().then(() => {
    server.listen(3222, () => {
        console.log(`Listening on port ${PORT}`);
    });
});

