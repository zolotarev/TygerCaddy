import db from '../models';
import bcrypt from 'bcryptjs';
const User = db.User;
const Config = db.Configuration
const caddy = require('./caddyService');
const util = require('util');
module.exports = {

    //check there is an admin account, create it if not
    getAdminAccount: async function() {
        try {            
            console.log("Checking for admin account")
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
                return "Admin account found, doing nothing"
            }
        } catch(error){
            console.log(error)
            return error
        }

    },

    getInitialConfig: async function(){
        try {
            console.log("Checking for initial config")
            const config = await Config.findAll({where:{id: 1}});
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
                const result = await Config.create(caddyConfig)
                //console.log("Caddy Config created: " + result)
                return "Caddy Config created: " + result
            }else {
                //console.log("Caddy Config found, doing nothing")
                return "Caddy Config found, doing nothing"
            }
        } catch (err){
            console.log(err)
            return false
        }
    },

    caddyRunning: async function() {
        try {
            console.log("Checking to see if Caddy API is accessible.....")
            var caddyConfig =  await caddy.getCaddyConfig();
            return util.inspect(caddyConfig.data)
        }catch(error){
            return error
        }
    }

}
