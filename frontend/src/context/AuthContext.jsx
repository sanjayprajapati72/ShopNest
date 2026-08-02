



import React, {
  createContext,
  useState,
  useEffect,
} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on page refresh
  useEffect(() => {

    const savedUser = localStorage.getItem("userInfo");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);

  }, []);

  // Login (Password Login + Magic Link Login)
  const login = (userData) => {

    setUser(userData);

    localStorage.setItem(
      "userInfo",
      JSON.stringify(userData)
    );

  };

  // Logout
  const logout = () => {

    setUser(null);

    localStorage.removeItem("userInfo");

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};

export default AuthProvider;