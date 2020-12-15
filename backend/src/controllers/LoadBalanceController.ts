import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { LoadBalance } from "../entity/LoadBalance";
import { LoadBalancePolicy } from "../entity/LoadBalancePolicy";
import { rebuildCaddyfile } from "../middlewares/caddy";

class LoadBalanceController {
    static listAll = async (req: Request, res: Response) => {
        //Get lb from database
        const lbRepository = getRepository(LoadBalance);
        const lb = await lbRepository.find({
          relations: ["policy", "address"],
        });
    
        //Send the lb object
        return res.send(lb);
      };
      static listPolicies = async (req: Request, res: Response) => {
        //Get lb from database
        const lbRepository = getRepository(LoadBalancePolicy);
        const policies = await lbRepository.find({
        });
    
        //Send the lb object
        return res.send(policies);
      };
    static getOneById = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id: string = req.params.id;

        //Get the lb from lb
        const lbRepository = getRepository(LoadBalance);
        try {
            const lb = await lbRepository.findOneOrFail(id);
            return res.send(lb)
        } catch (error) {
            return res.status(404).send("Load Balancer not found");
        }
    };
    static newLoadBalancer = async (req: Request, res: Response) => {
        //Get parameters from the body
        let { name, try_duration, try_interval, policy} = req.body;
        let newLb = new LoadBalance();
        newLb.name = name;
        newLb.try_duration = try_duration;
        newLb.try_interval = try_interval;
        newLb.policy = policy;
        //Validade if the parameters are ok
        const errors = await validate(newLb);
        if (errors.length > 0) {
          return res.status(400).send(errors);
        }
    
        //Try to save. If fails, the name is already in use
        const lbRepository = getRepository(LoadBalance);
        try {
          await lbRepository.save(newLb);
          await rebuildCaddyfile();
              //If all ok, send 201 response
        return res.status(201).send(newLb);
        } catch (e) {
          return res.status(409).send(e);
        }
      };
      static editLoadBalancer = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;
    
        //Get values from the body
        let { name, try_duration, try_interval, policy} = req.body;
        //Try to find Load Balancer on database
        const lbRepository = getRepository(LoadBalance);
        let editLb;
        try {
            editLb = await lbRepository.findOneOrFail(id);
        } catch (error) {
          //If not found, send a 404 response
          return res.status(404).send("Load Balancer not found");
     
        }
        //Validate the new values on model
        editLb.name = name;
        editLb.try_duration = try_duration;
        editLb.try_interval = try_interval;
        editLb.appolicyp = policy;
      
        const errors = await validate(editLb);
        if (errors.length > 0) {
          return res.status(400).send(errors);
        }
        //Try to save, if fails, that means name already in use
        try {
          await lbRepository.save(editLb);
          await rebuildCaddyfile();
          
        } catch (e) {
          return res.status(409).send(e);
        }
        //After all send a 204 (no content, but accepted) response
        return res.status(204).send(editLb);
      };
      static deleteLoadBalancer = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;
    
        const lbRepository = getRepository(LoadBalance);
        let lb: LoadBalance;
        try {
            lb = await lbRepository.findOneOrFail(id);
        } catch (error) {
          return res.status(404).send("Load Balancer not found");
        }
        lbRepository.delete(id);
        await rebuildCaddyfile();
        //After all send a 204 (no content, but accepted) response
        return res.status(204).send();
      };
}

export default LoadBalanceController;