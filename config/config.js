const config = require(`./config.${process.env.NODE_ENV}`);

if(!config) {
  throw new Error('Your environment is reject');
}

module.exports = config;