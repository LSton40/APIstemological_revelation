const routes = require('express').Router();
const { isLoggedIn } = require('./login');
const Bubble = require('../models/Bubble');

routes.get('/', isLoggedIn, (req, res) => {
  const user_id = req.session.user_id;

  if (user_id) {
    
    return Bubble.findOne({
      where: {
        id: user_id
      },
      attributes: ['id', 'email', 'username']
    })
      .then(user => {
        user = {
          username: user.username,
          email: user.email
        };
        res.render('index', { user });
      });
  }

  res.render('index');
});

// routes.get('/login', isLoggedIn, (req, res) => {
//   res.render('login', { errors: req.session.errors });
// });

// routes.get('/register', isLoggedIn, (req, res) => {
//   res.render('register', { errors: req.session.errors });
// });

module.exports = routes;