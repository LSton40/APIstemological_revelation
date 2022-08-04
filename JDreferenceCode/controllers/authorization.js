const authorization = require('express').Router();
const Bubble = require('../models/Bubble');
const { isLoggedIn } = require('./login');

authorization.post('/register', isLoggedIn, (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    req.session.errors = ['Please check your credentials and try again.'];
    return res.redirect('/register');
  }

  Bubble.findOne({
    where: {
      email
    }
  }).then(user => {
    if (user) {
      req.session.errors = ["What? Coudln't be more original? A user already exists with that email address!"];
      return res.redirect('/register');
    }

    Bubble.create(req.body)
      .then(new_user => {
        req.session.save(() => {
          req.session.user_id = new_user.id;
          res.redirect('/');
        });
      }).catch(err => {
        console.log(err);
        req.session.errors = err.errors.map(e => e.message);
        res.redirect('/register');
      });
  });
});

authorization.post('/login', isLoggedIn, (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    req.session.errors = ["Please check your credentials and try again, or we'll think you're a Russian spy and black bag your ass!"];
    return res.redirect('/login');
  }

  Bubble.findOne({
    where: {
      email
    }
  }).then(async user => {
    if (!user) {
      req.session.errors = ["No user account found matching that email address. Are you a hacker or a slacker? We're watching you!"];
      return res.redirect('/login');
    }

    const pass_is_valid = await user.validatePassword(password, user.password);
  
    if (!pass_is_valid) {
      req.session.errors = ["Your password is incorrect. This is becoming a habit for you, isn't it? Maybe we need to talk about your drinking..."];
      res.redirect('/login');
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      res.redirect('/');
    });
  })
});

authorization.get('/logout', (req, res) => {
  if (!req.session.user_id) return res.redirect('/');

  req.session.destroy(() => {
    res.redirect('/');
  });
})

module.exports = authorization;