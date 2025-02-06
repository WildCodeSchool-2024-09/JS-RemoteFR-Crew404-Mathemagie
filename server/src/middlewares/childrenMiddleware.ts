import type { RequestHandler } from "express";
import userRepository from "../modules/user/userRepository";

const findChildren: RequestHandler = async (req, res, next) => {
  try {
    const children = await userRepository.findMyChildren(
      req.body.user.id_parent,
    );

    const currentChild = Number(req.params.id);
    const isDone = children.some((child) => child.id_user === currentChild);

    if (isDone) {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Oups, le server est en panne" });
    return;
  }
};

export default { findChildren };
