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
const { engine } = require('express-handlebars');
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');


//manage sessions
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);





// app.use(express.static(path.join('front')));

app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

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
    res.sendFile(__dirname + '/index.html');
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
    server.listen(3222, () => {
        console.log(`Listening on port ${PORT}`);
    });
});

