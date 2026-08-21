import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }

    setLoading(false);
  }, []);

  const login = (userData, tokenData) => {
    localStorage.setItem("user", JSON.stringify(userData));

    localStorage.setItem("token", tokenData);

    setUser(userData);

    setToken(tokenData);
  };

  const logout = () => {
    localStorage.removeItem("user");

    localStorage.removeItem("token");

    setUser(null);

    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loading,
        setUser,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;