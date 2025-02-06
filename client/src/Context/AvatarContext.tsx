import type React from "react";
import { createContext, useContext, useState } from "react";
import type { Avatar } from "../types/types";

// Créer un contexte avec une valeur par défaut
const AvatarContext = createContext<{
  avatar: Avatar;
  handleAvatar: (avatar: Avatar) => void;
} | null>(null);

// Créer un Provider pour partager l'état de l'avatar
export const AvatarProvider = ({ children }: { children: React.ReactNode }) => {
  const [avatar, setAvatar] = useState<Avatar>({
    name: "",
    photo: "",
    classe: "",
    day: "",
    month: "",
    year: "",
  });

  /**
   * Ici, on s'assure que seul la méthode handleAvatar est capable de modifier mon avatar
   */
  const handleAvatar = (avatar: Avatar) => {
    setAvatar(avatar);
  };

  return (
    <AvatarContext.Provider value={{ avatar, handleAvatar }}>
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
