import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { rebuildCaddyfile } from "../middlewares/caddy";

import { Config } from "../entity/Config";

class ConfigController {
  static getConfig = async (req: Request, res: Response) => {
    //Get the ID
    const id = 1;

    //Get the config from database
    const configRepository = getRepository(Config);
    try {
      const config = await configRepository.findOneOrFail(id, {
        relations: ["dns_provider_name"],
      });
      return res.send(config);
    } catch (error) {
      return res.status(404).send("Config not found");
    }
  };

  static editConfig = async (req: Request, res: Response) => {
    //Get the ID
    const id = 1;

    //Get values from the body
    const {
      server_name,
      automatic_https,
      redirect_https,
      use_dns_verification,
      dns_provider_name,
      dns_api_token,
    } = req.body;

    //Try to find config on database
    const configRepository = getRepository(Config);
    let config;
    try {
      config = await configRepository.findOneOrFail(id);
      
    } catch (error) {
      //If not found, send a 404 response
      return res.status(404).send("Config not found");
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
      return res.status(400).send(errors);
      return    }

    try {
      await configRepository.save(config);
      rebuildCaddyfile();
    } catch (e) {
      console.log(e);
      return res.status(409).send("Config already in use");
    }
    //After all send a 204 (no content, but accepted) response
    return res.status(204).send();
  };
}

export default ConfigController;
