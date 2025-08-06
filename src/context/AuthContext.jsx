import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [company, setCompany] = useState(() => {
    const storedCompany = localStorage.getItem("company");
    return storedCompany ? JSON.parse(storedCompany) : null;
  });

  const loginUser = async ({ email, password }) => {
    const res = await axios.post("http://localhost:8080/candidate/login", { email, password });
    setUser(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
  };

  const loginCompany = async ({ email, password }) => {
    const res = await axios.post("http://localhost:8080/company/login", { email, password });
    setCompany(res.data);
    localStorage.setItem("company", JSON.stringify(res.data));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const logoutCompany = () => {
    setCompany(null);
    localStorage.removeItem("company");
  };

  // ✅ Unified logout function
  const logout = () => {
    logoutUser();
    logoutCompany();
  };

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch {
      localStorage.removeItem("user");
    }

    try {
      const storedCompany = localStorage.getItem("company");
      if (storedCompany) setCompany(JSON.parse(storedCompany));
    } catch {
      localStorage.removeItem("company");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, company, loginUser, loginCompany, logoutUser, logoutCompany, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
