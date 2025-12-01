import React, { createContext, useState, useEffect } from "react";
import { getMe } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Always try to get user — browser will include jwt cookie automatically
        const response = await getMe();
        setUser(response.data.user);
        setIsLoggedIn(true);
      } catch (error) {
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, loading, setUser, setIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
