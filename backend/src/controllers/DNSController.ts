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
      res.send(DNS);
    } catch (error) {
      res.status(404).send("DNS Providers not found");
    }
  };
}

export default DNSController;
