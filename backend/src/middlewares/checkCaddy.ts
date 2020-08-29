import { initialCaddyBlockGenerate } from "../middlewares/generateCaddyBlock";

const fs = require('fs')

export const checkCaddy = async () => {
    //check that caddy is available by polling the config.
    //check that the caddyfile exsists
    if (fs.existsSync(process.env.CADDYFILE_PATH)) {
        return 'Caddyfile exists!';
      } else {
        let content = await initialCaddyBlockGenerate().then(content => {
          fs.writeFile(process.env.CADDYFILE_PATH, content, (err) => {
          
            // throws
            if (err) throw err;
            // success case, the file was saved
            return 'Caddyfile Created!';

        })
      });
    };
}