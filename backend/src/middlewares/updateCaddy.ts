const fs = require("fs");
const { exec } = require("child_process");
require("dotenv").config();
import { getConfig, initialGlobalConfig } from "./generateCaddyBlock";
import { getRepository } from "typeorm";

import { Address } from "../entity/Address";
import { Endpoint } from "../entity/Endpoint";
import { App } from "../entity/App";
import { Config } from "../entity/Config";

export const writeCaddyfile = async (content: string) => {
  try {
    console.log("Writing new Caddyfile...")
    await fs.writeFile(process.env.CADDYFILE_PATH, content, () => {

      //reloadCaddy();
      return "Caddyfile written successfully!";
    });
  } catch (error) {
    return error;
  }
};

// export const reloadCaddy = async () => {
//  // const child = exec("caddy", ['reload', '--config /tygercaddy/backend/db/Caddyfile']);
//   const child = exec("caddy reload --config /tygercaddy/backend/db/Caddyfile");
//   console.log("Caddy Reloaded");
//   return "Caddy Reloaded";
// };
export const newAddressGenerate = async () => {
  console.log("Generating Caddyfile!");

  const config = await getConfig();

  let addressBlock = await initialGlobalConfig();


  const addressRepository = getRepository(Address);
  const endpointRepository = getRepository(Endpoint);
  const addresses = await addressRepository
    .find({ relations: ["app", 'endpoint'] })
    .then((addresses) => {
      console.log("Getting all Addresses...")
      console.log("Addresses found: " + addresses.length)
      let thisBlock = "";
      addresses.forEach(async (address) => {
        let tls = "";
        if (address.tls) {
          console.log("Address uses tls..")
        }
        console.log("Getting endpoints for the address. ")
        let endpoints = await endpointRepository.find(
            {
              where:{address: {id:address.id} },
              relations:['app', 'address'],
              
            }
          ).then((endpoints) => {
            console.log("Getting Endpoints for address: " + address.id)

            let endpointsBlock = ""
            if(endpoints) {
              console.log("Address has endpoints, generating config..")
              endpoints.forEach((endpoints) =>{
                endpointsBlock = endpointsBlock + "\t reverse_proxy " + endpoints.endpoint + " " + endpoints.app.ip_address + ":" + endpoints.app.port_number + " { \n \n \t} \n "
              })
            }

            if (!address.app.verify_ssl){
              thisBlock =
              address.address +
              " { \n" +
              "\t reverse_proxy " +
              address.app.ip_address +
              ":" +
              address.app.port_number +
              " { \n " +
              "\t \t transport http { \n \t \t \t tls_insecure_skip_verify \n \t \t \n}" +
              "\t } \n" 
            }else {
              thisBlock =
            address.address +
            " { \n" +
            "\t reverse_proxy " +
            address.app.ip_address +
            ":" +
            address.app.port_number +
            " { \n \n " +
            "\t } \n" 
            }
            if(endpointsBlock){
              thisBlock = thisBlock + endpointsBlock +  tls +
              "} \n\n";
            }else{
              thisBlock = thisBlock +  tls +
              "} \n\n";
            }
            console.log("Block Generation completed")
          addressBlock = addressBlock + thisBlock;
          console.log(addressBlock)
          endpointsBlock = "";
          thisBlock = "";
          }).then(()=>{
            let writefile = writeCaddyfile(addressBlock);
            //console.log(writefile)
          })
      });
});
};
