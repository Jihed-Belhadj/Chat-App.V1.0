import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import { createMessage, getMessages } from "./Redux/actions/messageActions";
const ENDPOINT = "http://localhost:5000";
const WebSocketContext = createContext(null);
export { WebSocketContext };
export default ({ children }) => {
  let socket;
  let ws;
  const dispatch = useDispatch();
  const sendMessage = (text, conversationId) => {
    const payload = {
      text: text,
      conversationId: conversationId,
    };
    socket.emit("event://send-message", JSON.stringify(payload));
    dispatch(createMessage(payload));
  };
  if (!socket) {
    socket = io.connect(ENDPOINT);
    socket.on("event://get-message", (conversationId) => {
      const payload = JSON.parse(conversationId);
      dispatch(getMessages(payload));
    });
    ws = {
      socket: socket,
      sendMessage,
    };
  }
  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};
