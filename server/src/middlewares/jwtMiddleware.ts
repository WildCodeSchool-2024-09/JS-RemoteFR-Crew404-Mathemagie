import jwt from "jsonwebtoken";
import "dotenv/config";

const APP_SECRET = process.env.APP_SECRET as string;

const createToken = (payload: object): string => {
  return jwt.sign(payload, APP_SECRET, { expiresIn: "48h" });
};

import type { NextFunction, Request, Response } from "express";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwtToken;
  if (!token) {
    res.status(403).json({ message: "Token non fourni." });
    return;
  }
  try {
    const decoded = jwt.verify(token, APP_SECRET);
    req.body.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalide" });
    return;
  }
};

export default { createToken, verifyToken };
