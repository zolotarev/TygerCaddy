import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import config from "./config";
import DNS from "./dns";
import app from "./app";
import address from "./address";
import endpoint from "./endpoint";
import backup from "./backup";
import cert from "./cert";
import loadbalance from "./loadbalance";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/config", config);
routes.use("/app", app);
routes.use("/address", address);
routes.use("/dns", DNS);
routes.use("/endpoint", endpoint);
routes.use("/backup", backup);
routes.use("/cert", cert);
routes.use("/loadbalance", loadbalance);
export default routes;
