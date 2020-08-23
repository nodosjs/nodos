// @ts-check

require('@babel/register');
require('dotenv').config();
// const _ = require('lodash');
// const path = require('path');
const log = require('./logger');
const Application = require('./Application.js');

module.exports = (projectRoot, env = process.env.NODE_ENV || 'development') => {
  log('PROJECT_ROOT', projectRoot);

  const app = new Application(projectRoot, env);

  return app;
};
