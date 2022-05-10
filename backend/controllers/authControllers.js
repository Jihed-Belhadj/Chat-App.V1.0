const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../config/tokenGenerator");

const addUser = async (req, res) => {
  const { username, email, password, profilpic, sexe, isBanned, isAdmin } =
    req.body;

  try {
    // generate a hashed password
    const salt = 10;
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    // create a new user
    const user = new User(req.body);
    // test existing user
    const isFound = await User.findOne({ email });
    if (isFound) {
      return res.status(400).send({ msg: "user already exist" });
    }
    user.password = hashedPassword;
    user.email = req.body.email.toLowerCase();
    //generate a token
    const jwtpayload = { _id: user._id };
    const token = generateToken(jwtpayload);
    //commit the user to mongoAtlas
    await user.save();
    res.send({ msg: "Register Succeded", user, token });
  } catch (error) {
    res.status(500).send({ error: [{ msg: "could not register" }] });
  }
};

const getUser = async (req, res) => {
  const { username, email, password, profilpic, sexe, isBanned, isAdmin } =
    req.body;
  try {
    //find a user with email
    const user = await User.findOne({ email });
    //test login
    if (!user) {
      return res.status(400).send({ error: [{ msg: "bad credentials" }] });
    }
    //compare req.body.password to user.password
    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      return res.status(400).send({ error: [{ msg: "bad credentials" }] });
    }
    //get a token
    const jwtpayload = { _id: user._id };
    const token = generateToken(jwtpayload);
    //response
    res.status(200).send({ msg: "Login successful", user, token });
  } catch (error) {
    res.status(500).send({ error: [{ msg: "could not register" }] });
  }
};

const getAllUsers = async (req, res) => {
    try {
        const keyword = req.query.search
    ? {
        $or: [
          { username: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
            : {};
        

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
      
  } catch (error) {
        res.status(500).send({ error: [{ msg: "intern error" }] })
  }
};

const getCurrent = (req, res) => {
  res.send(req.user);
};

module.exports = { addUser, getUser, getCurrent, getAllUsers };
