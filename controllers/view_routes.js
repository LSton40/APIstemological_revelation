const view_router = require('express').Router();
const { loggedIn } = require('../controllers/authorization');

view_router.get('/lobby', loggedIn, (req, res) => {


//check if the socket.id of the user matches that of the same user in a database
//if it does, then send the user to the lobby
//if it doesn't, then send the user to the login page









});