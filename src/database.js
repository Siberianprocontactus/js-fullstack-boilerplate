const MongoClient = require( 'mongodb' ).MongoClient;
const config = require('config');

const logger = require('../src/logger.js').getLogger('mongo');
const {
  mongo = {}
} = config;
const url = `mongodb://${mongo.user}:${mongo.password}@${mongo.host}:${mongo.port}/${mongo.database}`
logger.debug({url});

let _db;

module.exports = () => _db;
module.exports.connect = () => MongoClient.connect(url)
  .then(db => {
    logger.info('connected');
    _db = db;
  })
  .catch(err => {
    logger.fatal(err.message);
    logger.error(err);
    process.exit(1);
  })
