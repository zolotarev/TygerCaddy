import path from 'path';

const config = {
        development: {
        dialect: "sqlite",
        storage: path.join(process.cwd(), "/src", "/dev.db.sqlite")
      },
      test: {
        dialect: "sqlite",
        storage: path.join(process.cwd(), "/db", "/qa.db.sqlite")
      },
      production: {
        dialect: "sqlite",
        storage: path.join(process.cwd(), "/db", "/prod.db.sqlite")
      }
}

module.exports = config;