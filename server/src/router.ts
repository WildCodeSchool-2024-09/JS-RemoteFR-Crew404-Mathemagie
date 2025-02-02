import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

import authMiddleware from "./middlewares/authMiddleware";
import authActions from "./modules/item/auth/authAction";

router.post("/api/login", authMiddleware.isRegistered, authActions.login);
router.post("/api/register", authMiddleware.hashPwd, authActions.register);
/* ************************************************************************* */

import userActions from "./modules/user/userActions";
router.get("/api/avatar/:id", userActions.getAvatar); 
router.post("/api/avatar", userActions.addAvatar);


export default router;
