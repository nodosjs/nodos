const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  production: {
    url: process.env.DATABASE_URL,
  },
};
