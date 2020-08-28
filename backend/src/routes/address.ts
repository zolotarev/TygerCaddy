import { Router } from "express";
import AddressController from "../controllers/AddressController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all users
router.get("/", [checkJwt, checkRole(["ADMIN"])], AddressController.listAll);

// Get one user
router.get(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  AddressController.getOneById
);

//Create a new user
router.post("/", [checkJwt, checkRole(["ADMIN"])], AddressController.newAddress);

//Edit one user
router.patch(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  AddressController.editAddress
);

//Delete one user
router.delete(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  AddressController.deleteAddress
);

export default router;