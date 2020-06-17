import path from 'path';

const config = {
        development: {
        dialect: "sqlite",
        storage: path.join(process.cwd(), "/src", "/db", "/dev.db.sqlite")
      },
      test: {
        dialect: "sqlite",
        storage: path.join(process.cwd(), "/src", "/db", "/qa.db.sqlite")
      },
      production: {
        dialect: "sqlite",
        storage: path.join(process.cwd(), "/src", "/db", "/prod.db.sqlite")
      }
}

module.exports = config;