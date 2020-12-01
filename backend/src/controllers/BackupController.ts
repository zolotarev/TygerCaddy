import { Request, Response } from "express";
import { getRepository,getConnection } from "typeorm";
import { validate } from "class-validator";

import { Address } from "../entity/Address";
import { App } from "../entity/App";
import { Endpoint } from "../entity/Endpoint";

class BackupController {
  static tyger2Restore = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { addresses, apps, endpoints } = req.body.backup;
    let newApps = []
    let newAddresses = []
    let storedApps = []
    let storedAddresses = []
    let newEndpoints = []
    const appRepository = getRepository(App);
    const addressRepository = getRepository(Address);
    // If backup contains apps, create them
    if (apps) {
      apps.forEach(app =>{
        let newIP = app.url.split('/')[2].split(':')[0];
        let newPort = app.url.split('/')[2].split(':')[1];
        let port = ""
        if (!newPort){
          port = "80"
        } else {
          port = newPort
        }
        let currentApp = {
          name: app.name,
          verify_ssl: !app.insecure_skip_verify,
          ip_address: newIP,
          port_number: port
        }
        newApps.push(currentApp)
      });
    }
    await getConnection().createQueryBuilder().insert().into(App)
         .values(
           newApps
         )
         .execute()
          storedApps = await appRepository.find();
       // If backup contains address, create them and associate them with the stored apps
      if (addresses) {
        addresses.forEach(address =>{
          const name = address.app__name
          let newAppID = storedApps.find(function(app){
            return app.name === name
          })
          let currentAddress = {
            address: address.address,
            tls: address.tls,
            staging: address.staging,
            app: newAppID.id,
            forceHTTPChallenge: 0
         }
         newAddresses.push(currentAddress)
        });

        await getConnection().createQueryBuilder().insert().into(Address)
        .values(
          newAddresses
        )
        .execute()
        storedAddresses = await addressRepository.find();

        // If backup contains endpoints, create them and associate them with the apps and addresses. 
        if (endpoints){
          endpoints.forEach(endpoint => {
          const addressName = endpoint.address__address
          const appName = endpoint.proxy_to__name
          let newAddressID = storedAddresses.find(function(storedAddress){
            return storedAddress.address === addressName
          })
          console.log(newAddressID)
          let newAppId = storedApps.find(function(storedApp){
            return storedApp.name === appName
          })
          console.log(newAppId)
            let currentEndpoint = {
              address: newAddressID.id,
              endpoint: endpoint.endpoint,
              app: newAppId.id,
            }
            newEndpoints.push(currentEndpoint)
          });
          await getConnection().createQueryBuilder().insert().into(Endpoint)
          .values(
            newEndpoints
          )
          .execute()
        }
        return res.status(201).send("Backup Restored");
      }
  }
  static tygercaddyRestore = async (req: Request, res: Response) => {
    let { addresses, apps, endpoints } = req.body.backup;

    if(apps){
      await getConnection().createQueryBuilder().insert().into(App)
      .values(
        apps
      )
      .execute()
    }
    if(addresses){
      await getConnection().createQueryBuilder().insert().into(Address)
      .values(
        addresses
      )
      .execute()
    }
    if(endpoints){
      await getConnection().createQueryBuilder().insert().into(Endpoint)
      .values(
        endpoints
      )
      .execute()
    }
  }
  static exportBackup = async (req: Request, res: Response) => {
    const appRepository = getRepository(App);
    const addressRepository = getRepository(Address);
    const endpointRepository = getRepository(Endpoint);
    let output = {};

    let addresses = await addressRepository.find({ relations: ["app"] });
    let apps = await appRepository.find(); 
    let endpoints = await endpointRepository.find({ relations: ["app", "address"] });
    
    output = {
      addresses: addresses,
      apps: apps, 
      endpoints: endpoints
    }

    return res.status(200).send(output)
    
  }
}

export default BackupController;
