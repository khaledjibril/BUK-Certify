import { createContext, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("guest");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /* ================= LOAD SESSION ON REFRESH ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");

    // No token → stay logged out
    if (!token || token === "undefined") return;

    try {
      const decoded = jwtDecode(token);

      setUser({
        id: decoded.id,
        email: decoded.email
      });
      setRole(decoded.role);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Invalid token", err);
      logout();
    }
  }, []);

  /* ================= LOGIN ================= */
  const login = ({ token }) => {
    if (!token) return;

    localStorage.setItem("token", token);

    const decoded = jwtDecode(token);

    setUser({
      id: decoded.id,
      email: decoded.email
    });
    setRole(decoded.role);
    setIsAuthenticated(true);
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setRole("guest");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
