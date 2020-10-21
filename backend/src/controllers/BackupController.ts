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
            app: newAppID.id
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
          const appName = endpoint.app__name
          let newAddressID = storedAddresses.find(function(storedAddress){
            return storedAddress.address === addressName
          })

          let newAppId = storedApps.find(function(storedApp){
            return storedApp.name === appName
          })
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
        res.status(201).send("Backup Restored");
      }
    }
}

export default BackupController;
