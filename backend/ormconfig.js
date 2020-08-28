require('dotenv').config();

module.exports = [{
    type: process.env.TYPEORM_TYPE,
    database: process.env.TYPEORM_DATABASE,
    synchronize: process.env.TYPEORM_SYNC,
    logging: process.env.TYPEORM_LOGGING,
    entities: [
          process.env.TYPEORM_ENTITIES
      ],
    migrations: [
        process.env.TYPEORM_MIGRATIONS
      ],
    subscribers: [
        process.env.TYPEORM_SUBSCRIBERS
      ],
    cli: {
        entitiesDir: process.env.TYPEORM_CLI_ENTITIES_DIR,
        migrationsDir: process.env.TYPEORM_CLI_MIGRATIONS_DIR,
        subscribersDir: process.env.TYPEORM_CLI_SUBSCRIBERS_DIR
    }
  }];