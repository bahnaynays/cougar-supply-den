// AuthContext.tsx
import { createContext, useContext, useState } from "react";
import { Users } from "../interfaces/UsersInterface";

interface AuthState {
  user: Users | null;
  setUser: React.Dispatch<React.SetStateAction<Users | null>>;
}

const AuthContext = createContext<AuthState | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Users | null>(null);

  const value = {
    user,
    setUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return auth;
};