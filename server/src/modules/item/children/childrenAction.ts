import type { Request, Response } from "express";
import childrenRepository from "./childrenRepository";

const getChildrenByParent = async (req: Request, res: Response) => {
  try {
    const parentId = req.params.parentId;
    const children = await childrenRepository.findByParentId(Number(parentId));
    res.status(200).json(children);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des enfants" });
  }
};

const addChild = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const parentId = req.user?.id; // Récupère l'ID du parent connecté avec le token

    if (!parentId) {
      return res.status(401).json({ error: "Non autorisé" });
    }

    const newChild = await childrenRepository.create(name, parentId);
    res.status(201).json(newChild);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'ajout de l'enfant" });
  }
};

export default { getChildrenByParent, addChild };
