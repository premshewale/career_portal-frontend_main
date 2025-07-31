import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async ({ email, password }) => {
    const res = await axios.post("http://localhost:8080/candidate/login", {
      email,
      password,
    });
    setUser(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
  };

  const logout = (onLogoutComplete) => {
  localStorage.removeItem("user");
  setUser(null);
  if (onLogoutComplete) {
    onLogoutComplete();
  } else {
    window.location.href = "/"; // fallback redirect
  }
};


 useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser) {
        setUser(parsedUser);
      }
    } catch (e) {
      localStorage.removeItem("user");
    }
  }
}, []);


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
