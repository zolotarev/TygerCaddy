import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Config } from "../entity/Config";

class ConfigController{

static getConfig = async (req: Request, res: Response) => {
  //Get the ID 
  const id = 1;

  //Get the config from database
  const configRepository = getRepository(Config);
  try {
    const config = await configRepository.findOneOrFail(id);
    res.send(config);
  } catch (error) {
    res.status(404).send("Config not found");
  }
};

static editConfig = async (req: Request, res: Response) => {
  //Get the ID
  const id = 1;

  //Get values from the body
  const { server_name, automatic_https, redirect_https, use_dns_verification, dns_provider_name, dns_api_token } = req.body;

  //Try to find config on database
  const configRepository = getRepository(Config);
  let config;
  try {
    config = await configRepository.findOneOrFail(id);
  } catch (error) {
    //If not found, send a 404 response
    res.status(404).send("Config not found");
    return;
  }

  //Validate the new values on model
  config.server_name = server_name;
  config.automatic_https = automatic_https;
  config.redirect_https = redirect_https;
  config.use_dns_verification = use_dns_verification;
  config.dns_provider_name = dns_provider_name;
  config.dns_api_token = dns_api_token;

  const errors = await validate(config);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  try {
    await configRepository.save(config);
  } catch (e) {
    res.status(409).send("Config already in use");
    return;
  }
  //After all send a 204 (no content, but accepted) response
  res.status(204).send();
};

};

export default ConfigController;