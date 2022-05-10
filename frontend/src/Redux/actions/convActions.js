import axios from "axios";
import {
  CONVFAIL,
  GETCONVERSATIONS,
  GETORNEWCONVERSATION,
} from "../types/convTypes";

export const getCreateConv = (data) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      authorization: token,
    },
  };
  try {
    const res = await axios.post("/conversations", data, config);
    dispatch({
      type: GETORNEWCONVERSATION,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CONVFAIL,
      payload: error.response.data,
    });
  }
};

export const getConversations = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      authorization: token,
    },
  };
  try {
    const res = await axios.get("/conversations", config);
    dispatch({
      type: GETCONVERSATIONS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CONVFAIL,
      payload: error.response.data,
    });
  }
};
