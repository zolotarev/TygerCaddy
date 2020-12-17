import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { rebuildCaddyfile } from "../middlewares/caddy";
import { App } from "../entity/App";
import { createShorthandPropertyAssignment } from "typescript";
class AppController {
  static listAll = async (req: Request, res: Response) => {
    //Get apps from database
    const appRepository = getRepository(App);
    const apps = await appRepository.find();

    //Send the apps object
    return res.send(apps);
  };

  static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: string = req.params.id;

    //Get the app from database
    const appRepository = getRepository(App);
    try {
      const app = await appRepository.findOneOrFail(id);
    } catch (error) {
      return res.status(404).send("App not found");
    }
  };

  static newApp = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { name, ip_address, port_number, verify_ssl } = req.body;
    let app = new App();
    app.name = name;
    app.ip_address = ip_address;
    app.port_number = port_number;
    app.verify_ssl = verify_ssl;

    //Validade if the parameters are ok
    const errors = await validate(app);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }

    //Try to save. If fails, the appname is already in use
    const appRepository = getRepository(App);
    try {
      let createdApp = await appRepository.save(app);
      return res.status(201).send(createdApp);
    } catch (e) {
      return res.status(409).send({error:"App already in use"});
    }

    //If all ok, send 201 response
    
  };

  static editApp = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    let { name, ip_address, verify_ssl, port_number } = req.body;

    //Try to find app on database
    const appRepository = getRepository(App);
    let newApp;
    try {
      newApp = await appRepository.findOneOrFail(id);
    } catch (error) {
      console.log(error)
      //If not found, send a 404 response
      return res.status(404).send("App not found");
    }

    //Validate the new values on model
    newApp.name = name;
    newApp.ip_address = ip_address;
    newApp.port_number = port_number;
    newApp.verify_ssl = verify_ssl;
    const errors = await validate(newApp);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }

    //Try to safe, if fails, that means appname already in use
    try {
      await appRepository.save(newApp);
        console.log("New Caddyfile Needed!");
        await rebuildCaddyfile();
    } catch (e) {
      console.log(e)
      return res.status(409).send("App already in use");
    }
    //After all send a 204 (no content, but accepted) response
    return res.status(204).send();
  };

  static deleteApp = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const appRepository = getRepository(App);
    let app: App;
    try {
      app = await appRepository.findOneOrFail(id);
    } catch (error) {
      return res.status(404).send("App not found");
    }
    appRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    return res.status(204).send();
  };
}

export default AppController;
