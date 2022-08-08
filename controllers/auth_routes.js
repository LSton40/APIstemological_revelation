//
// made by fixedOtter 6.8.2022
//

auth_router = require('express').Router();
const Account = require('../models/UserAcc.model');
const { loggedIn } = require('./helper_functions');

auth_router.post('/login', loggedIn, async(req, res) => {
  /* grabbing user input from request */
  const { username, password } = req.body;

  /* error handling / input validation */
  if (!username) {
    req.session.errors = ['Your username cannot be blank'];
    return res.redirect('/login');
  }
  if (!password) {
    req.session.errors = ['Your password cannot be blank'];
    return res.redirect('/login');
  }

  /* user exists ? return existingUser : return null */
  const existingUser = await Account.findOne({
    where: {
      username
    }
  });

  /* user exists ? validate login and set session id : send user to register page */
  if (existingUser) {
    if (loginChecker(password, existingUser)) {
      // clearing errors and saving id and username
      req.session.errors = [''];
      req.session.user_id = existingUser.id;
      req.session.username = existingUser.username;
      req.session.passHash = existingUser.passHash;
      // saving session data and redirecting to root route
      req.session.save();
      res.redirect('/');
    } else {
      req.session.errors = ['Incorrect password; Please try again.'];
      res.redirect('/login');
    }
  } else { // sending the user to the register page
    req.session.errors = [`User doesn't exist. Please register.`];
    res.redirect('/register');
  }

});



auth_router.post('/register', loggedIn, async(req, res) => {
  /* grabbing the data from the user */
  const { username, password } = req.body;

  /* error handling / input validation */
  if (!username) {
    req.session.errors = ['Your username cannot be blank'];
    return res.redirect('/register');
  }
  if (!password) {
    req.session.errors = ['Your password cannot be blank'];
    return res.redirect('/register');
  }

  /* user exists ? created = false : created = true && return newUser */
  const [ newUser, created ] = await Account.findOrCreate({
    where: { // finding query looking for the username
      username: username
    },
    defaults: { // if there isn't a user, it will save passHash with user input password
      //add the session id to the sid column
      passHash: password,
      socket: req.session.id
    }
  });

  /* user created ? save id to session and send them to dashboard : send user back to register page */
  if (created) {
    // validate the user login
    if (loginChecker(password, newUser)) {
      // clearing errors and saving id and username
      console.log(req.session);
      req.session.errors = [''];
      req.session.user_id = newUser.id;
      req.session.username = newUser.username;
      req.session.passHash = newUser.passHash;
      // saving session data and redirecting to root route
      req.session.save();
      res.redirect('/lobby');
      res.render('lobby', { layout: 'game_center.hbs' });

    }
  } else { // if the user was not created find the user and see if they had the right login
    /* user exists ? return newUser : return null */
    const existingUser = await Account.findOne({
      where: {
        username
      }
    });
    if (loginChecker(password, existingUser)) {
      // clearing errors and saving id and username
      req.session.errors = [''];
      req.session.user_id = existingUser.id;
      req.session.username = existingUser.username;
      req.session.passHash = existingUser.passHash;
      // saving session data and redirecting to root route
      req.session.save();
      res.render('lobby', { layout: 'game_center.hbs' });
    } else {
    // saves verbose error and sends them to register
    req.session.errors = ['A user with that name already exists; Please choose another username'];
    res.redirect('/lobby');
    res.render('lobby', { layout: 'game_center.hbs' });    }
  }
});

auth_router.get('/logout', (req,res) => {!req.session.username ? res.redirect('/') : req.session.destroy(() => {res.redirect('/')})});

/* checks login */
const loginChecker = async(password, user) => {await user.validatePass(password, user.passHash)}

module.exports = auth_router;