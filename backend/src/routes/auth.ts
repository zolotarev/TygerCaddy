import { Router } from "express";
import AuthController from "../controllers/AuthController";
import UserController from "../controllers/UserController"
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();
// Login route
router.post("/login", AuthController.login);

// Change my password
router.post("/change-password", [checkJwt], AuthController.changePassword);

// Change my password
router.post("/initialuser", [checkJwt], UserController.initialUser);

export default router;