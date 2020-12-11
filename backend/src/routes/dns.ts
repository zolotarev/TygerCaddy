import { Router } from "express";
import DNSController from "../controllers/DNSController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

// Get config
router.get("/", [checkJwt, checkRole(["ADMIN"])], DNSController.getDNS);
router.get("/active", [checkJwt, checkRole(["ADMIN"])], DNSController.getActiveDNS);
router.patch("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], DNSController.editDNS);
  
export default router;
