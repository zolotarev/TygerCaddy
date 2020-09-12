import { Router } from "express";
import DNSController from "../controllers/DNSController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

// Get config
router.get("/", [checkJwt, checkRole(["ADMIN"])], DNSController.getDNS);

export default router;
