import type { RequestHandler } from "express";

// Import access to data
import authRepository from "./authRepository";

const register: RequestHandler = async (req, res, next) => {
  try {
    const user = await authRepository.create(req.body);

    // Respond with the user in JSON format
    res.status(201).json(user);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    if (req.user) {
      const { password, ...safeUser } = req.user;
      res.status(200).json(safeUser);
    }
  } catch (err) {
    next(err);
  }
};

export default { register, login };
