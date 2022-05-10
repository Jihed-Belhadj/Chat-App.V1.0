import { FAIL, GETALLUSERS, GETCURRENT, LOGIN, LOGOUT, REGISTER } from "../types/authTypes";

const initialState = {
  user: {},
  users:[],
  auth: false,
  errors: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("token", action.payload.token);
      return { ...state, user: action.payload.user, auth: true };

    case REGISTER:
      localStorage.setItem("token", action.payload.token);
      return { ...state, user: action.payload.user, auth: true };

    case GETCURRENT:
      return { ...state, user: action.payload, auth: true };
    
    case GETALLUSERS:
      return {...state, users: action.payload, auth:true}

    case FAIL:
      return { ...state, errors: action.payload.errors, auth: false };

    case LOGOUT:
      localStorage.removeItem("token");
      return { ...state, auth: false, user: {} };

    default:
      return state;
  }
};

export default authReducer;
