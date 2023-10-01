const protect = (req, res, next) => {
  const { user } = req.session;
  console.log("🚀 ~ file: auth.handler.js:3 ~ protect ~ user:", user);

  if (!user) {
    res.status(401);
    next(new Error("Access denied."));
  }

  req.user = user;
  next();
};

module.exports = protect;
