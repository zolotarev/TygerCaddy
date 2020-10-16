import { Router } from "express";
import EndpointController from "../controllers/EndpointController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all endpoints
router.get("/", [checkJwt, checkRole(["ADMIN"])], EndpointController.listAll);

// Get one endpoint
router.get(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  EndpointController.getOneById
);
router.get(
  "/address/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  EndpointController.getByAddressId
);

//Create a new endpoint
router.post("/", [checkJwt, checkRole(["ADMIN"])], EndpointController.newEndpoint);

//Edit one endpoint
router.patch(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  EndpointController.editEndpoint
);

//Delete one endpoint
router.delete(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  EndpointController.deleteEndpoint
);

export default router;