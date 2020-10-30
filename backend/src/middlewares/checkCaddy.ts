import { rebuildCaddyfile } from "../middlewares/caddy";
const fs = require('fs');
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