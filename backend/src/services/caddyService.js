const axios = require('axios');
const caddyHost = '10.10.200.73';
import db from '../models';
import { Console } from 'console';
const Address = db.Address;
const App = db.App;
const util = require('util')
const caddy = {
    url: 'http://' + caddyHost + ':2019',
    load: 'http://' + caddyHost + ':2019/load/',
    config: 'http://' + caddyHost + ':2019/config/',
    object: 'http://' + caddyHost + ':2019/id/',
    proxy: 'http://' + caddyHost + ':2019/config/apps/http/servers/tyger2/routes'
};

const initialApp = {
    "http": {
        "servers": {
            "tyger2": {
                "@id":"tyger2",
                "automatic_https": {
                    "disable": true,
                    "disable_redirects": true,
                },
                "listen": [":80", ":443"],
                "routes": []
            }
        }
    }
}

module.exports = {

    //Startup Actions

    //ensures the Caddy service is running and inital config is loaded. 
    getCaddyConfig: async function () {
        try {
            var config = await axios.get(caddy.config);
            return config
        } catch (err) {
            return err
        }
    },


    addCaddyApp: async (addressId) => {
        try {
            let address = await Address.findOne({
                    where: {
                        id: addressId
                    },
                    include:[
                        {
                            model: App,
                        },
                    ],
                });
            //console.log(address)
            let route = {
                "@id": address.id,
                "match": [{
                    "host": [
                        address.address
                    ]
                }],
                "handle": [{
                    "@id": address.App.id,
                    "handler": "reverse_proxy",
                    "upstreams": [{
                        "dial": address.App.url
                    }, ],
                    "transport": {
                        "protocol": "http",
                        "tls": {
                            "insecure_skip_verify": address.App.verify_ssl,
                        }
                    }
                }]
            }
            var saveConfig = await axios.post(caddy.proxy, route);
            //console.log(address)
            return address
        } catch (err) {
            console.error(err)
            return err
        }
    },

    updateCaddyApp: async function (addressId) {
        //TODO: finish update function here
        try {
            let address = await Address.findOne({
                    where: {
                        id: addressId
                    },
                    include:[
                        {
                            model: App,
                        },
                    ],
                });
            //console.log(address)
            appName = address.App.name.replace(/\s+/g, '');
            let route = {
                "@id": address.id,
                "match": [{
                    "host": [
                        address.address
                    ]
                }],
                "handle": [{
                    "handler": "reverse_proxy",
                    "upstreams": [{
                        "@id": appName,
                        "dial": address.App.url
                    }, ],
                    "transport": {
                        "protocol": "http",
                        "tls": {
                            "insecure_skip_verify": address.App.verify_ssl,
                        }
                    }
                }]
            }
            var saveConfig = await axios.patch(caddy.object + addressId + '/', route);
            //console.log(address)
            return address
        } catch (err) {
            console.error(err)
            return err
        }
    },
    updateCaddyUpstream: async function (appId) {
        //TODO: finish update function here
        try {
            let app = await App.findOne({
                    where: {
                        id: appId
                    },
                });
            //Check if app is in config. 

            let caddyUpstream = axios.get(caddy.object + app.id);
            console.log(caddyUpstream);
            appName = app.name.replace(/\s+/g, '');
            let handle = {
                "handle": [{
                    "@id": appName,
                    "handler": "reverse_proxy",
                    "upstreams": [{
                        "dial": app.url
                    }, ],
                    "transport": {
                        "protocol": "http",
                        "tls": {
                            "insecure_skip_verify": app.verify_ssl,
                        }
                    }
                }]
            }
            var saveConfig = await axios.patch(caddy.object + appName + '/', handle);
            //console.log(address)
            return address
        } catch (err) {
            console.error(err)
            return err
        }
    },
    //Delete the entry in caddy when the entry is deleted from the database
    deleteCaddyApp: async function (addressId) {
        //TODO: delete function here
        try {
            var deleteAddress = await axios.delete(caddy.object + addressId + '/')
            //console.log(deleteAddress.result);
            return deleteAddress
        } catch (error) {
            console.log(error)
            return error
        }
        
    },


    checkCaddyStatus: async () => {
        try {
            var caddyConf = await axios.get(caddy.config);
            return caddyConf;
        } catch (error) {
            return error;
        }
    },
    applyCaddyConfig: async function (dbConfig) {
        //TODO: apply function here
        try {
            //console.log(dbConfig);
            var config = await axios.get(caddy.config);
            console.log("Apps Config: " + util.inspect(config.data.apps))
            if (!config.data.apps) {
                console.log("Apps Server not yet set up... Doing that now...")
                var initial = await axios.post(caddy.config + "apps/", initialApp);

                if(initial.status === 200){
                    console.log("Beginning population of existing addresses...")
                    var initialConfig = this.generateInitialConfig();
                }
                return initialConfig
            } else {
                console.log("Apps are already set up....")
                return false;
            }
        } catch (err) {
            return err
        }
    },

    generateInitialConfig: async function(){
        try{
            console.log("Getting all addresses.....")
            var allAddresses = await Address.findAll({include: [{model: App}]})
            
            let routeArray = [];
            allAddresses.forEach( 
                (address) => { 
                    //appName = address.App.name.replace(/\s+/g, '');
                    //console.log(appName);
                    let route = {
                        "@id": address.id,
                        "match": [{
                            "host": [
                                address.address
                            ]
                        }],
                        "handle": [{
                            "@id": address.App.name.replace(/\s+/g, ''),
                            "handler": "reverse_proxy",
                            "upstreams": [{
                                "dial": address.App.url
                            }],
                            "transport": {
                                "protocol": "http",
                                "tls": {
                                    "insecure_skip_verify": false
                                }
                            }
                        }]
                    };
                    routeArray.push(route);
                });
                try{
                        console.log("Sending addresses to Caddy...")
                        var saveRoute = await axios.post(caddy.object + "tyger2/routes/...", routeArray)
                        var newApps = await axios.get(caddy.config);
                        console.log("Apps are now: " + newApps.data.apps)
                        console.log("Initial loading complete.")
                        return saveRoute
                    } catch (err){
                        console.log(err);
                    }
        }catch (error){
            return error
        }
        
    }
}