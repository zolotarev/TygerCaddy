const fs = require("fs");
const { exec } = require("child_process");
require("dotenv").config();
import { getConfig, initialGlobalConfig } from "./generateCaddyBlock";
import { AdvancedConsoleLogger, getRepository } from "typeorm";

import { Address } from "../entity/Address";
import { Endpoint } from "../entity/Endpoint";
import { App } from "../entity/App";
import { Config } from "../entity/Config";

export const writeCaddyfile = async (content: string) => {
  try {
    await fs.writeFile(process.env.CADDYFILE_PATH, content, () => {
      reloadCaddy();
      return "Caddyfile written successfully!";
    });
  } catch (error) {
    return error;
  }
};

export const reloadCaddy = async () => {
 // const child = exec("caddy", ['reload', '--config /tygercaddy/backend/db/Caddyfile']);
  const child = exec("caddy reload --config /tygercaddy/backend/db/Caddyfile");
  console.log("Caddy Reloaded");
  return "Caddy Reloaded";
};
export const newAddressGenerate = async () => {
  console.log("Generating Caddyfile!");
  const config = await getConfig();
  let addressBlock = await initialGlobalConfig();
  const addressRepository = getRepository(Address);
  const endpointRepository = getRepository(Endpoint);
  const addresses = await addressRepository
    .find({ relations: ["app", 'endpoint'] })
    .then((addresses) => {
      let thisBlock = "";
      addresses.forEach(async (address) => {
        let tls = "";
        if (address.tls) {
          if (config.use_dns_verification) {
            tls =
              "\t tls { \n  \t \t dns " +
              config.dns_provider_name +
              " " +
              config.dns_api_token +
              "\n \t } \n";
          }
        }
        let endpoints = await endpointRepository.find(
            {
              where:{address: {id:address.id} },
              relations:['app', 'address'],
              
            }
          ).then((endpoints) => {
            let endpointsBlock = ""
            if(endpoints) {
              endpoints.forEach((endpoints) =>{
                endpointsBlock = endpointsBlock + "reverse_proxy " + endpoints.endpoint + " " + endpoints.app.ip_address + ":" + endpoints.app.port_number + " { \n \n } \n "
              })
            }
          thisBlock =
            address.address +
            " { \n" +
            "\t reverse_proxy " +
            address.app.ip_address +
            ":" +
            address.app.port_number +
            " { \n \n " +
            "\t } \n" 
  
            if(endpointsBlock){
              thisBlock = thisBlock + endpointsBlock +  tls +
              "} \n\n";
            }else{
              thisBlock = thisBlock +  tls +
              "} \n\n";
            }
            
          addressBlock = addressBlock + thisBlock;
          endpointsBlock = "";
          thisBlock = "";
          })
      });

  try {
    let writefile = await writeCaddyfile(addressBlock);
    console.log(addressBlock)
    return writefile;
  } catch (error) {
    console.log(error);
    return error;
  }
});
};
