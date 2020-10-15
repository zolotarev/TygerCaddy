import { Router } from "express";
import AddressController from "../controllers/AddressController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all addresses
router.get("/", [checkJwt, checkRole(["ADMIN"])], AddressController.listAll);

// Get one address
router.get(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  AddressController.getOneById
);

//Create a new address
router.post("/", [checkJwt, checkRole(["ADMIN"])], AddressController.newAddress);

//Edit one address
router.patch(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  AddressController.editAddress
);

//Delete one address
router.delete(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  AddressController.deleteAddress
);

export default router;