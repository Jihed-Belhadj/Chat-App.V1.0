import { GETMESSAGES, MESSAGEFAIL, NEWMESSAGE } from "../types/messageTypes";

const initialState = {
  message: {},
  messages: [],
  errors: [],
  resData: null,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEWMESSAGE:
      return {
        ...state,
        message: action.payload.message,
        resData: action.payload,
      };
    case GETMESSAGES:
      return { ...state, messages: action.payload };
    case MESSAGEFAIL:
      return { ...state, errors: action.payload.errors };

    default:
      return state;
  }
};

export default messageReducer;
