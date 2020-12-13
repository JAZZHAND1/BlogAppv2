import React, { useState } from "react";

const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [CurrentUser, setCurrentUser] = useState({});
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const[clickedpost,setclickedpost] = useState("");
  return (
    <AuthContext.Provider
      value={{
        CurrentUser: CurrentUser,
        setCurrentUser: setCurrentUser,
        IsLoggedIn: IsLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
        clickedpost:clickedpost,
        setclickedpost:setclickedpost,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
