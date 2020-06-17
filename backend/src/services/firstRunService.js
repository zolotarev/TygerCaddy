import db from '../models';
import bcrypt from 'bcryptjs';
const User = db.User;
const Configuration = db.Configuration;
const caddy = require('./caddyService');

function Admin(){
    Admin.prototype.check = async function(){
        try {
            console.log("Checking for admin")
            const admin = await User.findAll({where:{username: "admin"}});
            if (!admin.length){
                console.log("Admin not found, creating default admin account. ")
               
                //Hash the password field and replace the plain text version with the hashed version
                let salt = await bcrypt.genSalt(10)
                let password = "password123";
                let hashedPassword = await bcrypt.hash(password, salt);
                let adminUser = {
                    firstname: "Admin",
                    lastname:"",
                    username: "admin",
                    roles: ['superAdmin', 'user'],
                    avatar: "https://eu.ui-avatars.com/api/?name=Admin",
                    email: "admin@admin.com",
                    password:hashedPassword, 
                };
                const result = await User.create(adminUser)
                console.log("Admin created: " + result)
            }else {
                console.log("Admin found, doing nothing")
            }
        } catch (err){
            console.log(err)
        }
        return "Admin check complete";
    };   
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
            if (!config){
                console.log("Caddy is not running!")
                return "Caddy Config check failed!";
            }else {
                console.log("Caddy is running!")
                return "Caddy Config check complete";
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