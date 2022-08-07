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
    return res.redirect('/register');
  }
  if (!password) {
    req.session.errors = ['Your password cannot be blank'];
    return res.redirect('/register');
  }

  /* user exists ? return newUser : return null */
  const newUser = await Account.findOne({
    where: {
      username
    }
  });

  /* user exists ? validate login and set session id : send user to register page */
  if (newUser) {
    // validate password bool (misspelled on purpose, and without reason)
    const validatePappword = await newUser.validatePass(password, newUser.passHash);
    
    // if pass is valid, setting the session user id to the newly created user's id
    if (validatePappword) {
      req.sesssion.save(() => {
        req.session.user_id = newUser.user_id;
      });
    } else { // otherwise, send error and return to login
      req.session.errors = ['Incorrect password; Please try again.'];
      res.redirect('/login');
    }
  } else { // sending the user to the register page
    res.session.errors = [`User doesn't exist. Please register.`];
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

  /* user exists ? created = false : created = true && return user */
  const [ user, created ] = await Account.findOrCreate({
    where: { // finding query looking for the username
      username: username
    },
    defaults: { // if there isn't a user, it will save passHash with user input password
      passHash: password
    }
  });

  /* user created ? save id to session and send them to dashboard : send user back to register page */
  if (created) {
    req.session.save(() => {
      // saving the id of the user to the session data
      req.session.user_id = user.user_id;
      // redirecting the user to root route
      res.redirect('/');
    });
  } else { // if the user was not created
    // saves verbose error and sends them to register
    req.session.errors = ['A user with that name already exists; Please choose another username'];
    res.redirect('/register');
  }
});

module.exports = auth_router;