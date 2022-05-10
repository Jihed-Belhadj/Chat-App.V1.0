const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRouter = require("./routes/auth");
const convRouter = require("./routes/conversation");
const messageRouter = require("./routes/message");
const socketio = require("socket.io");
const Message = require("./models/Message");
/* const path = require("path"); */

const app = express();

//connection to database
connectDB();

app.use(cors());
//middleware
app.use(express.json());

//routes
app.use("/api/auth", authRouter);
app.use("/api/conversations", convRouter);
app.use("/api/message", messageRouter);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");
  socket.on("event://setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("event://joinConversation", (conv) => {
    socket.join(conv);
    console.log("User was joined conversation: " + conv);
  });

  socket.on("event://typing", (conv) => {
    socket.in(conv).emit("event://typing");
  });

  socket.on("event://stopTyping", (conv) => {
    socket.in(conv).emit("event://stopTyping");
  });

  socket.on("event://sendMessage", (newMsg) => {
    var conversation = newMsg.conversation;
    conversation.users.forEach((user) => {
      if (user._id == newMsg.sender._id) return;
      socket.in(user._id).emit("event://recievedMessage", newMsg);
    });
  });
});
