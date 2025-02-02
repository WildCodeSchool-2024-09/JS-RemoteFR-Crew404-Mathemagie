import type { RequestHandler } from "express";
import userRepository from "./userRepository";

const addAvatar: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const user = await userRepository.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

const getAvatar: RequestHandler = async (req, res, next) => {
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


export default { addAvatar , getAvatar };
