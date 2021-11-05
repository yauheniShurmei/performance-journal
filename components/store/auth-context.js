import React, { useEffect } from "react";
import { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  localId: "",
  isLoggedIn: false,
  getLocalIdHandler: (localId) => {},
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [localId, setLocalId] = useState(null);
  const userIsLoggedIn = !!token;

  useEffect(() => {
    console.log("[USE EFFECT STORE]");
    const initialToken = localStorage.getItem("token");
    setToken(initialToken);
    const initialLocalId = localStorage.getItem("localId");
    setLocalId(initialLocalId);
  }, []);

  const getLocalIdHandler = (localId) => {
    setLocalId(localId);
    localStorage.setItem("localId", localId);
  };

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.clear();
  };

  const contextValue = {
    token: token,
    localId: localId,
    isLoggedIn: userIsLoggedIn,
    getLocalId: getLocalIdHandler,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
