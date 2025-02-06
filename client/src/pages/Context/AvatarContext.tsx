import type React from "react";
import { createContext, useContext, useState } from "react";

// Définir le type de l'avatar
interface Avatar {
  name: string;
  photo: string;
  grade: string;
  day: string;
  month: string;
  year: string;
}

// Créer un contexte avec une valeur par défaut
const AvatarContext = createContext<{
  avatar: Avatar;
  setAvatar: React.Dispatch<React.SetStateAction<Avatar>>;
} | null>(null);

// Créer un Provider pour partager l'état de l'avatar
export const AvatarProvider = ({ children }: { children: React.ReactNode }) => {
  const [avatar, setAvatar] = useState<Avatar>({
    name: "",
    photo: "",
    grade: "",
    day: "",
    month: "",
    year: "",
  });

  return (
    <AvatarContext.Provider value={{ avatar, setAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
};

// Hook personnalisé pour accéder à l'avatar
export const useAvatar = () => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error("useAvatar must be used within an AvatarProvider");
  }
  return context;
};
