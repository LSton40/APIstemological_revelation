require('dotenv').config();
const session = require('express-session');
const db = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sessionMiddleware = session({
    secret: process.env.SESSION_AGENT_MAN || '69420', // NTH: deprecated? provide secret option
    store: new SequelizeStore({ db }),
    saveUninitialized: false,
    name:'sid',
    resave: false,
    cookie: {
        httpOnly: false
    }
})
//socket io middleware wrapper for session
const wrap = middleware =>
    (socket, next) =>
        moreMiddleware(socket.request,{},next);
module.exports = { sessionMiddleware, wrap };