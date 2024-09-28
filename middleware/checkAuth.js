const checkAuth = (req, res, next) => {
  if (!req.cookies.user) {
    return res.status(303).redirect("/login");
  }
  return next();
};

export default checkAuth;
