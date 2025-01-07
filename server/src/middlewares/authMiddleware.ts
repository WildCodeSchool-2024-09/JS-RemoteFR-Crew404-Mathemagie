//import { Request, Response, NextFunction } from "express";
//import jwt from "jsonwebtoken";

//export const authenticate = (
//req: Request,
//res: Response,
// next: NextFunction,
//) => {
// const token = req.headers.authorization?.split(" ")[1];

//if (!token) {
// return res.status(401).json({ message: "Access denied" });
// }

//try {
//const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
//(req as any).user = decoded;
//  next();
// } catch (err) {
//  res.status(401).json({ message: "Invalid token" });
// }
//};
