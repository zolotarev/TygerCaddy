const fs = require('fs');

const config = {
  baseApiUrl: process.env.BASE_API_URL.trim(),
};

fs.writeFile(
  'env.json',
  JSON.stringify(config), {
    encoding: 'utf8',
    flag: 'w'
  },
  (error) => {
    console.error(error);
  }
);

console.log('Complete Environment Variable Setup');
