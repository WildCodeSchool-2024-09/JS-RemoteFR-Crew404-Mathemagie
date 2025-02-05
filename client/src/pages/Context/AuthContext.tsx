import { createContext, useContext, useState } from "react";

type AuthContextType = {
  parent: Parent | null;
  handleLogin: (Parent: Parent) => void;
  handleLogout: () => void;
  isLogged: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

type ChildrenType = {
  children: React.ReactNode;
};

type Parent = {
  id: number;
  email: string;
  avatar: string;
  role: string;
};

export function AuthProvider({ children }: ChildrenType) {
  const [parent, setParent] = useState<Parent | null>(null);
  const [isLogged, setIsLogged] = useState(false);

  const handleLogin = (parent: Parent) => {
    setParent(parent);
    setIsLogged(true);
  };

  const handleLogout = () => {
    setParent(null);
    setIsLogged(false);
  };

  return (
    <AuthContext.Provider
      value={{
        parent,
        isLogged,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (value == null) {
    throw new Error("useAuth has to be used within <AuthProvider />");
  }

  return value;
};
