
exports.loggedIn = (req, res, next) => {
    const user_id = req.session.user_id;
    console.log("REQ PATH");
    console.log(req.path);

    const route_destination= req.path;

    switch (route_destination) {
        case '/register':
            if (user_id) {
                res.redirect('/dashboard');
                // res.render('lobby', { layout: 'game_center.hbs' });
            }

            break;
        case '/sign_in':

            return res.render('lobby', { layout: 'game_center.hbs' });

        case '/dashboard':
            if (!user_id) {
                return res.redirect('/');
            }

            break;
        case '/lobby':
            // code block
            break;
        case '/sign_out':
            // code block
            break;
        case '/gameboard':
            // code block
            break;
        default:
        // code block
    }
    next();
}