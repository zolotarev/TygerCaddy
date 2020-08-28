import "reflect-metadata";
import { createConnection } from "typeorm";
require('dotenv').config();
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";

//Connects to the Database -> then starts the express

const config:any = {
      "type": process.env.TYPEORM_TYPE,
      "database": process.env.TYPEORM_DATABASE,
      "synchronize": process.env.TYPEORM_SYNC,
      "logging": process.env.TYPEORM_LOGGING,
      "entities": [
          process.env.TYPEORM_ENTITIES
      ],
      "migrations": [
        process.env.TYPEORM_MIGRATIONS
      ],
      "subscribers": [
        process.env.TYPEORM_SUBSCRIBERS
      ],
      "cli": {
        "entitiesDir": process.env.TYPEORM_CLI_ENTITIES_DIR,
        "migrationsDir": process.env.TYPEORM_CLI_MIGRATIONS_DIR,
        "subscribersDir": process.env.TYPEORM_CLI_SUBSCRIBERS_DIR
      }
    }
    console.log("Running environment for " + process.env.NODE_ENV)
    createConnection(config)
  .then(async connection => {
    await connection.synchronize();
    // Create a new express application instance
    const app = express();

    // Call midlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    //Set all routes from routes folder
    app.use("/", routes);

    app.listen(3000, () => {
      console.log("Server started on port 3000!");
    });
  })
  .catch(error => console.log(error));