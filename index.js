const express = require('express');
const fallback = require('express-history-api-fallback');
const config = require('config');

const logger = require('./src/logger.js');
const db = require('./src/database.js');

const app = express();
app.enable('trust proxy');
app.use(logger.log4js.connectLogger(logger.getLogger('express'), {level: 'auto'}));
const root = __dirname + '/front/public';
app.use(express.static(root));

if (process.env.PORT) {
  logger.debug('process.env.PORT', process.env.PORT)
  config.app.port = process.env.PORT;
}
app.listen(config.app.port, function () {
  logger.info(`${config.app.name} listening on port ${config.app.port}!`);
});
logger.debug(config)

Promise.resolve()
  // .then(db.connect)
  .then(() => {
    app.use('/api', require('./api/index.js'));
    logger.info('REST API attached to `/api` route');
    app.use(fallback('index.html', { root }));
  })
  .catch(err => {
    logger.fatal(err.message);
    logger.error(err);
    db().close();
    process.exit(1);
  })
