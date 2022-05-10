import {
  CONVFAIL,
  GETCONVERSATIONS,
  GETORNEWCONVERSATION,
} from "../types/convTypes";

const initialState = {
  conversation: {},
  conversations: [],
};

const convReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETORNEWCONVERSATION:
      return { ...state, conversation: action.payload.conversation };
    case GETCONVERSATIONS:
      return { ...state, conversations: action.payload };
    case CONVFAIL:
      return { ...state, errors: action.payload.errors };

    default:
      return state;
  }
};

export default convReducer;
