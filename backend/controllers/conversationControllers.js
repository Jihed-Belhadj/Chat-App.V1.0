const Conversation = require("../models/Conversation");
const User = require("../models/User");

const OpenOrCreateConv = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).send({ msg: "userId param not found" });
  }

  //test if a conversation is already exist

  var existConv = await Conversation.find({
    isGroup: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    //if it founded populate users and lastMessage
    .populate("users", "-password")
    .populate("lastMessage");

  existConv = await User.populate(existConv, {
    path: "lastMessage",
    select: "username profilpic email",
  });

  if (existConv.length > 0) {
    res.send(existConv[0]);
  } else {
    // if not found we will create new conversation
    var convData = {
      isGroup: false,
      users: [req.user._id, userId],
    };
    try {
      const createdConv = await Conversation.create(convData);
      const Conv = await Conversation.findOne({
        _id: createdConv._id,
      }).populate("users", "-password");
      res.status(200).send(Conv);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
};

const getAllConvOfUser = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      users: { $eq: req.user._id },
    })
      .populate("users", "-password")
      .populate("lastMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "lastMessage.sender",
          select: "username profilpic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { OpenOrCreateConv, getAllConvOfUser };
