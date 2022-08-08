require('dotenv').config();
const view_router = require('express').Router();
const { Router } = require('express');
const { loggedIn } = require('../controllers/helper_functions');
const { GameBoard } = require('../models/GameBoard.model');
const { UserAcc } = require('../models/UserAcc.model');



view_router.get('/', loggedIn, (req, res) => {



    //add the sid of the user to the database
    // updateSid();

    //if they are signed in, then send them to the lobby
    //if they are not signed in, then send them to the login page
    res.render('index', { username: req.session.username });

});

view_router.get('/dashboard', loggedIn, (req, res) => {



    // updateSid();



    res.render('dashboard');
    //if they are signed in, then send them to the lobby
    //if they are not signed in, then send them to the login page

    // res.render('index');

});


view_router.get('/lobby', loggedIn, (req, res) => {
    // updateSid();
    res.render('lobby', { layout: 'game_center.hbs' });
});



view_router.get('/login', loggedIn, (req, res) => {
    // updateSid();
    res.render('sign_in', { errors: req.session.errors });
});

view_router.get('/register', loggedIn, (req, res) => {
    // updateSid();
    // res.render('lobby', { layout: 'game_center.hbs' });
    res.render('register', { errors: req.session.errors });
});

view_router.get('/gameboard', loggedIn, (req, res) => {
    // updateSid();
    res.render('gameboard');
});


view_router.get('/gameboard/:id', loggedIn, async (req, res) => {
    // updateSid();
    const { id } = req.params;
    console.log(req.params);
    console.log('this path works');
    const game = await GameBoard.findOne({
        where: {
            id: id
        }
    }).then(game => {
        if (game) {
            res.render('gameboard', { game: game });
        } else {
            res.render('gameboard');
        }



    }).catch(err => {
        console.log(err);
    });

    if (game) {
        //adds the user to the namespace and then redirects to the gameboard

        res.render('gameboard');







    } else {
        res.redirect('/');
    }
});


// function updateSid() {
//     UserAcc.update({
//         sid: req.session.sid
//     }, {
//         where: {
//             username: req.session.username
//         }
//     }).then(() => {
//         // console.log('sid added to useracc');
//     }).catch(err => {
//         console.log(err);
//     });
// }




// function test(){
//     console.log('test');
//     return false;
// }


module.exports = view_router;