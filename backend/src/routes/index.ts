import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import config from "./config";
import DNS from "./dns";
import app from "./app";
import address from "./address";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/config", config);
routes.use("/app", app);
routes.use("/address", address);
routes.use("/dns", DNS);

export default routes;
