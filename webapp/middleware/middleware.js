exports.isAuth = (req, res, next) => {
  const { isLoggedIn } = req.session;
  if (!isLoggedIn) return res.redirect('/');
  next();
};
