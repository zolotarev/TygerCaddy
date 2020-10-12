import { getRepository } from "typeorm";

import { Address } from "../entity/Address";
import { App } from "../entity/App";
import { Config } from "../entity/Config";
import { resolve } from "url";

export const getConfig = async () => {
  const configRepository = getRepository(Config);
  const config = await configRepository.findOne(1);
  return config;
};

export const initialGlobalConfig = async () => {
  let configBlock = "{ \n \t http_port 80 \n \t https_port 443 \n";
  const config = await getConfig();
  if (config.automatic_https) {
    configBlock = configBlock + "\n \t auto_https disable_redirects \n } \n";
  } else if (config.redirect_https && config.automatic_https) {
    configBlock = "\n \t auto_https on \n } \n ";
  } else if (!config.automatic_https) {
    configBlock = configBlock + "\n \t auto_https off \n } \n";
  }

  configBlock = configBlock + ":{$FRONTEND_PORT} { \n \t root * /tygercaddy/frontend/dist \n \t root * /tygercaddy/frontend/dist \n \t encode gzip zstd \n \t try_files {path} {path}/ /index.html \n \t file_server \n }";
  return configBlock;
};

export const initialCaddyBlockGenerate = async () => {
  console.log("Generating Caddyfile!");
  const config = await getConfig();
  let addressBlock = await initialGlobalConfig();
  const addressRepository = getRepository(Address);
  const addresses = await addressRepository
    .find({ relations: ["app"] })
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
        thisBlock =
          address.address +
          " { \n" +
          "\t reverse_proxy " +
          address.app.ip_address +
          ":" +
          address.app.port_number +
          " { \n \n " +
          "\t } \n" +
          tls +
          "} \n\n";

        addressBlock = addressBlock + thisBlock;
        thisBlock = "";
      });
    });
  return addressBlock;
};
