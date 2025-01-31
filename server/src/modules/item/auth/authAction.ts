import type { RequestHandler } from "express";
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
    const user = await authRepository.read(req.body.email);
    const token = jwtMiddleware.createToken(user);
    res.cookie("jwtToken", token, { httpOnly: true, secure: false }).json(user);
  } catch (err) {
    next(err);
  }
};

export default { register, login };
