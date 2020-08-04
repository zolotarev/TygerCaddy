import db from '../models';
import bcrypt from 'bcryptjs';
const User = db.User;
const Configuration = db.Configuration;
const caddy = require('./caddyService');
const initial = require('./InitialLoadService');

function Admin(){
    Admin.prototype.check = async function(){
        try {
            var AdminAccount = await initial.getAdminAccount()
            console.log(AdminAccount)
            console.log("Admin Check Complete...")
            return true
        } catch (err){
            console.log(err)
            return false
        }
        
    };
    
    Admin.prototype.configCheck = async function(){
        try {
            var InitialConfig = await initial.getInitialConfig()
            
            console.log(InitialConfig)
            console.log("Config Check Complete...")
            return true
        }catch(err){
            console.log(err)
            return false
        }
    };

    Admin.prototype.caddyReady = async function(){
        try {
            var CaddyRunning = await initial.caddyRunning()
            console.log("Config is: " + CaddyRunning)
            console.log("Config Check Complete...")
            return true
        } catch(err){
            console.log(err)
            return false
        }
    };

    Admin.prototype.applyCaddyServer = async function(){
        try{
            console.log("Setting the initial server config....");
            var caddyServer = caddy.applyCaddyConfig()
        }catch(error){

        }
    }

    Admin.prototype.caddyConfig = async function(){
        try {
            console.log("Setting up caddy config")
            const config = await Configuration.findAll({where:{id: 1}});
            if (!config.length){
                console.log("Config not found, creating default Caddy Config. ")
                let caddyConfig = {
                    server_name: "Tyger2",
                    automatic_https: true,
                    redirect_https: true,
                    persist: true,
                    disabled: false,
                    enforce_origin: false,
                    origins: ["localhost:2019","0.0.0.0:2019"], 
                    listen: "0.0.0.0:2019",
                    external_address:"",
                    external_port:""
                };
                const result = await Configuration.create(caddyConfig)
                console.log("Caddy Config created: " + result)
            }else {
                console.log("Caddy Config found, doing nothing")
            }
        } catch (err){
            console.log(err)
        }
        return "Caddy Config check complete";
    };   

    Admin.prototype.checkCaddyStatus = async function(){
        try {
            console.log("Checking Caddy has started")
            const status = await caddy.checkCaddyStatus();
            var config = status.data
            //console.log(config)
            if (!config){
                console.log("Caddy is not running!")
                return false
            }else {
                console.log("Caddy is running!")
                return true
            }
        } catch (err){
            console.log(err)
        }
        
    };  

    Admin.prototype.applyCaddyConfig = async function(){
        
        try {
            console.log("Getting Caddy Config from db..")
            let config = await Configuration.findAll({where:{id: 1}});
            //console.log(config)
            if (config.length){
                console.log("Caddy Config apply failed!");
                return "Caddy Config apply failed!";
            }else {
                let data = {
                    admin: {
                        config: 
                            {persist: config.persist},
                            disabled: config.disabled,
                            enforce_origin: config.enforce_origin,
                            listen:config.listen,
                            origins:config.origins
                        }
                    } 
                    console.log("Data captured, sending config to Caddy")
                    caddy.applyCaddyConfig(data);
                    
                }
                console.log("Caddy Config apply complete");
                console.log("Caddy is running!")
                return "Caddy Config check complete";
        } catch (err){
            console.log(err)
        }
    };   
}
module.exports = Admin;