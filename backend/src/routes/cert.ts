import { Router } from "express";
import CertController from "../controllers/CertController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all certs
router.get("/", [checkJwt, checkRole(["ADMIN"])], CertController.listAll);

// Get one cert
router.get(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  CertController.getOneById
);

//Create a new cert
router.post("/", [checkJwt, checkRole(["ADMIN"])], CertController.newCert);

//Edit one cert
router.patch(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  CertController.editCert
);

//Delete one cert
router.delete(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  CertController.deleteCert
);

export default router;