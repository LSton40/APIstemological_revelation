const view_router = require('express').Router();
const { loggedIn } = require('../controllers/helper_functions');

// view_router.get('/lobby', loggedIn, (req, res) => {
// //check if the socket.id of the user matches that of the same user in a database
// //if it does, then send the user to the lobby
// //if it doesn't, then send the user to the login page
// });


view_router.get('/', loggedIn, (req, res) => {






    //if they are signed in, then send them to the lobby
    //if they are not signed in, then send them to the login page

    res.render('index');

});

view_router.get('/dashboard', loggedIn, (req, res) => {

    res.render('dashboard');
    //if they are signed in, then send them to the lobby
    //if they are not signed in, then send them to the login page

    // res.render('index');

});



view_router.get('/sign_in', loggedIn, (req, res) => {
    res.render('sign_in');
});

view_router.get('/register', loggedIn, (req, res) => {
    res.render('register');
});

view_router.get('/gameboard', loggedIn, (req, res) => {
    res.render('gameboard');
});


// function test(){
//     console.log('test');
//     return false;
// }


module.exports = view_router;