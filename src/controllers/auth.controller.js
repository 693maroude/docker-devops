const bcrypt = require("bcryptjs");
const User = require("../models/userModal");

const signUp = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const hashpassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hashpassword,
    });

    req.session.user = newUser;
    res.status(201).json({
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400);
    }
    next(error);
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      res.status(404);
      throw new Error("User not found.");
    }

    const isPasswordCorrect = bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400);
      throw new Error("Incorrect username or password.");
    }

    req.session.user = user;
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
  login,
};
