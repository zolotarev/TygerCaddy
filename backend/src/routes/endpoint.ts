import { Router } from "express";
import EndpointController from "../controllers/EndpointController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all users
router.get("/", [checkJwt, checkRole(["ADMIN"])], EndpointController.listAll);

// Get one user
router.get(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  EndpointController.getOneById
);

//Create a new user
router.post("/", [checkJwt, checkRole(["ADMIN"])], EndpointController.newEndpoint);

//Edit one user
router.patch(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  EndpointController.editEndpoint
);

//Delete one user
router.delete(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  EndpointController.deleteEndpoint
);

export default router;