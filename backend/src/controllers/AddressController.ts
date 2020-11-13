import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Address } from "../entity/Address";
import { rebuildCaddyfile } from "../middlewares/caddy";
import { ndjsonToJsonText } from "ndjson-to-json-text";
class AddressController {

  static generateCaddyfile = async (req: Request, res: Response) =>{
    let generate = await rebuildCaddyfile();
    console.log(generate);
    res.send(generate)
  };
  static getLogForAddress = async (req: Request, res: Response) =>{
    //Get the ID from the url
    const id: string = req.params.id;
    const addressRepository = getRepository(Address);
    var fs = require('fs');
    const path = require("path");
    var result: any;
      
     try {
      const address = await addressRepository.findOneOrFail(id);
      var result: any;
      var log = fs.readFileSync(path.resolve(__dirname, '../../backend/db/logs/' + address.address + '.json'), 'UTF8')

      result = ndjsonToJsonText(log)
      res.send(result)
    } catch (error) {
      res.status(404).send(error);
    } 
    
  };
  static listAll = async (req: Request, res: Response) => {
    //Get addresses from database
    const addressRepository = getRepository(Address);
    const addresses = await addressRepository.find({
      relations: ["app"],
    });

    //Send the addresses object
    res.send(addresses);
  };

  static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: string = req.params.id;

    //Get the address from database
    const addressRepository = getRepository(Address);
    try {
      const address = await addressRepository.findOneOrFail(id);
      res.send(address)
    } catch (error) {
      res.status(404).send("Address not found");
    }
  };

  static newAddress = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { address, tls, staging, app } = req.body;
    let newAddress = new Address();
    newAddress.address = address;
    newAddress.tls = tls;
    newAddress.staging = staging;
    newAddress.app = app;

    //Validade if the parameters are ok
    const errors = await validate(newAddress);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to save. If fails, the addressname is already in use
    const addressRepository = getRepository(Address);
    try {
      await addressRepository.save(newAddress);
      await rebuildCaddyfile();
    } catch (e) {
      res.status(409).send("Address already in use");
      return;
    }

    //If all ok, send 201 response
    res.status(201).send("Address created");
  };

  static editAddress = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    let { address, tls, staging, appId } = req.body;
    //Try to find address on database
    const addressRepository = getRepository(Address);
    let editAddress;
    try {
      editAddress = await addressRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("Address not found");
      return;
    }

    //Validate the new values on model
    editAddress.address = address;
    editAddress.tls = tls;
    editAddress.staging = staging;
    editAddress.app = appId;
    const errors = await validate(editAddress);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means addressname already in use
    try {
      await addressRepository.save(editAddress);
      await rebuildCaddyfile();
    } catch (e) {
      res.status(409).send("Address already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };

  static deleteAddress = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const addressRepository = getRepository(Address);
    let address: Address;
    try {
      address = await addressRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("Address not found");
      return;
    }
    addressRepository.delete(id);
    await rebuildCaddyfile();
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };
}

export default AddressController;
