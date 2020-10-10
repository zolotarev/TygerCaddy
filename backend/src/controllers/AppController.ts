import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { App } from "../entity/App";
import { newAddressGenerate } from "../middlewares/updateCaddy";
class AppController {
  static listAll = async (req: Request, res: Response) => {
    //Get apps from database
    const appRepository = getRepository(App);
    const apps = await appRepository.find();

    //Send the apps object
    res.send(apps);
  };

  static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: string = req.params.id;

    //Get the app from database
    const appRepository = getRepository(App);
    try {
      const app = await appRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("App not found");
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
      res.status(400).send(errors);
      return;
    }

    //Try to save. If fails, the appname is already in use
    const appRepository = getRepository(App);
    try {
      await appRepository.save(app);
    } catch (e) {
      res.status(409).send({error:"App already in use"});
      return;
    }

    //If all ok, send 201 response
    res.status(201).send("App created");
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
      newApp = await appRepository.findOneOrFail(id, {
        relations: ["address"],
      });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("App not found");
      return;
    }

    //Validate the new values on model
    newApp.name = name;
    newApp.ip_address = ip_address;
    newApp.port_number = port_number;
    newApp.verify_ssl = verify_ssl;
    const errors = await validate(newApp);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means appname already in use
    try {
      await appRepository.save(newApp);
      if (newApp.address.length !== 0) {
        console.log("New Caddyfile Needed!");
        await newAddressGenerate();
      }
    } catch (e) {
      res.status(409).send("App already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };

  static deleteApp = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const appRepository = getRepository(App);
    let app: App;
    try {
      app = await appRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("App not found");
      return;
    }
    appRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };
}

export default AppController;
