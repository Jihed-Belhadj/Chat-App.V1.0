import axios from "axios";
import { GETMESSAGES, MESSAGEFAIL, NEWMESSAGE } from "../types/messageTypes";
//import { io } from "socket.io-client";
// const ENDPOINT = "http://localhost:5000";
// const socket = io(ENDPOINT);

export const createMessage = (data) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      authorization: token,
    },
  };
  try {
    const res = await axios.post("/message", data, config);
    dispatch({
      type: NEWMESSAGE,
      payload: res.data,
    });
    /*socket.emit("event://sendMessage", res.data);*/
  } catch (error) {
    dispatch({
      type: MESSAGEFAIL,
      payload: error.response.data,
    });
  }
};

export const getMessages = (conversationId) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      authorization: token,
    },
  };
  try {
    const res = await axios.get(`/message/${conversationId}`, config);
    // socket.emit("event://joinConversation", conversationId);
    dispatch({
      type: GETMESSAGES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: MESSAGEFAIL,
      payload: error.response.data,
    });
  }
};
