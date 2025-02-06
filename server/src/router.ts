import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import authMiddleware from "./middlewares/authMiddleware";
import childrenMiddleware from "./middlewares/childrenMiddleware";
import jwtMiddleware from "./middlewares/jwtMiddleware";

/* ************************************************************************* */
// Auth pour les parents
/* ************************************************************************* */

import authActions from "./modules/item/auth/authAction";
router.post("/api/register", authMiddleware.hashPwd, authActions.register);
router.post("/api/login", authMiddleware.isRegistered, authActions.login);

/* ************************************************************************* */
// Nous allons créer un 'mur' pour sécuriser nos routes ci-dessous
// Pour accéder aux routes ci-dessous, il faut ABSOLUMENT un token valide
/* ************************************************************************* */

router.use(jwtMiddleware.verifyToken);

/* ************************************************************************* */
// Avatar (compte pour les enfants)
/* ************************************************************************* */
import userActions from "./modules/user/userActions";

router.get("/api/users", userActions.getAllUsers);
router.get("/api/avatar/:id", userActions.getAvatar);
router.post("/api/avatar", userActions.addAvatar);
/**
 * sans middleware, je peux voir absolument tous les enfants inscrit sur la platforme
 * Il faut donc faire une requete sql pour savoir si le user connecté (req.body.user.id_parent) est le parent de l'enfant qu'il souhaite accéder, si oui, next(), sinon res.sendStatus(401) (Unautorized)
 */
router.get(
  "/api/avatar/:id",
  childrenMiddleware.findChildren,
  userActions.getAvatar,
);

export default router;
