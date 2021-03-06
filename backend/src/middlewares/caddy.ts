const fs = require('fs');
import { getRepository } from "typeorm";
import { Config } from "../entity/Config";
import { User } from "../entity/User";
import { Address } from "../entity/Address";
import { Endpoint } from "../entity/Endpoint";
import { stderr } from "process";
import { verify } from "jsonwebtoken";

export const checkCaddy = async () => {
    //check that caddy is available by polling the config.
    //check that the caddyfile exsists
    console.log(process.env.CADDYFILE_PATH)
    if (fs.existsSync(process.env.CADDYFILE_PATH)) {
        return 'Caddyfile exists!';
      }else {
        await rebuildCaddyfile()
        return 'Caddyfile Missing!';
      }
            
};

export const checkLogDir = async (address) => {

    var directory = "/tygercaddy/backend/db/logs/"

    if (fs.existsSync(directory)) {
        console.log('Log Directory exists!');
        return "Log Directory exists!"
    } else {
        console.log('Directory not found. Creating it now. ');
        fs.mkdir(directory, function(err) {
            if (err) {
              console.log(err)
            } else {
              console.log("New directory successfully created.")
              return "New directory successfully created."
            }
        })
    }
};

export const getConfig = async () => {
    const configRepository = getRepository(Config);
    const config = await configRepository.findOne({where:{id:1}});
    return config;
};
export const getAddresses = async () => {
    const addressRepository = getRepository(Address);
    const addresses = await addressRepository.find({ relations: ["app", 'endpoint', 'cert', 'dns', 'policy', 'policy.policy'] })
    return addresses;
};
export const getEndpoints = async (addressId) => {
    const endpointRepository = getRepository(Endpoint);
    let endpoints = await endpointRepository.find(
        {
          where:{address: {id:addressId} },
          relations:['app', 'address'],
          
        }
      )
    
    return endpoints;
};     
export const getAdmin = async () => {
const userRepository = getRepository(User)
const admin = await userRepository.findOne({where:{id:1}});
return admin
};

export const writeCaddyfile = async (content: string) => {
    try {
      console.log("Writing new Caddyfile...")
      await fs.writeFile(process.env.CADDYFILE_PATH, content, () => {
        
      });
      console.log("Caddyfile written successfully!")
      return "Caddyfile written successfully!";
    } catch (error) {
      return error;
    }
};

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
} 
if (config.redirect_https && config.automatic_https) {
    configBlock = "{ \n \t \n } \n ";
    console.log("Set the Auto HTTPS On")
} 
if (!config.automatic_https) {
    configBlock = configBlock + "\n \t auto_https off \n } \n";
    console.log("Set the Auto HTTPS Off")
}
configBlock = configBlock + ":{$FRONTEND_PORT} { \n \t root * /tygercaddy/frontend/dist \n \t encode gzip zstd \n \t try_files {path} {path}/ /index.html \n \t file_server \n } \n";
console.log("Config Block Generated...")
return configBlock;
};
export const generateEndpointsBlock = async (endpoints) => {
    let endpointsBlock = "";
    console.log("Address has endpoints, generating config..");
    endpoints.forEach((endpoints) =>{

        if (!endpoints.app.verify_ssl){
            endpointsBlock = endpointsBlock + "\t reverse_proxy " + endpoints.endpoint + " " + endpoints.app.ip_address + ":" + endpoints.app.port_number + " { \n " +
            "\t \t transport http { \n \t \t \t tls_insecure_skip_verify \n \t \t } \n" +
            "\t } \n" 
        } else {
            endpointsBlock = endpointsBlock + "\t reverse_proxy " + endpoints.endpoint + " " + endpoints.app.ip_address + ":" + endpoints.app.port_number + " { \n \n \t} \n "
        }  
    });
    return endpointsBlock
};

