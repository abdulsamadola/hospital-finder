import React, { useEffect, useState } from "react";
import app from "../Services/firebase";

export const AuthContext = React.createContext<any>({});

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged((user: any) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return <></>;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
