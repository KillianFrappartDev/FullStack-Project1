const jwt = require('jsonwebtoken');

const User = require("../models/user");

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  const newUser = new User({
    name,
    email,
    password,
    product: [],
    orders: [],
  });

  try {
    await newUser.save();
  } catch (error) {
    const err = new Error("[POST][USERS] Signup failed.");
    console.log(err.message);
    return next(err);
  }

  console.log("SIGNED UP");
  const token = jwt.sign({userId: newUser.id}, "secret");
  res.json({ token, userId: newUser.id, userName: name });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  
  let user;
  try {
    user = await User.findOne({email: email});
  } catch (error) {
    const err = new Error("[POST][USERS] Login failed (Could not load users).");
    console.log(err.message);
    return next(err);
  }
  
  if (!user) {
    return next(
      new Error("[POST][USERS] Login failed (Could not identify user).")
      );
    }
    
    if (user.password === password) {
    const token = jwt.sign({userId: user.id}, "secret");
    res.json({ token, userId: user.id, userName: user.name });
    console.log("LOGGED IN");
  } else {
    res.json({ message: "Wrong credentials..." });
  }
};

exports.signup = signup;
exports.login = login;
