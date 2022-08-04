const express = require('express');
const path = require('path');

const { engine } = require('express-handlebars');
const PORT = process.env.PORT || 3333;

const db = require('./config/connection');
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);


require('dotenv').config();

// Pull in our view routes object from the index file
const { routes, authorization } = require('./controllers');

const app = express();


app.use(express.static(path.join('front')));

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

app.use('/', routes);
app.use('/auth', authorization);

db.sync().then(() => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});