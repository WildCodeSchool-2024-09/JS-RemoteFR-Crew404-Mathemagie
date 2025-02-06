import type { NextFunction, Request, Response } from "express";
import userRepository from "./userRepository";

// Typing for request body and parameters
interface AddAvatarBody {
  name: string;
  grade: string;
  birthday: string;
  photo: string;
}

interface AddAvatarParams {
  id: string;
}

type AvatarResponse = { message: string };

const addAvatar = async (
  req: Request<AddAvatarParams, Response, AddAvatarBody>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const users = await userRepository.getAllUsers();

    if (users.length >= 5) {
      res
        .status(400)
        .json({ message: "Nombre maximum de profils atteint (5)." });
      return;
    }

    const user = await userRepository.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

const getAvatar = async (
  req: Request<AddAvatarParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = Number(req.params.id);
    const user = await userRepository.read(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userRepository.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export default { addAvatar, getAvatar, getAllUsers };
