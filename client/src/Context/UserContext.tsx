import { createContext, useContext, useState } from "react";

type User = {
  name: string;
  photo: string;
};

interface UserContextType {
  user: User | null;
  handleChangeUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const handleChangeUser = (user: User) => {
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, handleChangeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUser doit être utilisé à l'intérieur de <UserProvider />",
    );
  }
  return context;
};
