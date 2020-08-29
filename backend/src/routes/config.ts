import { Router } from "express";
import ConfigController from "../controllers/ConfigController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

// Get config
router.get("/", [checkJwt, checkRole(["ADMIN"])], ConfigController.getConfig);

//Edit config
router.patch(
  "/",
  [checkJwt, checkRole(["ADMIN"])],
  ConfigController.editConfig
);


export default router;