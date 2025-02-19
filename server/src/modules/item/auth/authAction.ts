import type { RequestHandler } from "express";
import jwtMiddleware from "../../../middlewares/jwtMiddleware";
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
    const user = await authRepository.read(req.body.email);
    const token = jwtMiddleware.createToken({
      id_user: user.id_user,
      id_parent: user.id_parent,
      email: user.email,
    });
    res.cookie("jwtToken", token, { httpOnly: true, secure: false }).json(user);
  } catch (err) {
    next(err);
  }
};

export default { register, login };
