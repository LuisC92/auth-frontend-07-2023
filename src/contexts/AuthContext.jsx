/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

const AuthContext = createContext();

export default AuthContext


export function AuthContextProvider({ children }) {
  const [isAuthenticated,setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}