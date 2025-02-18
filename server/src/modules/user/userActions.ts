import type { RequestHandler } from "express";
import userRepository from "./userRepository";

// 🔹 Ajouter un utilisateur (Avatar)
const addAvatar: RequestHandler = async (req, res, next) => {
  try {
    const userId = await userRepository.create(
      req.body,
      req.body.user.id_parent,
    );
    res.status(201).json({ id: userId });
  } catch (err) {
    next(err);
  }
};

// 🔹 Récupérer les informations d'un utilisateur
const getAvatar: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    if (Number.isNaN(userId)) {
      return;
    }

    const user = await userRepository.read(userId);
    if (!user) {
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// 🔹 Récupérer tous les utilisateurs liés à un parent
const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await userRepository.getAllUsers(req.body.user.id_parent);
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// 🔹 Récupérer le niveau actuel d'un utilisateur
const getCurrentLevel: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    if (Number.isNaN(userId)) {
      return;
    }

    const user = await userRepository.getCurrentLevel(userId);
    if (!user) {
      return;
    }

    res.status(200).json({ current_level: user.current_level });
  } catch (err) {
    next(err);
  }
};

const levelUp: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);

    const { newLevel } = req.body;

    if (Number.isNaN(userId) || Number.isNaN(Number(newLevel))) {
      res.status(400).json({ message: "Niveau invalide" });
      return;
    }

    await userRepository.updateLevel(userId, newLevel);

    const updatedUser = await userRepository.getCurrentLevel(userId);

    if (!updatedUser) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }

    res.status(200).json({
      message: "Niveau mis à jour avec succès",
      current_level: updatedUser.current_level,
    });
  } catch (err) {
    next(err);
  }
};

export default { addAvatar, getAvatar, getAllUsers, getCurrentLevel, levelUp };
