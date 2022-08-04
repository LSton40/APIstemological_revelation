exports.isLoggedIn = function (req, res, next) {
    const user_id = req.session.user_id;
    const is_auth_route = req.path.match(/register|login/gi);
  
    if (is_auth_route && user_id) {
      return res.redirect('/');
    }
  
    next();
  }