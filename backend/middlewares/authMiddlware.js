const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleWare = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).send("Not allowed, token failed");
    }
    //verifying token
    const decryptToken = jwt.verify(token, process.env.KEY);
    const user = await User.findById(decryptToken.id._id);
    req.user = user;
    next();
  } catch (error) {
    res.status(500).send("Not allowed, server error");
  }
};

module.exports = { authMiddleWare };
