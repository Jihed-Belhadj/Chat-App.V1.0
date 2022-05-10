import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getMessages } from "../../Redux/actions/messageActions";
import FriendProfilModal from "../Miscellaneous/FriendProfileModal";
import SendIcon from "@mui/icons-material/Send";
import ScrollableConv from "./ScrollableConv";
import "./style.css";
import { io } from "socket.io-client";
const ENDPOINT = "http://localhost:5000";
var socket;

function SingleConv({
  selectedConv,
  setSelectedConv,
  getSenderInfo,
  notification,
  setNotification,
  user,
}) {
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [sms, setSms] = useState("");
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const text = "Message to ";
  var selectedConvComp;
  const dispatch = useDispatch();

  //getting message

  var messages = useSelector((state) => state.messageReducer.messages);
  // var resData = useSelector((state) => state.messageReducer.resData);

  useEffect(() => {
    if (!selectedConv) return;
    else {
      dispatch(getMessages(selectedConv._id));
      selectedConvComp = selectedConv;
      //console.log(selectedConvComp);
    }
  });

  // useEffect(() => {
  //   socket = io(ENDPOINT);
  //   socket.emit("event://setup", user);
  //   socket.on("connected", () => setSocketConnected(true));
  //   socket.on("event://typing", () => setIsTyping(true));
  //   socket.on("event://stopTyping", () => setIsTyping(false));
  // });

  //typing message handler
  const typeMessageHandler = (e) => {
    setNewMessage(e.target.value);
    //   if (!socketConnected) {
    //     return;
    //   }
    //   if (!typing) {
    //     setTyping(true);
    //     socket.emit("event://typing", selectedConv._id);
    //   }
    //   let lastTypingTime = new Date().getTime();
    //   var timer = 3000;
    //   setTimeout(() => {
    //     var timeNow = new Date().getTime();
    //     var timeDiff = timeNow - lastTypingTime;
    //     if (timeDiff >= timer && typing) {
    //       socket.emit("event://stopTyping", selectedConv._id);
    //       setTyping(false);
    //     }
    //   }, timer);
  };

  //sending message handler
  const sendMessage = (event) => {
    if (event.key === "Enter" && newMessage) SendMessageHandler();
  };
  const SendMessageHandler = () => {
    const text = newMessage;
    const conversationId = selectedConv._id;
    //socket.emit("event://stopTyping", selectedConv._id);
    dispatch(createMessage({ text, conversationId }));
    dispatch(getMessages(selectedConv._id));
    //socket.emit("event://sendMessage", resData);
    //console.log(resData);
    setNewMessage("");
  };

  // useEffect(() => {
  //   if (!selectedConvComp || selectedConvComp._id !== selectedConv) {
  //     setNotification([newMessage, ...notification]);
  //     dispatch(getMessages(selectedConv._id));
  //   } else {
  //     //socket.emit("event://joinConversation", selectedConv._id);
  //     dispatch(getMessages(selectedConv._id));
  //   }
  // }, []);

  return (
    <>
      {selectedConv ? (
        <>
          <Box
            sx={{
              display: "flex",
              background: "#E8E8E8",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "98%",
              height: "10%",
              paddingX: 2,
              borderRadius: 2,
            }}
          >
            <Typography>
              {getSenderInfo(user, selectedConv.users)
                .username[0].toUpperCase()
                .concat(
                  getSenderInfo(user, selectedConv.users).username.slice(
                    1,
                    getSenderInfo(user, selectedConv.users).username.length
                  )
                )}
            </Typography>
            <FriendProfilModal user={getSenderInfo(user, selectedConv.users)} />
          </Box>
          <Box
            sx={{
              display: "flex",
              background: "white",
              flexDirection: "column",
              justifyContent: "flex-end",
              width: "98%",
              height: "90%",
              paddingX: 2,
              borderRadius: 2,
              overflowY: "hidden",
              marginTop: 1,
            }}
          >
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <CircularProgress
                  variant="indeterminate"
                  size={60}
                  thickness={5}
                  sx={{ padding: 85, paddingY: 10 }}
                />
              </Box>
            ) : (
              <div className="messages">
                <ScrollableConv user={user} messages={messages} />
              </div>
            )}
            <FormControl
              required={true}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                marginBottom: 1,
              }}
            >
              {isTyping ? <div>Loading...</div> : <></>}
              <TextField
                onKeyDown={sendMessage}
                sx={{ width: "91%", backgroundColor: "#E0E0E0" }}
                label={text.concat(
                  getSenderInfo(user, selectedConv.users)
                    .username[0].toUpperCase()
                    .concat(
                      getSenderInfo(user, selectedConv.users).username.slice(
                        1,
                        getSenderInfo(user, selectedConv.users).username.length
                      )
                    )
                )}
                value={newMessage}
                onChange={typeMessageHandler}
              />
              <Button
                onClick={SendMessageHandler}
                sx={{ width: "8%" }}
                variant="contained"
                endIcon={<SendIcon />}
              >
                Send
              </Button>
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ fontSize: 40, pb: 3, fontFamily: "sans-serif" }}>
            Select a user to start chatting!
          </Typography>
        </Box>
      )}
    </>
  );
}

export default SingleConv;
