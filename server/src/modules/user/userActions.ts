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

export default { addAvatar };
