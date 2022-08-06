// auth_router = require('express').Router();
// const User = require('../models/UserAcc.model');
// auth_router.post('/login', loggedIn, (req, res) => {


//     //use socket.id to check if the user is logged in
//     //if it is, then send the user to the lobby
//     //if it isn't, then send the user to the login page


//     const { username, password } = req.body;

//     if (!username || !password) {
//         res.redirect('/login');
//     }

//     User.findOne({
//         where: {
//             username: username
//         }
//     })
//         .then( user => {
//             if (!user) {
//                 //send error message
//                 res.redirect('/login');
//             }
//             //check password using some valiatepasswprd function form the user class
//             const isMatch = await user.validatePassword(password, user.password);

//             if (!isMatch) {
//                 //send error message
//                 res.redirect('/login');
//             }
//             else{
//                 //....
//              }

//             //save session and redirect to index.hbs


//         });




    

// });