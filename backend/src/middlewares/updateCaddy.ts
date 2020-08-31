const fs = require('fs')
require('dotenv').config();
import { getConfig, initialGlobalConfig } from "./generateCaddyBlock";
import { getRepository } from "typeorm";

import { Address } from "../entity/Address";
import { App } from "../entity/App";
import { Config } from "../entity/Config";

export const writeCaddyfile = async (content: string) => {
    try {
        await fs.writeFile(process.env.CADDYFILE_PATH, content, () => {
            return "Caddyfile written successfully!"
        })
        
    } catch(error) {
        return error
    }

}
export const newAddressGenerate = async () => {
    console.log("Generating Caddyfile!")
    const config = await getConfig();
    let addressBlock = await initialGlobalConfig();
    const addressRepository = getRepository(Address);
    const addresses = await addressRepository.find({relations: ['app']}).then(addresses => {
        let thisBlock = "";
        addresses.forEach(async address => {
            let tls = "";
            if(address.tls){
                if (config.use_dns_verification) {
                    tls = "\t tls { \n  \t \t dns " + config.dns_provider_name + " " + config.dns_api_token + "\n \t } \n";
                }
            }
            thisBlock = address.address + " { \n" + "\t reverse_proxy " + address.app.ip_address + ":" + address.app.port_number + " { \n \n " + "\t } \n" + tls + "} \n\n";
            
            addressBlock = addressBlock + thisBlock;
            thisBlock = "";
            
        });
        
    })
    try {
        let writefile = await writeCaddyfile(addressBlock);
        return writefile
    } catch(error){
        console.log(error);
        return error
    }
}