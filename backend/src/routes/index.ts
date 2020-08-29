import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import config from "./config";


const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/config", config);

export default routes;