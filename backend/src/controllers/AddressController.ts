import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Address } from "../entity/Address";
import { rebuildCaddyfile } from "../middlewares/caddy";
import { ndjsonToJsonText } from "ndjson-to-json-text";
class AddressController {

  static generateCaddyfile = async (req: Request, res: Response) =>{
    let generate = await rebuildCaddyfile();
    return res.send(generate)
  };
  static getLogForAddress = async (req: Request, res: Response) =>{
    //Get the ID from the url
    const id: string = req.params.id;
    const addressRepository = getRepository(Address);
    var fs = require('fs');
    const path = require("path");
    const logPath = process.env.LOG_PATH
    var result: any;
      
     try {
      const address = await addressRepository.findOneOrFail(id);
      var result: any;
      var log = fs.readFileSync(path.resolve(__dirname, logPath + address.address + '.json'), 'UTF8')

      result = ndjsonToJsonText(log)
      return res.send(result)
    } catch (error) {
      return res.status(404).send(error);
    } 
    
  };
  static listAll = async (req: Request, res: Response) => {
    //Get addresses from database
    const addressRepository = getRepository(Address);
    const addresses = await addressRepository.find({
      relations: ["app", "cert", "dns", "policy"],
    });

    //Send the addresses object
    return res.send(addresses);
  };

  static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: string = req.params.id;

    //Get the address from database
    const addressRepository = getRepository(Address);
    try {
      const address = await addressRepository.findOneOrFail(id);
      return res.send(address)
    } catch (error) {
      return res.status(404).send("Address not found");
    }
  };

  static newAddress = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { address, tls, staging, app, forceHTTPChallenge, cert, custom_cert, dns, policy } = req.body;
    console.log(app)
    let newAddress = new Address();
    newAddress.address = address;
    newAddress.tls = tls;
    newAddress.staging = staging;
    newAddress.app = app;
    newAddress.forceHTTPChallenge = forceHTTPChallenge
    newAddress.cert = cert
    newAddress.custom_cert = custom_cert
    newAddress.dns = dns
    newAddress.policy = policy
    console.log(newAddress)
    //Validade if the parameters are ok
    const errors = await validate(newAddress);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }

    //Try to save. If fails, the addressname is already in use
    const addressRepository = getRepository(Address);
    try {
      let result = await addressRepository.save(newAddress);
      await rebuildCaddyfile();
          //If all ok, send 201 response
    return res.status(201).send(result);
    } catch (e) {
      return res.status(409).send(e);
    }


  };

  static editAddress = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    let { address, tls, staging, app, forceHTTPChallenge, cert, custom_cert, dns, policy } = req.body;
    //Try to find address on database
    const addressRepository = getRepository(Address);
    let editAddress;
    try {
      editAddress = await addressRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      return res.status(404).send("Address not found");
 
    }
    //Validate the new values on model
    editAddress.address = address;
    editAddress.tls = tls;
    editAddress.staging = staging;
    editAddress.app = app;
    editAddress.forceHTTPChallenge = forceHTTPChallenge
    editAddress.cert = cert
    editAddress.custom_cert = custom_cert
    editAddress.dns = dns
    editAddress.policy = policy
  
    const errors = await validate(editAddress);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }
    //Try to save, if fails, that means addressname already in use
    try {
      await addressRepository.save(editAddress);
      await rebuildCaddyfile();
      
    } catch (e) {
      return res.status(409).send(e);
    }
    

    //After all send a 204 (no content, but accepted) response
    return res.status(204).send();
  };

  static deleteAddress = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const addressRepository = getRepository(Address);
    let address: Address;
    try {
      address = await addressRepository.findOneOrFail(id);
    } catch (error) {
      return res.status(404).send("Address not found");
    }
    addressRepository.delete(id);
    await rebuildCaddyfile();
    //After all send a 204 (no content, but accepted) response
    return res.status(204).send();
  };
}

export default AddressController;