export const generateProxyBlock = async (address) => {
    let proxyBlock = "";
    console.log("Generating proxy block for: " + address.address);
    let apps = ""
        address.app.forEach((app)=>{
            apps = apps + app.ip_address + ":" + app.port_number + " "
        });
        let lbblock = ""
        if(address.policy){
            lbblock = "\n \t \t " +
                      "lb_policy " + address.policy.policy.name +
                      "\n \t \t " +
                      "lb_try_duration " + address.policy.try_duration + 
                      "\n \t \t " +
                      "lb_try_interval " + address.policy.try_interval + 
                      "\n \t \t "
        }
        let ssl_skip = ""
        let skip_ssl_verify = address.app.some( app => app['verify_ssl'] === true )
        if(skip_ssl_verify) {
            ssl_skip="\n \t \t transport http { \n \t \t \t tls_insecure_skip_verify \n \t \t } \n"
        }
        proxyBlock =
            address.address +
            " { \n" +
            "\t reverse_proxy " + apps +
            " { \n " +
            lbblock + 
            ssl_skip +
            "\t } \n" 
    return proxyBlock
};
export const generateTlsBlock = async (address) => {
    let tlsBlock = "";
    console.log("Generating TLS block for: " + address.address);
    if(address.custom_cert){
        tlsBlock = " \t tls " + address.cert.cert_path + " " + address.cert.pem_path + " \n"
    }else{
            if(address.forceHTTPChallenge){
                tlsBlock =
                " \t tls { \n" +
                "\t \t \t issuer acme { \n"+
                "\t \t \t \t disable_tlsalpn_challenge \n "+
                "\t \t \t \t resolvers 8.8.8.8 \n" +
                "\t \t \t } \n"+
                "\t }" 
            }else{
                if( address.dns ){
                    if (address.dns.api_key && address.dns.name){
                        tlsBlock =
                        " \t tls { \n" +
                        "\t \t \t issuer acme { \n"+
                        "\t \t \t \t dns " + address.dns.name + " " + address.dns.api_key + "\n "+
                        "\t \t \t \t resolvers 8.8.8.8 \n" +
                        "\t \t \t } \n"+
                        "\t }" 
                        }
                }else {
                    tlsBlock = ""
                  }
          } 
        }
        return tlsBlock
    }

export const generateLogPart = async (address) => {
    var log = "\n \t \t log {" +"\n \t \t \t output file /tygercaddy/backend/db/logs/" + address.address + ".json \n"+ "\n \t \t \t format json \n "+ "\t \t } \n";

    return log
};

export const rebuildCaddyfile = async () => {
    //Log process starting
    console.log("Generating Caddyfile!");

    //Initialise Caddyfile String
    let CaddyFileString = "";
    
    
    //Get all required DB entries
    console.log("Getting App Config...");
    const config = await getConfig();
    console.log("Getting all Addresses...");
    const addresses = await getAddresses();
    console.log("Addresses found: " + addresses.length)

    //Get the config block to start the Caddyfile String
    console.log("Generating Config Block...");
    const configBlock = await initialGlobalConfig();
    CaddyFileString = configBlock;

    //Start Processing each Address Block
    for (const address of addresses){

        //check if log directory exists, if not create it
        await checkLogDir(address.address)

        if (address.tls) {
            console.log("Address uses tls..")
        }

        //Get any and all endpoints associated with the current address:
        console.log("Getting endpoints for the address: " + address.address);
        let endpoints = await getEndpoints(address.id);
        
        //If endpoints were found, build the required blocks
        let endpointsBlock = ""
        if (endpoints){
            endpointsBlock = await generateEndpointsBlock(endpoints);
        };
        //Start Building the Proxy Blocks
        let proxyBlock = await generateProxyBlock(address);

        //If DNS Verification is used, add the TLS block.
        let tlsBlock = await generateTlsBlock(address);
        
        //Add the log details

        let logBlock = await generateLogPart(address);

        //Write Address to CaddyFileString
        CaddyFileString = CaddyFileString + proxyBlock + endpointsBlock + tlsBlock + logBlock + "\n} \n"
    };

    //Send generated string to Caddyfile Writer
    console.log("Sending CaddyFileString to Writer..")
    writeCaddyfile(CaddyFileString);
    return "Rebuild completed!"
}
