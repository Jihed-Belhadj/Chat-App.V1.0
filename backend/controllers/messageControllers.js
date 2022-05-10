const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const User = require("../models/User");

//@description     Create New Message
//@route           POST /api/message/

const sendNewMessage = async (req, res) => {
  const { text, conversationId } = req.body;

  if (!text || !conversationId) {
    console.log("Invalid data passed into request");
    return res.status(400);
  }

  var newMessage = {
    sender: req.user._id,
    text: text,
    conversation: conversationId,
  };

  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "username profilpic");
    message = await message.populate("conversation");
    message = await User.populate(message, {
      path: "conversation.users",
      select: "username profilpic email",
    });
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: message,
    });
    res.json(message);
  } catch (error) {
    res.status(400).send({ errors: [{ error }] });
  }
};

//@description     Get all Messages
//@route           GET /api/message/:conversationId
const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversation: req.params.conversationId,
    })
      .populate("sender", "username profilpic email")
      .populate("conversation");
    res.send(messages);
  } catch (error) {
    res.status(400).send({ errors: [{ error }] });
  }
};

module.exports = { sendNewMessage, getAllMessages };
