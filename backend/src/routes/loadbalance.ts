import { Router } from "express";
import LoadBalanceController from "../controllers/LoadBalanceController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";


const router = Router();

//Get all policies
router.get("/policies", [checkJwt, checkRole(["ADMIN"])], LoadBalanceController.listPolicies);
//Get all lbs
router.get("/", [checkJwt, checkRole(["ADMIN"])], LoadBalanceController.listAll);
//Get all lbs
router.post("/", [checkJwt, checkRole(["ADMIN"])], LoadBalanceController.newLoadBalancer);
// Get one lb
router.get(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  LoadBalanceController.getOneById
);

//Edit one lb
router.patch(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  LoadBalanceController.editLoadBalancer
);


export default router;