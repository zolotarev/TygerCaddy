import { getRepository } from "typeorm";

import { Address } from "../entity/Address";
import { App } from "../entity/App";
import { Config } from "../entity/Config";
import { User } from "../entity/User";
import { resolve } from "url";

export const getConfig = async () => {
  const configRepository = getRepository(Config);
  const config = await configRepository.findOne({where:{id:1}, relations:['dns_provider_name']});
  //console.log(config)
  return config;
};

export const getAdmin = async () => {
  const userRepository = getRepository(User)
  const admin = await userRepository.findOne({where:{id:1}});
  return admin
}

export const initialGlobalConfig = async () => {
  console.log("Starting Global Block")
  let configBlock = "{ \n \t http_port 80 \n \t https_port 443 \n";
  
  const config = await getConfig();
  console.log("Getting config from DB")
  const admin = await getAdmin();
  console.log("Getting admin user from DB")

  let email = "\n \t email " + admin.email + "\n"
  configBlock = configBlock + email

  if (config.automatic_https) {
    configBlock = configBlock + "\n \t auto_https disable_redirects \n } \n";
    console.log("Set the Auto HTTPS Disable redirects")
  } else if (config.redirect_https && config.automatic_https) {
    configBlock = "\n \t auto_https on \n } \n ";
    console.log("Set the Auto HTTPS On")
  } else if (!config.automatic_https) {
    configBlock = configBlock + "\n \t auto_https off \n } \n";
    console.log("Set the Auto HTTPS Off")
  }
  configBlock = configBlock + ":{$FRONTEND_PORT} { \n \t root * /tygercaddy/frontend/dist \n \t root * /tygercaddy/frontend/dist \n \t encode gzip zstd \n \t try_files {path} {path}/ /index.html \n \t file_server \n } \n";
  console.log("Config Block Generated...")
  return configBlock;
};

// export const initialCaddyBlockGenerate = async () => {
//   console.log("Generating Caddyfile!");
//   const config = await getConfig();
//   let addressBlock = await initialGlobalConfig();
//   const addressRepository = getRepository(Address);
//   const addresses = await addressRepository
//     .find({ relations: ["app"] })
//     .then((addresses) => {
//       let thisBlock = "";
//       addresses.forEach(async (address) => {
//         let tls = "";
//         if (address.tls) {
//           if (config.use_dns_verification) {
//             tls =
//               "\t tls { \n  \t \t dns " +
//               config.dns_provider_name +
//               " " +
//               config.dns_api_token +
//               "\n \t } \n";
//           }
//         }
//         thisBlock =
//           address.address +
//           " { \n" +
//           "\t reverse_proxy " +
//           address.app.ip_address +
//           ":" +
//           address.app.port_number +
//           " { \n \n " +
//           "\t } \n" +
//           tls +
//           "} \n\n";

//         addressBlock = addressBlock + thisBlock;
//         thisBlock = "";
//       });
//     });
//   return addressBlock;
// };
