import { Router } from "express";
import BackupController from "../controllers/BackupController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all addresses
//router.get("/", [checkJwt, checkRole(["ADMIN"])], AddressController.listAll);

// Get one address
// router.get(
//   "/:id([0-9]+)",
//   [checkJwt, checkRole(["ADMIN"])],
//   AddressController.getOneById
// );

//Create a new address
router.post("/tyger2/restore", [checkJwt, checkRole(["ADMIN"])], BackupController.tyger2Restore);

//Edit one address
// router.patch(
//   "/:id([0-9]+)",
//   [checkJwt, checkRole(["ADMIN"])],
//   AddressController.editAddress
// );


export default router;