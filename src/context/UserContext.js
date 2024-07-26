import React, { createContext, useReducer } from "react";
import axios from "axios";

// create our context
const UserContext = createContext();

// create initial state

const initialState = {
  username: "",
  user: null,
  error: "",
  loading: false,
};

// reducer function
const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload, error: "" };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload, error: "" };
    case "SET_ERROR":
      return { ...state, error: action.payload, user: null };
    default:
      return state;
  }
};

// UserProvider component to wrap around our app
const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const setUsername = (username) => {
    dispatch({ type: "SET_USERNAME", payload: username });
  };

  const searchUser = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    if (!state.username) {
      dispatch({ type: "SET_ERROR", payload: "Please enter a username" });
      dispatch({ type: "SET_LOADING", payload: false });
      return;
    }
    try {
      const response = await axios.get(
        `https://api.github.com/users/${state.username}`
      );
      if (response.status === 200) {
        dispatch({ type: "SET_USER", payload: response.data });
      }
    } catch {
      dispatch({ type: "SET_ERROR", payload: "No Results" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <UserContext.Provider value={{ state, setUsername, searchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
