import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { DNSProvider } from "../entity/DNSProvider";

class DNSController {
  static getDNS = async (req: Request, res: Response) => {
    //Get the DNSProviders from database
    const DNSRepository = getRepository(DNSProvider);
    try {
      const DNS = await DNSRepository.find();
      return res.send(DNS);
    } catch (error) {
      return res.status(404).send("DNS Providers not found");
    }
  };
  static getActiveDNS = async (req: Request, res: Response) => {
    //Get the DNSProviders from database
    const DNSRepository = getRepository(DNSProvider);
    try {
      const DNS = await DNSRepository.find({where:{active:true}});
      return res.send(DNS);
    } catch (error) {
      return res.status(404).send("DNS Providers not found");
    }
  };
  static editDNS = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    let { api_key, active} = req.body;
    //Try to find address on database
    const DNSRepository = getRepository(DNSProvider);
    let editDNS;
    try {
      editDNS = await DNSRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      return res.status(404).send("DNS Provider not found");
 
    }

    //Validate the new values on model
    editDNS.api_key = api_key;
    editDNS.active = active;
    const errors = await validate(editDNS);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }
    try {
      await DNSRepository.save(editDNS);
    } catch (e) {
      return res.status(409).send("DNS Provider already in use");
    }
    //After all send a 204 (no content, but accepted) response
    return res.status(204).send();
  };
  
}

export default DNSController;
