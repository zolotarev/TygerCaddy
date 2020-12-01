import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Endpoint } from "../entity/Endpoint";
import { rebuildCaddyfile } from "../middlewares/caddy";

class EndpointController {
  static listAll = async (req: Request, res: Response) => {
    //Get Endpoints from database
    const endpointRepository = getRepository(Endpoint);
    const endpoints = await endpointRepository.find({
      relations: ["app"],
    });

    //Send the endpoints object
    return res.send(endpoints);
  };

  static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: string = req.params.id;

    //Get the endpoint from database
    const endpointRepository = getRepository(Endpoint);
    try {
      const endpoint = await endpointRepository.findOneOrFail(id, {relations:['app', 'address']});
      return res.send(endpoint)
    } catch (error) {
      return res.status(404).send("Endpoint not found");
    }
  };

  static getByAddressId = async (req: Request, res: Response) => {
      //Get the ID from the url
      const id: string = req.params.id;

      //Get the endpoint from database
      const endpointRepository = getRepository(Endpoint);
      try {
        const endpoint = await endpointRepository.find(
          {
            where:{address: {id:id} },
            relations:['app', 'address'],
            
          }
          );
          return res.send(endpoint)
      } catch (error) {
        return res.status(404).send("Endpoint not found");
      }
  };
  static newEndpoint = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { endpoint, address, app } = req.body;
    let newEndpoint = new Endpoint();
    newEndpoint.address = address;
    newEndpoint.endpoint = endpoint;
    newEndpoint.app = app;

    //Validade if the parameters are ok
    const errors = await validate(newEndpoint);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }
    const endpointRepository = getRepository(Endpoint);  

    //Try to save. If fails, the endpoint is already in use
    
    try {
      await endpointRepository.save(newEndpoint);
      await rebuildCaddyfile();
    } catch (e) {
        console.log(e)
        return res.status(409).send("Endpoint already in use");
    }

    //If all ok, send 201 response
    return res.status(201).send("Endpoint created");
  };

  static editEndpoint = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    let { endpoint, address, app } = req.body;
    //Try to find address on database
    const endpointRepository = getRepository(Endpoint);
    let editEndpoint;
    try {
        editEndpoint = await endpointRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      return res.status(404).send("Endpoint not found");
    }

    //Validate the new values on model
    editEndpoint.address = address;
    editEndpoint.endpoint = endpoint;
    editEndpoint.app = app;
    const errors = await validate(editEndpoint);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }

    //Try to safe, if fails, that means addressname already in use
    try {
      await endpointRepository.save(editEndpoint);
      await rebuildCaddyfile();
    } catch (e) {
      return res.status(409).send("Endpoint already in use");
    }
    //After all send a 204 (no content, but accepted) response
    return res.status(204).send();
  };

  static deleteEndpoint = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const endpointRepository = getRepository(Endpoint);
    let endpoint: Endpoint;
    try {
        endpoint = await endpointRepository.findOneOrFail(id);
    } catch (error) {
      return res.status(404).send("Endpoint not found");
    }
    endpointRepository.delete(id);
    await rebuildCaddyfile();
    //After all send a 204 (no content, but accepted) response
    return res.status(204).send();
  };
}

export default EndpointController;
