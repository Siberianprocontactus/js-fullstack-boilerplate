const config = require('config');

const environment = Object.assign(
  {driver: "mongodb"},
  config.mongo
);

module.exports = {
  "dev": environment,
}
