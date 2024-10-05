const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.session.returnTo = req.originalUrl;
    return res.redirect("/login");
  }
};

export default checkAuth;
