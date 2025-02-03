/// <reference path="../types/express/index.d.ts" />
import * as argon2 from "argon2";
import type { RequestHandler } from "express";

import authRepository from "../modules/item/auth/authRepository";

const isRegistered: RequestHandler = async (req, res, next) => {
  const user = await authRepository.read(req.body.email);

  console.info(user);

  if (!user) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  if (await argon2.verify(user.password, req.body.password)) {
    console.info("Password is correct");

    req.user = user;
    next();
  } else {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }
};

const hashPwd: RequestHandler = async (req, res, next) => {
  try {
    const hash = await argon2.hash(req.body.password);
    req.body.password = hash;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyEmail: RequestHandler = async (req, res, next) => {
  try {
    const user = await authRepository.read(req.body.email);
    if (!user) {
      res.status(401).json({ message: "No account exists" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error verifying email" });
  }
};

const verifyPwd: RequestHandler = async (req, res, next) => {
  try {
    const user = await authRepository.read(req.body.password);
    if (await argon2.verify(user.password, req.body.password)) {
      next();
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default { isRegistered, hashPwd, verifyEmail, verifyPwd };
