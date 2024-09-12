import { createContext } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  function getUserId() {
    return sessionStorage.getItem("userId");
  }

  function getJwtToken() {
    return sessionStorage.getItem("jwtToken");
  }

  function setAuthentication(jwtToken, userId) {
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("jwtToken", jwtToken);
  }

  function logout() {
    sessionStorage.clear();
  }

  function isAuthenticated() {
    return getJwtToken() && getUserId();
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuthentication, getUserId }}
    >
      {children}
    </AuthContext.Provider>
  );
}
