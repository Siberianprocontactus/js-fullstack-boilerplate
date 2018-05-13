const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');

const logger = require('../src/logger.js').getLogger('/');

const template = require('./template.js');

const router = express.Router();

router.use(bodyParser.json());

router.get('/', function(req, res) {
  res.send({ ok: true });
});

router.use('/template', template);

router.all('*', function(req, res) {
  res.status(404).send({ ok: false, message: 'not found'});
});

module.exports = router;
